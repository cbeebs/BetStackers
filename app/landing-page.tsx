"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { EnquiryForm, EnquiryModal, SendIcon } from "@/components/EnquiryForm";
import { Logo } from "@/components/Logo";
import type { FormType } from "@/lib/enquiry";

const partnershipBlurb =
  "Looking to partner up? Drop us a note — we'd love to hear from you and we'll get back to you soon.";

const trafficBlurb =
  "Got traffic to talk about? Reach out anytime — we'll take a look and get back to you shortly.";

const generalBlurb =
  "Got something in mind? Simply reach out — we'll be sure to get back to you.";

const TELEGRAM_HANDLE = "@betstackers";
const TELEGRAM_URL = "https://t.me/betstackers";

function MailIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <rect
        x="3.5"
        y="5.5"
        width="17"
        height="13"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M4 7.5 12 13.5 20 7.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21.5 4.5 2.8 11.6c-1.3.5-1.3 1.2-.2 1.5l4.8 1.5 1.8 5.6c.2.7.4 1 .9 1 .5 0 .7-.2 1-.6l2.7-3.5 5.6 4.1c1 .6 1.8.3 2-.9L22.8 5.8c.3-1.3-.5-1.9-1.3-1.3Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="m9.2 14.6 9.8-8.2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formType, setFormType] = useState<FormType>("general");
  const [modalTitle, setModalTitle] = useState("Get in touch");
  const [modalBlurb, setModalBlurb] = useState(generalBlurb);

  const openForm = useCallback(
    (next: FormType, title: string, blurb: string) => {
      setFormType(next);
      setModalTitle(title);
      setModalBlurb(blurb);
      setModalOpen(true);
    },
    [],
  );
  return (
    <>
      <div className="min-h-dvh bg-background text-black">
        <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          <Logo />

          <button
            type="button"
            onClick={() => openForm("general", "Get in touch", generalBlurb)}
            className="flex h-10 w-10 items-center justify-center text-black transition-opacity hover:opacity-70"
            aria-label="Contact"
          >
            <MailIcon />
          </button>
        </header>

        <main className="mx-auto max-w-6xl px-5 pb-12 sm:px-8 lg:px-10">
          <section className="grid items-center gap-10 pt-11 lg:grid-cols-2 lg:gap-8 lg:pt-10">
            <div>
              <p className="text-[9px] font-semibold tracking-[0.18em] sm:text-[10px]">
                GLOBAL iGAMING TRAFFIC
              </p>
              <h1 className="mt-4 text-[4.05rem] leading-[0.98] font-extrabold tracking-tight md:text-6xl lg:text-[4.25rem]">
                The click before
                <br />
                the bet.
              </h1>
              <div className="mt-6 max-w-md space-y-3 text-[15px] leading-relaxed text-black">
                <p>
                  BetStackers is the group entity behind a network of localised
                  casino and sportsbook sites.
                </p>
                <p>
                  We run acquisition, content and tech, and partner directly
                  with operators and media buyers across traditional and
                  emerging iGaming markets worldwide.
                </p>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <Image
                src="/hero-stack.png"
                alt=""
                width={1024}
                height={1024}
                priority
                className="h-auto w-full object-contain"
              />
            </div>
          </section>

          <section className="mt-10 grid gap-4 md:hidden">
            <div id="partner">
              <MobileCtaCard
                title="For partnerships"
                body={partnershipBlurb}
                onClick={() =>
                  openForm(
                    "partnerships",
                    "For partnerships",
                    partnershipBlurb,
                  )
                }
              />
            </div>
            <div id="traffic">
              <MobileCtaCard
                title="For Traffic"
                body={trafficBlurb}
                onClick={() =>
                  openForm("traffic", "For Traffic", trafficBlurb)
                }
              />
            </div>
          </section>

          <section className="mt-14 hidden gap-5 md:grid md:grid-cols-2">
            <article
              id="partner"
              className="rounded-2xl border border-foreground/40 bg-card/70 p-6 lg:p-7"
            >
              <h2 className="text-xl font-bold">For partnerships</h2>
              <p className="mt-2 mb-5 text-sm leading-relaxed text-black">
                {partnershipBlurb}
              </p>
              <EnquiryForm formType="partnerships" />
            </article>

            <article
              id="traffic"
              className="rounded-2xl border border-foreground/40 bg-card/70 p-6 lg:p-7"
            >
              <h2 className="text-xl font-bold">For Traffic</h2>
              <p className="mt-2 mb-5 text-sm leading-relaxed text-black">
                {trafficBlurb}
              </p>
              <EnquiryForm formType="traffic" />
            </article>
          </section>

          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex h-12 items-center justify-between gap-3 rounded-xl bg-[#132a5c] px-4 text-white transition-opacity hover:opacity-90 sm:h-11 sm:px-5"
          >
            <span className="inline-flex items-center gap-2.5 text-[13px] font-semibold tracking-wide">
              <TelegramIcon />
              Telegram
            </span>
            <span className="font-mono text-[12px] tracking-wide text-white/95 sm:text-[13px]">
              {TELEGRAM_HANDLE}
            </span>
          </a>
        </main>

        <footer className="border-t border-foreground/15">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-6 sm:px-8 sm:py-8 lg:px-10">
            <Logo size="footer" />
            <p className="shrink-0 text-right text-[10px] leading-none text-black sm:text-xs">
              © 2026 BetStackers. All rights reserved.
            </p>
          </div>
        </footer>
      </div>

      <EnquiryModal
        open={modalOpen}
        formType={formType}
        title={modalTitle}
        blurb={modalBlurb}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

function MobileCtaCard({
  title,
  body,
  onClick,
}: {
  title: string;
  body: string;
  onClick: () => void;
}) {
  return (
    <article className="rounded-2xl border border-foreground/40 bg-card/70 p-5">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-black">{body}</p>
      <button
        type="button"
        onClick={onClick}
        className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-black text-sm font-semibold text-white"
      >
        Send
        <SendIcon />
      </button>
    </article>
  );
}
