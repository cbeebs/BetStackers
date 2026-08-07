"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { EnquiryModal } from "@/components/EnquiryModal";
import { Logo } from "@/components/Logo";
import type { FormType } from "@/lib/enquiry";

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      className={className}
    >
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

export function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formType, setFormType] = useState<FormType>("affiliate");

  const openForm = useCallback((next: FormType) => {
    setFormType(next);
    setModalOpen(true);
  }, []);

  const closeForm = useCallback(() => setModalOpen(false), []);

  return (
    <>
      <div className="relative flex min-h-dvh flex-col overflow-x-hidden">
        <header className="relative z-20 flex items-center justify-between px-5 pt-6 sm:px-8 lg:px-12 lg:pt-8">
          <Logo />
          <button
            type="button"
            onClick={() => openForm("media")}
            className="text-[13px] font-semibold tracking-[0.14em] text-accent uppercase underline decoration-accent/80 underline-offset-[6px] transition-opacity hover:opacity-80"
          >
            Contact
          </button>
        </header>

        <main className="relative z-10 flex flex-1 flex-col lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
          <section className="flex flex-col justify-center px-5 pt-14 pb-8 sm:px-8 sm:pt-20 lg:px-12 lg:pt-8 lg:pb-16">
            <div className="animate-slide-up max-w-xl">
              <div className="flex flex-col gap-2">
                <span className="h-px w-10 bg-accent" aria-hidden />
                <p className="text-[11px] font-semibold tracking-[0.22em] text-accent uppercase sm:text-xs">
                  Global iGaming Traffic
                </p>
              </div>

              <h1 className="mt-5 text-[2.35rem] leading-[1.08] font-bold tracking-tight text-white sm:text-5xl lg:text-[3.4rem] lg:leading-[1.05]">
                The{" "}
                <span className="inline-flex items-center rounded-full border border-accent px-3 py-[0.12em] text-accent sm:px-3.5">
                  click
                </span>{" "}
                before the bet.
              </h1>

              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted sm:text-base">
                BetStackers is the group entity behind a network of localised
                casino and sportsbook sites. We run acquisition, content and
                compliance in-house, and partner directly with operators and
                media buyers across regulated and emerging markets.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <button
                  type="button"
                  onClick={() => openForm("affiliate")}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-accent px-5 text-sm font-bold tracking-[0.08em] text-black uppercase transition-opacity hover:opacity-90"
                >
                  Partner
                  <ArrowIcon />
                </button>
                <button
                  type="button"
                  onClick={() => openForm("media")}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-accent px-5 text-sm font-bold tracking-[0.08em] text-accent uppercase transition-colors hover:bg-accent/10"
                >
                  Traffic Enquiries
                  <ArrowIcon />
                </button>
              </div>
            </div>
          </section>

          <section
            aria-hidden
            className="relative flex flex-1 items-center justify-center px-4 pb-10 pt-2 sm:px-8 lg:px-6 lg:pb-16 lg:pt-8"
          >
            <div className="animate-glow relative w-full max-w-[520px] lg:max-w-none">
              <div
                className="pointer-events-none absolute inset-0 scale-110 bg-[radial-gradient(ellipse_at_center,_rgba(0,255,136,0.18)_0%,_transparent_60%)]"
                aria-hidden
              />
              <Image
                src="/hero-graphic.png"
                alt=""
                width={780}
                height={796}
                priority
                className="relative z-10 mx-auto h-auto w-full max-w-[420px] object-contain sm:max-w-[480px] lg:max-w-[560px]"
              />
            </div>
          </section>
        </main>

        <footer className="relative z-10 px-5 pb-6 sm:px-8 lg:px-12">
          <p className="text-xs text-muted-dim">© BetStackers 2026</p>
        </footer>
      </div>

      <EnquiryModal open={modalOpen} formType={formType} onClose={closeForm} />
    </>
  );
}
