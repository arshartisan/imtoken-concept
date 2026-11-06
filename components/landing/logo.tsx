import { cx } from "@/utils/cx";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cx("size-8", className)} aria-hidden>
      <defs>
        <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6aa5ff" />
          <stop offset="1" stopColor="#1f63e6" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#logo-g)" />
      <circle cx="16" cy="16" r="9" fill="none" stroke="#fff" strokeWidth="2.6" />
      <circle cx="16" cy="16" r="4" fill="none" stroke="#fff" strokeOpacity=".75" strokeWidth="2.4" />
      <circle cx="16" cy="16" r="1.4" fill="#fff" />
    </svg>
  );
}

export function Logo({ className, size = "md" }: { className?: string; size?: "md" | "xl" }) {
  return (
    <span className={cx("inline-flex items-center gap-2.5 text-landing-ink", className)}>
      <LogoMark className={size === "xl" ? "size-[0.9em]" : "size-8"} />
      <span className={cx("font-serif tracking-tight", size === "xl" ? "" : "text-[1.75rem] leading-none")}>imToken</span>
    </span>
  );
}
