import { Resend } from "resend";
import { ENQUIRY_SOURCES, type EnquirySource } from "@/lib/enquiry";

export const runtime = "nodejs";

type ContactBody = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  source?: string;
};

function isEnquirySource(value: string): value is EnquirySource {
  return (ENQUIRY_SOURCES as readonly string[]).includes(value);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  let body: ContactBody;

  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const company = body.company?.trim() ?? "";
  const message = body.message?.trim() ?? "";
  const source = body.source?.trim() ?? "";

  if (!name || !email || !message || !isEnquirySource(source)) {
    return Response.json(
      { error: "Please fill in name, email, and message." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Email service is not configured yet." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const to = process.env.CONTACT_TO_EMAIL ?? "partners@betstackers.com";
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "BetStackers <onboarding@resend.dev>";

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.5;color:#111">
      <p><strong>Source:</strong> ${escapeHtml(source)}</p>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
    </div>
  `;

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: source,
    html,
  });

  if (error) {
    console.error("Resend error:", error);
    return Response.json(
      { error: "Could not send message. Please try again." },
      { status: 500 },
    );
  }

  return Response.json({ ok: true });
}
