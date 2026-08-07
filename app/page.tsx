export default function Home() {
  return (
    <main className="relative flex min-h-full flex-1 flex-col overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#ebe4d8_0%,_transparent_55%),linear-gradient(180deg,_#f7f4ef_0%,_#efe8dc_100%)]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-24 sm:px-8">
        <p className="font-display text-sm tracking-[0.2em] uppercase text-muted">
          Your brand
        </p>
        <h1 className="mt-4 font-display text-5xl leading-[1.05] tracking-tight text-foreground sm:text-6xl">
          Landing page
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
          Starter ready for GitHub and Vercel. Edit this page and push — Vercel
          deploys from the repo.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#get-started"
            className="inline-flex items-center justify-center bg-accent px-6 py-3 text-sm font-medium text-surface transition-opacity hover:opacity-90"
          >
            Get started
          </a>
        </div>
      </div>
    </main>
  );
}
