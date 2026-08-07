/** Crisp vector mark — three stacked isometric tiles. */
export function LogoMark({ className = "h-8 w-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      shapeRendering="geometricPrecision"
    >
      <g
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {/* Bottom */}
        <path d="M8 22.5 16 18l8 4.5V31l-8 4.5L8 31V22.5Z" />
        {/* Middle */}
        <path d="M8 13.5 16 9l8 4.5V22L16 26.5 8 22V13.5Z" />
        {/* Top */}
        <path d="M8 4.5 16 0l8 4.5V13L16 17.5 8 13V4.5Z" />
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
      ? "h-7 w-6 sm:h-8 sm:w-7"
      : "h-[2.3rem] w-8 sm:h-10 sm:w-9";
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
