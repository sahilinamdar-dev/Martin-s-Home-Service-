import { Children, useEffect, useRef, useState, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** Classes of the scrolling row; its direct children are the slides. */
  className: string
  as?: 'div' | 'ul'
  /** Dots under the row. Pass the breakpoint where the row stops scrolling, e.g. 'sm:hidden'. */
  dotsClassName?: string
  /** Dots on a dark background. */
  onDark?: boolean
  label: string
  /** Move to the next slide by itself every this many milliseconds. */
  autoPlay?: number
}

/** A swipeable row with page dots, like the banners in an app. The row is
 *  plain CSS scroll-snap, so it works before (and without) JavaScript; the
 *  dots only follow along. */
export function Swiper({ children, className, as: Row = 'div', dotsClassName = '', onDark = false, label, autoPlay }: Props) {
  const ref = useRef<HTMLDivElement & HTMLUListElement>(null)
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)
  const count = Children.toArray(children).length

  useEffect(() => {
    const row = ref.current
    if (!row) return
    function onScroll() {
      if (!row) return
      const slides = Array.from(row.children) as HTMLElement[]
      const first = slides[0]?.offsetLeft ?? 0
      let nearest = 0
      slides.forEach((slide, i) => {
        if (Math.abs(slide.offsetLeft - first - row.scrollLeft) < Math.abs(slides[nearest].offsetLeft - first - row.scrollLeft)) nearest = i
      })
      activeRef.current = nearest
      setActive(nearest)
    }
    row.addEventListener('scroll', onScroll, { passive: true })
    return () => row.removeEventListener('scroll', onScroll)
  }, [])

  function goTo(i: number) {
    const row = ref.current
    const slide = row?.children[i] as HTMLElement | undefined
    const first = row?.children[0] as HTMLElement | undefined
    if (row && slide && first) row.scrollTo({ left: slide.offsetLeft - first.offsetLeft, behavior: 'smooth' })
  }

  // Auto-slide. It waits while the visitor is touching or hovering the row,
  // while the row is off screen or the tab is hidden, and never runs for
  // people who asked their device for less motion.
  useEffect(() => {
    const row = ref.current
    if (!autoPlay || !row || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let held = false
    let onScreen = true
    let release: number | undefined
    const hold = () => {
      held = true
      window.clearTimeout(release)
      release = window.setTimeout(() => (held = false), 6000)
    }
    const observer = new IntersectionObserver(([entry]) => (onScreen = entry.isIntersecting), { threshold: 0.5 })
    observer.observe(row)
    const events = ['pointerdown', 'touchstart', 'wheel', 'mousemove', 'focusin'] as const
    events.forEach((e) => row.addEventListener(e, hold, { passive: true }))
    const timer = window.setInterval(() => {
      if (held || !onScreen || document.hidden) return
      const slides = row.children
      const next = slides[(activeRef.current + 1) % slides.length] as HTMLElement
      row.scrollTo({ left: next.offsetLeft - (slides[0] as HTMLElement).offsetLeft, behavior: 'smooth' })
    }, autoPlay)
    return () => {
      window.clearInterval(timer)
      window.clearTimeout(release)
      observer.disconnect()
      events.forEach((e) => row.removeEventListener(e, hold))
    }
  }, [autoPlay])

  return (
    <>
      <Row ref={ref} className={className}>
        {children}
      </Row>
      {count > 1 && (
        <div className={`mt-4 flex items-center justify-center gap-1.5 ${dotsClassName}`}>
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`${label}: ${i + 1} of ${count}`}
              aria-current={i === active}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === active ? `w-6 ${onDark ? 'bg-sun-400' : 'bg-navy-900'}` : `w-2 ${onDark ? 'bg-white/35' : 'bg-navy-900/20'}`}`}
            />
          ))}
        </div>
      )}
    </>
  )
}
