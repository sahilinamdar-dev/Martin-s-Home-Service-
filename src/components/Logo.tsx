type MarkProps = { className?: string; onDark?: boolean }

/** M under a roof with a sparkle — same drawing as public/favicon.svg. */
export function LogoMark({ className, onDark = false }: MarkProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#131a4a" stroke={onDark ? 'rgba(255,255,255,0.2)' : 'none'} strokeWidth="2" />
      <path d="M10 27 32 9l22 18" fill="none" stroke="#fbbf24" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 52V30l15 12 15-12v22" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <path className="twinkle" d="m50 9 1.300 2.700 2.700 1.300-2.700 1.300-1.300 2.700-1.300-2.700-2.700-1.300 2.700-1.300z" fill="#10b981" />
    </svg>
  )
}

export function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className="h-10 w-10 shrink-0" onDark={onDark} />
      <span className="leading-none">
        <span className={`block text-lg font-extrabold tracking-tight ${onDark ? 'text-white' : 'text-navy-900'}`}>Martin&rsquo;s</span>
        <span className={`block text-[0.7rem] font-bold uppercase tracking-[0.2em] ${onDark ? 'text-leaf-500' : 'text-leaf-700'}`}>Home Service</span>
      </span>
    </span>
  )
}
