"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { FORM_SOURCES, type FormType } from "@/lib/enquiry";

type EnquiryModalProps = {
  open: boolean;
  formType: FormType;
  onClose: () => void;
};

const inputClass =
  "h-12 w-full rounded-md border border-border bg-black px-4 text-sm text-white outline-none placeholder:text-muted-dim focus:border-accent";
const textareaClass =
  "w-full resize-none rounded-md border border-border bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-muted-dim focus:border-accent";

export function EnquiryModal({ open, formType, onClose }: EnquiryModalProps) {
  const titleId = useId();
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const openedAtRef = useRef<number>(Date.now());

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) return;

    setStatus("idle");
    setErrorMessage("");
    setFieldErrors({});
    setName("");
    setEmail("");
    setCompany("");
    setSubject("");
    setMessage("");
    setHoneypot("");
    openedAtRef.current = Date.now();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => firstFieldRef.current?.focus(), 50);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, formType, onClose]);

  if (!open) return null;

  const label = FORM_SOURCES[formType];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");
    setFieldErrors({});

    const payload = {
      formType,
      name,
      email,
      company,
      subject,
      message,
      website_url: honeypot,
      formStartedAt: openedAtRef.current,
    };

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as {
        error?: string;
        fieldErrors?: Record<string, string>;
      };

      if (!response.ok) {
        setStatus("error");
        setFieldErrors(data.fieldErrors ?? {});
        setErrorMessage(
          data.error ??
            "That didn't send. Try again, or email partners@betstackers.com.",
        );
        return;
      }

      setStatus("sent");
    } catch {
      setStatus("error");
      setErrorMessage(
        "That didn't send. Try again, or email partners@betstackers.com.",
      );
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/75 backdrop-blur-sm animate-fade-in"
        aria-label="Close enquiry form"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md animate-slide-up border border-border bg-surface sm:rounded-xl">
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
          <div>
            <p className="text-[11px] font-medium tracking-[0.18em] text-accent uppercase">
              {label}
            </p>
            <h2
              id={titleId}
              className="mt-1 text-lg font-semibold tracking-tight text-white"
            >
              Get in touch
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-white/5 hover:text-white"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M3.5 3.5l9 9M12.5 3.5l-9 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {status === "sent" ? (
          <div className="px-5 py-10 text-center sm:px-6">
            <p className="text-base font-medium text-white">Message sent</p>
            <p className="mt-2 text-sm text-muted">
              Thanks — we&apos;ll get back to you shortly.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 inline-flex h-11 items-center justify-center bg-accent px-5 text-sm font-semibold tracking-wide text-black uppercase transition-opacity hover:opacity-90"
            >
              Close
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 px-5 py-5 sm:px-6"
            noValidate
          >
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
              <label>
                Website
                <input
                  type="text"
                  name="website_url"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </label>
            </div>

            <div>
              <input
                ref={firstFieldRef}
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />
              {fieldErrors.name ? (
                <p className="mt-1 text-xs text-red-400">{fieldErrors.name}</p>
              ) : null}
            </div>

            <div>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
              {fieldErrors.email ? (
                <p className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>
              ) : null}
            </div>

            <div>
              <input
                type="text"
                name="company"
                autoComplete="organization"
                placeholder="Company (optional)"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className={inputClass}
              />
              {fieldErrors.subject ? (
                <p className="mt-1 text-xs text-red-400">{fieldErrors.subject}</p>
              ) : null}
            </div>

            <div>
              <textarea
                name="message"
                rows={4}
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={textareaClass}
              />
              {fieldErrors.message ? (
                <p className="mt-1 text-xs text-red-400">{fieldErrors.message}</p>
              ) : null}
            </div>

            {status === "error" && errorMessage ? (
              <p className="text-sm text-red-400" role="alert">
                {errorMessage}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-1 inline-flex h-12 w-full items-center justify-center gap-2 bg-accent text-sm font-semibold tracking-wide text-black uppercase transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send message"}
              {status === "sending" ? null : <ArrowIcon />}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M3 9L9 3M9 3H4.5M9 3V7.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
