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
  "h-11 w-full rounded-lg border border-foreground/80 bg-input px-3 text-sm text-foreground outline-none placeholder:text-foreground/45 focus:border-foreground";
const textareaClass =
  "w-full resize-none rounded-lg border border-foreground/80 bg-input px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-foreground/45 focus:border-foreground";

export function EnquiryForm({
  formType,
  variant = "card",
  onSuccess,
}: EnquiryFormProps) {
  const openedAtRef = useRef(Date.now());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
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
          email,
          company,
          website,
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
      setEmail("");
      setCompany("");
      setWebsite("");
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
        <p className="mt-2 text-sm text-foreground/70">
          Thanks — we&apos;ll get back to you shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 inline-flex h-10 items-center justify-center rounded-lg bg-foreground px-4 text-sm font-semibold text-background"
        >
          Send another
        </button>
      </div>
    );
  }

  const secondPlaceholder =
    formType === "partnerships" ? "Company" : "Website / Source";
  const messagePlaceholder =
    formType === "partnerships"
      ? "Tell us about your business"
      : "Tell us about your traffic";

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

      <Field
        error={
          formType === "partnerships"
            ? fieldErrors.company
            : fieldErrors.website
        }
      >
        {formType === "partnerships" ? (
          <input
            type="text"
            name="company"
            autoComplete="organization"
            placeholder={secondPlaceholder}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={inputClass}
          />
        ) : (
          <input
            type="text"
            name="website"
            placeholder={secondPlaceholder}
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className={inputClass}
          />
        )}
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

      <Field error={fieldErrors.message}>
        <textarea
          name="message"
          rows={4}
          placeholder={messagePlaceholder}
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
        className="mt-1 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-foreground text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send Enquiry"}
        {status === "sending" ? null : <ArrowIcon />}
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

type ModalProps = {
  open: boolean;
  formType: FormType;
  onClose: () => void;
};

export function EnquiryModal({ open, formType, onClose }: ModalProps) {
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

  const title = formType === "partnerships" ? "Partner" : "Traffic Enquiries";
  const blurb =
    formType === "partnerships"
      ? "Let's build something great together. Get in touch to explore partnership opportunities."
      : "Have traffic to monetise? Submit your details and our team will get back to you.";

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
            <p className="mt-1 text-sm text-foreground/70">{blurb}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md text-foreground/60 hover:bg-foreground/5"
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
