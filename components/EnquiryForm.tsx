"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import type { FormType } from "@/lib/enquiry";

type EnquiryFormProps = {
  formType: FormType;
  variant?: "card" | "panel";
  onSuccess?: () => void;
};

const inputClass =
  "h-11 w-full rounded-lg border border-foreground/40 bg-white/40 px-3 text-base text-black outline-none placeholder:text-black focus:border-foreground";
const textareaClass =
  "w-full resize-none rounded-lg border border-foreground/40 bg-white/40 px-3 py-2.5 text-base text-black outline-none placeholder:text-black focus:border-foreground";

export function SendIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4.5 19.5 20 12 4.5 4.5 4.5 10.5 14 12 4.5 13.5 4.5 19.5Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function EnquiryForm({
  formType,
  variant = "card",
  onSuccess,
}: EnquiryFormProps) {
  const openedAtRef = useRef(Date.now());
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    openedAtRef.current = Date.now();
  }, [formType]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");
    setFieldErrors({});

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType,
          name,
          company,
          email,
          subject,
          message,
          website_url: honeypot,
          formStartedAt: openedAtRef.current,
        }),
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
      setName("");
      setCompany("");
      setEmail("");
      setSubject("");
      setMessage("");
      openedAtRef.current = Date.now();
      onSuccess?.();
    } catch {
      setStatus("error");
      setErrorMessage(
        "That didn't send. Try again, or email partners@betstackers.com.",
      );
    }
  }

  if (status === "sent") {
    return (
      <div className={variant === "card" ? "py-8 text-center" : "py-6 text-center"}>
        <p className="text-base font-bold">Message sent</p>
        <p className="mt-2 text-sm text-black">
          Thanks — we&apos;ll get back to you shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-black px-4 text-sm font-semibold text-white"
        >
          Send another
          <SendIcon />
        </button>
      </div>
    );
  }

  const buttonClass =
    "mt-1 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-black text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <input
          type="text"
          name="website_url"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <Field error={fieldErrors.name}>
        <input
          type="text"
          name="name"
          autoComplete="name"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field error={fieldErrors.company}>
        <input
          type="text"
          name="company"
          autoComplete="organization"
          placeholder="Company or Brand"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field error={fieldErrors.email}>
        <input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field error={fieldErrors.subject}>
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field error={fieldErrors.message}>
        <textarea
          name="message"
          rows={4}
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={textareaClass}
        />
      </Field>

      {status === "error" && errorMessage ? (
        <p className="text-sm text-red-700" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className={buttonClass}
      >
        {status === "sending" ? "Sending…" : "Send"}
        {status === "sending" ? null : <SendIcon />}
      </button>
    </form>
  );
}

function Field({
  children,
  error,
}: {
  children: ReactNode;
  error?: string;
}) {
  return (
    <div>
      {children}
      {error ? <p className="mt-1 text-xs text-red-700">{error}</p> : null}
    </div>
  );
}

type ModalProps = {
  open: boolean;
  formType: FormType;
  title?: string;
  blurb?: string;
  onClose: () => void;
};

export function EnquiryModal({
  open,
  formType,
  title = "Get in touch",
  blurb = "Whether it's partnerships or traffic, simply reach out — we'll be sure to get back to you.",
  onClose,
}: ModalProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close form"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md rounded-t-2xl border border-foreground bg-card p-5 sm:rounded-2xl sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2 id={titleId} className="text-lg font-bold">
              {title}
            </h2>
            <p className="mt-1 text-sm text-black">{blurb}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md text-black hover:bg-black/5"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <EnquiryForm formType={formType} variant="panel" onSuccess={onClose} />
      </div>
    </div>
  );
}
