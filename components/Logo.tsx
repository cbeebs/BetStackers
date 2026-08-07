export function LogoMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M8 22.5L16 18l8 4.5V31l-8 4.5L8 31V22.5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M8 13.5L16 9l8 4.5V22L16 26.5 8 22V13.5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M8 4.5L16 0l8 4.5V13L16 17.5 8 13V4.5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <a
      href="/"
      className={`inline-flex items-center gap-2.5 text-foreground ${className}`}
    >
      <LogoMark className="h-8 w-7" />
      <span className="text-[15px] font-extrabold tracking-[0.04em] uppercase sm:text-base">
        BetStacker
      </span>
    </a>
  );
}
