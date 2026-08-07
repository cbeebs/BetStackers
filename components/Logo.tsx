/** Crisp vector mark — three stacked isometric tiles. */
export function LogoMark({ className = "h-8 w-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      overflow="visible"
    >
      <g
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      >
        {/* Back → front. High-res viewBox + round joins stay clean when scaled down. */}
        <path d="M16 48 32 39l16 9v16L32 73 16 64V48Z" />
        <path d="M16 33 32 24l16 9v16L32 58 16 49V33Z" />
        <path d="M16 18 32 9l16 9v16L32 43 16 34V18Z" />
      </g>
    </svg>
  );
}

export function Logo({
  className = "",
  size = "default",
}: {
  className?: string;
  size?: "default" | "footer";
}) {
  const markClass =
    size === "footer"
      ? "h-7 w-[1.4rem] sm:h-8 sm:w-6"
      : "h-[2.3rem] w-[1.84rem] sm:h-10 sm:w-8";
  const textClass =
    size === "footer"
      ? "text-[13px] leading-none font-extrabold tracking-[0.04em] uppercase sm:text-[15px]"
      : "text-[17px] leading-none font-extrabold tracking-[0.04em] uppercase sm:text-[18.5px]";

  return (
    <a
      href="/"
      className={`inline-flex items-center gap-2.5 text-black ${className}`}
    >
      <LogoMark className={markClass} />
      <span className={textClass}>BetStackers</span>
    </a>
  );
}
