/** Crisp vector mark — three stacked isometric tiles. */
export function LogoMark({ className = "h-8 w-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 72 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`block shrink-0 overflow-visible ${className}`}
      aria-hidden
    >
      <g
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      >
        {/* Generous padding so stroke never clips; back → front */}
        <path d="M20 52 36 43l16 9v16L36 77 20 68V52Z" />
        <path d="M20 37 36 28l16 9v16L36 62 20 53V37Z" />
        <path d="M20 22 36 13l16 9v16L36 47 20 38V22Z" />
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
      ? "h-7 w-[1.43rem] sm:h-8 sm:w-[1.64rem]"
      : "h-[2.3rem] w-[1.88rem] sm:h-10 sm:w-[2.05rem]";
  const textClass =
    size === "footer"
      ? "text-[13px] leading-none font-extrabold tracking-[0.04em] uppercase sm:text-[15px]"
      : "text-[17px] leading-none font-extrabold tracking-[0.04em] uppercase sm:text-[18.5px]";

  return (
    <a
      href="/"
      className={`inline-flex items-center gap-2.5 leading-none text-black ${className}`}
    >
      <LogoMark className={markClass} />
      <span className={textClass}>BetStackers</span>
    </a>
  );
}
