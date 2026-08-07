import { Resend } from "resend";
import { FORM_SOURCES, enquirySchema } from "@/lib/enquiry";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
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

  const inbox = process.env.CONTACT_TO_EMAIL ?? "partners@betstackers.com";
  const source = FORM_SOURCES[data.formType];

  const subject =
    data.formType === "partnerships"
      ? data.company?.trim() || `Partnership enquiry from ${data.name}`
      : data.website?.trim() || `Traffic enquiry from ${data.name}`;

  const lines = [
    `Source: ${source}`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    ...(data.company?.trim() ? [`Company: ${data.company.trim()}`] : []),
    ...(data.website?.trim() ? [`Website / Source: ${data.website.trim()}`] : []),
    "",
    "Message:",
    data.message,
  ];

  const from = `${data.name.replace(/[<>"]/g, "")} via BetStackers <noreply@betstackers.com>`;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [inbox],
    replyTo: data.email,
    subject,
    text: lines.join("\n"),
    headers: { "Reply-To": data.email },
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
