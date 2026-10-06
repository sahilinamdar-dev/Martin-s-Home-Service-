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
}

/** A swipeable row with page dots, like the banners in an app. The row is
 *  plain CSS scroll-snap, so it works before (and without) JavaScript; the
 *  dots only follow along. */
export function Swiper({ children, className, as: Row = 'div', dotsClassName = '', onDark = false, label }: Props) {
  const ref = useRef<HTMLDivElement & HTMLUListElement>(null)
  const [active, setActive] = useState(0)
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
