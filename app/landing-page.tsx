"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { EnquiryForm, EnquiryModal } from "@/components/EnquiryForm";
import { Logo } from "@/components/Logo";
import type { FormType } from "@/lib/enquiry";

const friendlyBlurb =
  "If you're interested in talking about either, simply reach out — we'll be sure to get back to you.";

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

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M3 9L9 3M9 3H4.5M9 3V7.5"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formType, setFormType] = useState<FormType>("general");
  const [modalTitle, setModalTitle] = useState("Get in touch");

  const openForm = useCallback((next: FormType, title: string) => {
    setFormType(next);
    setModalTitle(title);
    setModalOpen(true);
  }, []);

  return (
    <>
      <div className="min-h-dvh bg-background text-foreground">
        <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          <Logo />

          <button
            type="button"
            onClick={() => openForm("general", "Get in touch")}
            className="flex h-10 w-10 items-center justify-center text-foreground transition-opacity hover:opacity-60"
            aria-label="Contact"
          >
            <MailIcon />
          </button>
        </header>

        <main className="mx-auto max-w-6xl px-5 pb-12 sm:px-8 lg:px-10">
          <section className="grid items-center gap-10 pt-6 lg:grid-cols-2 lg:gap-8 lg:pt-10">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase">
                Global iGaming Traffic and Content.
              </p>
              <h1 className="mt-4 text-5xl leading-[1.02] font-extrabold tracking-tight sm:text-6xl lg:text-[4.25rem]">
                The click before
                <br />
                the bet.
              </h1>
              <div className="mt-6 max-w-md space-y-3 text-[15px] leading-relaxed text-foreground/85">
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
                body={friendlyBlurb}
                cta="Get in touch"
                onClick={() => openForm("partnerships", "For partnerships")}
              />
            </div>
            <div id="traffic">
              <MobileCtaCard
                title="For Traffic"
                body={friendlyBlurb}
                cta="Get in touch"
                onClick={() => openForm("traffic", "For Traffic")}
              />
            </div>
          </section>

          <section className="mt-14 hidden gap-5 md:grid md:grid-cols-2">
            <article
              id="partner"
              className="rounded-2xl border border-foreground/40 bg-card/70 p-6 lg:p-7"
            >
              <h2 className="text-xl font-bold">For partnerships</h2>
              <p className="mt-2 mb-5 text-sm leading-relaxed text-foreground/75">
                {friendlyBlurb}
              </p>
              <EnquiryForm formType="partnerships" />
            </article>

            <article
              id="traffic"
              className="rounded-2xl border border-foreground/40 bg-card/70 p-6 lg:p-7"
            >
              <h2 className="text-xl font-bold">For Traffic</h2>
              <p className="mt-2 mb-5 text-sm leading-relaxed text-foreground/75">
                {friendlyBlurb}
              </p>
              <EnquiryForm formType="traffic" />
            </article>
          </section>
        </main>

        <footer className="border-t border-foreground/15">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 sm:px-8 lg:px-10">
            <Logo />
            <p className="text-xs text-foreground/55">
              © 2026 BetStackers. All rights reserved.
            </p>
          </div>
        </footer>
      </div>

      <EnquiryModal
        open={modalOpen}
        formType={formType}
        title={modalTitle}
        blurb={friendlyBlurb}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

function MobileCtaCard({
  title,
  body,
  cta,
  onClick,
}: {
  title: string;
  body: string;
  cta: string;
  onClick: () => void;
}) {
  return (
    <article className="rounded-2xl border border-foreground/40 bg-card/70 p-5">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-foreground/75">{body}</p>
      <button
        type="button"
        onClick={onClick}
        className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-black text-sm font-semibold text-white"
      >
        {cta}
        <ArrowIcon />
      </button>
    </article>
  );
}
