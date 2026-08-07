import { Resend } from "resend";
import { enquirySchema } from "@/lib/enquiry";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function fieldLines(fields: Record<string, string>): string {
  return Object.entries(fields)
    .filter(([, value]) => value.trim().length > 0)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
}

function fieldHtml(fields: Record<string, string>): string {
  return Object.entries(fields)
    .filter(([, value]) => value.trim().length > 0)
    .map(
      ([label, value]) =>
        `<p style="margin:0 0 10px"><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value).replaceAll("\n", "<br/>")}</p>`,
    )
    .join("");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "That request was not valid JSON. Refresh and try again." },
      { status: 400 },
    );
  }

  const ip = clientIp(request);
  const limited = rateLimit(`enquiry:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!limited.ok) {
    return Response.json(
      {
        error: `Too many submissions from this network. Wait ${limited.retryAfterSec} seconds and try again.`,
      },
      { status: 429 },
    );
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".") || "form";
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return Response.json(
      {
        error: "Please fix the highlighted fields and try again.",
        fieldErrors,
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  if (data.website_url && data.website_url.trim().length > 0) {
    return Response.json({ ok: true });
  }

  const startedAt = data.formStartedAt;
  if (
    typeof startedAt !== "number" ||
    !Number.isFinite(startedAt) ||
    Date.now() - startedAt < 3000
  ) {
    return Response.json(
      {
        error:
          "That submitted too quickly. Take a moment to complete the form, then send again.",
      },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json(
      {
        error:
          "That didn't send. Try again, or email partners@betstackers.com.",
      },
      { status: 503 },
    );
  }

  // Deliver to personal inbox if set — avoids Gmail "Treat as alias" putting
  // partners@ back in To on Reply. Otherwise partners@ (ImprovMX → Gmail).
  const inbox = process.env.CONTACT_TO_EMAIL ?? "partners@betstackers.com";

  let subject: string;
  let fields: Record<string, string>;

  if (data.formType === "affiliate") {
    subject = `[Affiliate] ${data.brand} — ${data.markets}`;
    fields = {
      Form: "Affiliate partnerships",
      Name: data.name,
      Email: data.email,
      Brand: data.brand,
      Markets: data.markets,
      Website: data.website ?? "",
      Company: data.company ?? "",
      Message: data.message,
    };
  } else {
    subject = `[Media] ${data.company} — ${data.enquiryType}`;
    fields = {
      Form: "Media & traffic",
      Name: data.name,
      Email: data.email,
      Company: data.company,
      "Enquiry type": data.enquiryType,
      Message: data.message,
    };
  }

  const replySubject = `Re: ${subject}`;
  const mailto = `mailto:${encodeURIComponent(data.email)}?subject=${encodeURIComponent(replySubject)}`;

  const text = [
    `Reply to ${data.name}: ${data.email}`,
    "",
    fieldLines(fields),
  ].join("\n");

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.5;color:#111;max-width:560px">
      <p style="margin:0 0 16px">
        <a href="${mailto}"
           style="display:inline-block;background:#00ff88;color:#000;text-decoration:none;font-weight:700;padding:12px 18px;border-radius:6px">
          Reply to ${escapeHtml(data.name)}
        </a>
      </p>
      <p style="margin:0 0 20px;color:#444;font-size:14px">
        Or hit Reply in Gmail — it should go to
        <a href="${mailto}">${escapeHtml(data.email)}</a>
        (not partners@).
      </p>
      <hr style="border:none;border-top:1px solid #eee;margin:0 0 16px" />
      ${fieldHtml(fields)}
    </div>
  `;

  // From display uses the enquirer name so the thread is obvious.
  // Never From partners@ — that makes Gmail Reply target partners@.
  const from = `${data.name.replace(/[<>"]/g, "")} via BetStackers <noreply@betstackers.com>`;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [inbox],
    replyTo: data.email,
    subject,
    text,
    html,
    headers: {
      "Reply-To": data.email,
    },
  });

  if (error) {
    console.error("Resend enquiry error:", error);
    return Response.json(
      {
        error:
          "That didn't send. Try again, or email partners@betstackers.com.",
      },
      { status: 500 },
    );
  }

  return Response.json({ ok: true });
}
