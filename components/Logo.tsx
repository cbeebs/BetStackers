export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <rect width="28" height="28" rx="4" fill="#00FF88" />
        <path
          d="M8.5 6.5h6.4c2.55 0 4.35 1.35 4.35 3.45 0 1.45-.85 2.55-2.2 3.05v.1c1.7.5 2.75 1.75 2.75 3.55 0 2.4-2 3.85-4.85 3.85H8.5V6.5zm3.05 2.5v3.05h3.15c1.1 0 1.75-.55 1.75-1.5s-.65-1.55-1.75-1.55h-3.15zm0 5.45v3.35h3.55c1.25 0 2.05-.65 2.05-1.7s-.8-1.65-2.05-1.65h-3.55z"
          fill="#000000"
        />
      </svg>
      <span className="text-[15px] font-bold tracking-[0.06em] text-white uppercase sm:text-base">
        BetStackers
      </span>
    </div>
  );
}
