"use client";

import Image from "next/image";
import { useCallback, useState, type ReactNode } from "react";
import { EnquiryForm, EnquiryModal } from "@/components/EnquiryForm";
import { Logo, LogoMark } from "@/components/Logo";
import type { FormType } from "@/lib/enquiry";

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

function PeopleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M16 11a3 3 0 1 0-2.8-4M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM4.5 19a4.5 4.5 0 0 1 9 0M13 15.5a4.5 4.5 0 0 1 6.5 3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 19V5M4 19h16M8 15v-3M12 15V9M16 15v-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StackIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 8l8-4 8 4-8 4-8-4ZM4 12l8 4 8-4M4 16l8 4 8-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M4 12h16M12 4c2.5 2.8 2.5 13.2 0 16M12 4c-2.5 2.8-2.5 13.2 0 16"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [formType, setFormType] = useState<FormType>("partnerships");

  const openForm = useCallback((next: FormType) => {
    setFormType(next);
    setModalOpen(true);
    setMenuOpen(false);
  }, []);

  return (
    <>
      <div className="min-h-dvh bg-background text-foreground">
        <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          <Logo />

          <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
            <a href="#partner" className="hover:opacity-70">
              Partner
            </a>
            <a href="#traffic" className="hover:opacity-70">
              Traffic Enquiries
            </a>
            <a href="#about" className="hover:opacity-70">
              About
            </a>
            <a href="#careers" className="hover:opacity-70">
              Careers
            </a>
          </nav>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-5 bg-foreground" />
              <span className="block h-0.5 w-5 bg-foreground" />
              <span className="block h-0.5 w-5 bg-foreground" />
            </span>
          </button>
        </header>

        {menuOpen ? (
          <div className="border-y border-foreground/20 px-5 py-4 md:hidden">
            <div className="flex flex-col gap-3 text-sm font-medium">
              <a href="#partner" onClick={() => setMenuOpen(false)}>
                Partner
              </a>
              <a href="#traffic" onClick={() => setMenuOpen(false)}>
                Traffic Enquiries
              </a>
              <a href="#about" onClick={() => setMenuOpen(false)}>
                About
              </a>
              <a href="#careers" onClick={() => setMenuOpen(false)}>
                Careers
              </a>
            </div>
          </div>
        ) : null}

        <main className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 lg:px-10">
          <section className="grid items-center gap-10 pt-6 lg:grid-cols-2 lg:gap-8 lg:pt-10">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase">
                The click before the bet.
              </p>
              <h1 className="mt-4 text-4xl leading-[1.05] font-extrabold tracking-tight sm:text-5xl lg:text-[3.4rem]">
                We build.
                <br />
                We scale.
                <br />
                We stack value.
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

          {/* Mobile CTA cards */}
          <section className="mt-10 grid gap-4 md:hidden">
            <div id="partner">
              <MobileCtaCard
                icon={<PeopleIcon />}
                title="Partner"
                body="Let's build something great together. Get in touch to explore partnership opportunities."
                cta="Partner with us"
                onClick={() => openForm("partnerships")}
              />
            </div>
            <div id="traffic">
              <MobileCtaCard
                icon={<ChartIcon />}
                title="Traffic Enquiries"
                body="Have traffic to monetise? Submit your details and our team will get back to you."
                cta="Submit Traffic"
                onClick={() => openForm("traffic")}
              />
            </div>
          </section>

          {/* Desktop inline forms */}
          <section className="mt-14 hidden gap-5 md:grid md:grid-cols-2">
            <article
              id="partner"
              className="rounded-2xl border border-foreground bg-card p-6 lg:p-7"
            >
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-md border border-foreground">
                <PeopleIcon />
              </div>
              <h2 className="text-xl font-bold">Partner</h2>
              <p className="mt-2 mb-5 text-sm leading-relaxed text-foreground/75">
                Let&apos;s build something great together. Get in touch to
                explore partnership opportunities.
              </p>
              <EnquiryForm formType="partnerships" />
            </article>

            <article
              id="traffic"
              className="rounded-2xl border border-foreground bg-card p-6 lg:p-7"
            >
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-md border border-foreground">
                <ChartIcon />
              </div>
              <h2 className="text-xl font-bold">Traffic Enquiries</h2>
              <p className="mt-2 mb-5 text-sm leading-relaxed text-foreground/75">
                Have traffic to monetise? Submit your details and our team will
                get back to you.
              </p>
              <EnquiryForm formType="traffic" />
            </article>
          </section>

          <section
            id="about"
            className="mt-16 grid gap-8 border-t border-foreground/25 pt-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-foreground/25"
          >
            <Feature
              icon={<StackIcon />}
              title="Proven Infrastructure"
              body="Built for scale. Optimised for performance."
            />
            <Feature
              icon={<GlobeIcon />}
              title="Global Reach"
              body="Local insight. Global execution."
            />
            <Feature
              icon={<ShieldIcon />}
              title="Trusted Partnerships"
              body="Transparency, reliability, and long-term value."
            />
          </section>

          <section id="careers" className="mt-14 text-center">
            <p className="text-lg font-semibold sm:text-xl">
              Building the <span className="font-extrabold">future</span> of
              iGaming.
            </p>
            <p className="mx-auto mt-3 max-w-lg text-sm text-foreground/70">
              Interested in joining BetStackers? Email{" "}
              <a
                href="mailto:partners@betstackers.com"
                className="underline underline-offset-2"
              >
                partners@betstackers.com
              </a>
              .
            </p>
          </section>
        </main>

        <footer className="border-t border-foreground/20">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
            <div className="flex items-center gap-2">
              <LogoMark className="h-6 w-5" />
              <span className="text-sm font-extrabold tracking-[0.04em] uppercase">
                BetStacker
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="mailto:partners@betstackers.com"
                className="text-foreground/80 hover:text-foreground"
                aria-label="Email"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 6h16v12H4V6Zm0 0 8 7 8-7"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-foreground"
                aria-label="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6.5 9.5V17M6.5 7v.01M10.5 17v-4.5a2.5 2.5 0 1 1 5 0V17M10.5 10v1"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="mx-auto max-w-6xl px-5 pb-6 text-xs text-foreground/55 sm:px-8 lg:px-10">
            © {new Date().getFullYear()} BetStackers. All rights reserved.
          </div>
        </footer>
      </div>

      <EnquiryModal
        open={modalOpen}
        formType={formType}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

function MobileCtaCard({
  icon,
  title,
  body,
  cta,
  onClick,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  cta: string;
  onClick: () => void;
}) {
  return (
    <article className="rounded-2xl border border-foreground/30 bg-card/80 p-5">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md border border-foreground">
        {icon}
      </div>
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-foreground/75">{body}</p>
      <button
        type="button"
        onClick={onClick}
        className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-foreground text-sm font-semibold text-background"
      >
        {cta}
        <ArrowIcon />
      </button>
    </article>
  );
}

function Feature({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="md:px-6">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md border border-foreground">
        {icon}
      </div>
      <h3 className="font-bold">{title}</h3>
      <p className="mt-1 text-sm text-foreground/70">{body}</p>
    </div>
  );
}
