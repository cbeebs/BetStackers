"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import type { EnquirySource } from "@/lib/enquiry";

type ContactModalProps = {
  open: boolean;
  source: EnquirySource;
  onClose: () => void;
};

export function ContactModal({ open, source, onClose }: ContactModalProps) {
  const titleId = useId();
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!open) return;

    setStatus("idle");
    setErrorMessage("");
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
  }, [open, onClose]);

  if (!open) return null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, message, source }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("sent");
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
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
        aria-label="Close contact form"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md animate-slide-up border border-border bg-surface sm:rounded-xl">
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
          <div>
            <p className="text-[11px] font-medium tracking-[0.18em] text-accent uppercase">
              {source}
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 px-5 py-5 sm:px-6">
            <input
              ref={firstFieldRef}
              type="text"
              name="name"
              autoComplete="name"
              required
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 w-full rounded-md border border-border bg-black px-4 text-sm text-white outline-none placeholder:text-muted-dim focus:border-accent"
            />
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 w-full rounded-md border border-border bg-black px-4 text-sm text-white outline-none placeholder:text-muted-dim focus:border-accent"
            />
            <input
              type="text"
              name="company"
              autoComplete="organization"
              placeholder="Company (optional)"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="h-12 w-full rounded-md border border-border bg-black px-4 text-sm text-white outline-none placeholder:text-muted-dim focus:border-accent"
            />
            <textarea
              name="message"
              required
              rows={4}
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full resize-none rounded-md border border-border bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-muted-dim focus:border-accent"
            />

            {status === "error" ? (
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
              <ArrowIcon />
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
