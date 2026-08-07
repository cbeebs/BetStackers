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
        <path
          d="M6 4h9.2c3.4 0 5.8 1.9 5.8 4.7 0 2-1.1 3.5-2.9 4.2v.1c2.3.7 3.7 2.4 3.7 4.8 0 3.2-2.6 5.2-6.4 5.2H6V4zm4.1 3.4v4.1h4.6c1.5 0 2.4-.8 2.4-2.1s-.9-2-2.4-2H10.1zm0 7.3v4.5h5.2c1.7 0 2.8-.9 2.8-2.3s-1.1-2.2-2.8-2.2h-5.2z"
          fill="#00FF88"
        />
        <path
          d="M10.1 7.4h4.6c1.5 0 2.4.8 2.4 2.1s-.9 2.1-2.4 2.1h-4.6V7.4z"
          fill="#FFFFFF"
        />
      </svg>
      <span className="text-[15px] font-bold tracking-[0.06em] text-white uppercase sm:text-base">
        BetStackers
      </span>
    </div>
  );
}
