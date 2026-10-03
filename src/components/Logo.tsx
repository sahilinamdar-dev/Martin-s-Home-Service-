type MarkProps = { className?: string; onDark?: boolean }

/** House + leaf + sparkle, redrawn from the business card. */
export function LogoMark({ className, onDark = false }: MarkProps) {
  const house = onDark ? '#ffffff' : '#0f2a4a'
  const pane = onDark ? '#0f2a4a' : '#fbf8f1'
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M9 33 32 13l23 20" fill="none" stroke={house} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 31v19h28V31L32 19z" fill={house} />
      <path d="M26.5 33h4.5v4.500h-4.500zm6.500 0h4.500v4.500H33zm-6.500 6.500h4.500V44h-4.500zm6.500 0h4.500V44H33z" fill={pane} />
      <path d="M4 54c4-11 13-14.500 22-11.500C24.500 52 15 57 4 54z" fill="#2fa35f" />
      <path d="M8 52c5-4 10-6.500 16-8" fill="none" stroke="#dcf3e4" strokeWidth="1.500" strokeLinecap="round" />
      <path className="twinkle" d="m52 4 2 5.500 5.500 2-5.500 2-2 5.500-2-5.500-5.500-2 5.500-2z" fill={onDark ? '#ffc93c' : '#1e9bd7'} />
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
