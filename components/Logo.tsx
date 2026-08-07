/** Crisp vector mark — three stacked isometric tiles. */
export function LogoMark({ className = "h-8 w-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      overflow="visible"
      shapeRendering="geometricPrecision"
    >
      <g
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="miter"
        strokeMiterlimit="2.5"
        strokeLinecap="butt"
      >
        {/* Drawn back → front so overlaps stay clean */}
        <path d="M10 26.5 18 22l8 4.5V34l-8 4.5L10 34V26.5Z" />
        <path d="M10 18.5 18 14l8 4.5V26l-8 4.5L10 26V18.5Z" />
        <path d="M10 10.5 18 6l8 4.5V18l-8 4.5L10 18V10.5Z" />
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
      className={`inline-flex items-center gap-2.5 text-black ${className}`}
    >
      <LogoMark className={markClass} />
      <span className={textClass}>BetStackers</span>
    </a>
  );
}
