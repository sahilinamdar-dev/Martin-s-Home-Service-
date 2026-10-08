import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, Share2, X } from 'lucide-react'
import { FESTIVAL, FESTIVAL_PATH, OFFER_ENDS_LABEL, WA_SHARE_OFFERS, offersForService, waOfferLink } from '../lib/festival'
import { daysLeftLabel, useDaysLeft, useFestivalLive } from '../lib/useFestival'
import { Swiper } from './Swiper'
import { WhatsAppIcon } from './WhatsAppIcon'

/** A small oil lamp. */
export function Diya({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path className="twinkle" d="M24 4c5 6 7 10 7 13a7 7 0 0 1-14 0c0-3 2-7 7-13z" fill="#ffc93c" />
      <path d="M24 12c2 3 3 5 3 6.5a3 3 0 0 1-6 0c0-1.5 1-3.5 3-6.5z" fill="#ff8a3c" />
      <path d="M5 27h38c0 9-8 15-19 15S5 36 5 27z" fill="#e2622b" />
      <path d="M5 27h38c0 3-1 5-2.5 7h-33C6 32 5 30 5 27z" fill="#f5913e" />
      <circle cx="14" cy="31" r="1.5" fill="#ffe7a8" />
      <circle cx="24" cy="31" r="1.5" fill="#ffe7a8" />
      <circle cx="34" cy="31" r="1.5" fill="#ffe7a8" />
    </svg>
  )
}

/** Thin strip above the header on every page. */
export function FestivalBar() {
  const live = useFestivalLive()
  const { pathname } = useLocation()
  if (!live || pathname === FESTIVAL_PATH) return null
  return (
    <Link to={FESTIVAL_PATH} className="block bg-festive-800 text-white hover:bg-festive-900">
      <span className="container-page flex items-center justify-center gap-2 py-2 text-center text-[0.8rem] font-bold sm:text-sm">
        <Diya className="h-5 w-5 shrink-0" />
        <span className="truncate">
          <span className="sm:hidden">Festival offer: </span>
          <span className="hidden sm:inline">{FESTIVAL.name} offer: </span>
          <span className="text-sun-400">{FESTIVAL.headline}</span>
        </span>
        <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
      </span>
    </Link>
  )
}

/** The offer cards. With `area`, the heading and the WhatsApp messages name that locality. */
export function FestivalOffers({ area, showLink = false, headingLevel = 'h2' }: { area?: string; showLink?: boolean; headingLevel?: 'h2' | 'h3' }) {
  const live = useFestivalLive()
  const daysLeft = useDaysLeft(FESTIVAL.diwali)
  if (!live) return null
  const Heading = headingLevel
  return (
    <div>
      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-festive-700 sm:text-sm">
            <Diya className="h-5 w-5" />
            Festival offers {FESTIVAL.year}
          </p>
          <Heading className="mt-1.5 text-2xl font-extrabold leading-tight tracking-tight text-navy-950 sm:text-4xl">
            {FESTIVAL.name} cleaning offers{area ? ` in ${area}` : ''}
          </Heading>
        </div>
        {daysLeft !== null && <p className="shrink-0 rounded-full bg-festive-800 px-3 py-1.5 text-xs font-bold text-sun-400 sm:text-sm">{daysLeftLabel(daysLeft, 'Diwali')}</p>}
      </div>
      <p className="mt-2 text-navy-700 sm:text-lg">Book by {OFFER_ENDS_LABEL} and pick the offer that fits.</p>

      {/* Coupons: swiped sideways on phones, three across from tablets up. */}
      <Swiper as="ul" label="Offer" dotsClassName="md:hidden" className="no-scrollbar -mx-4 mt-5 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-1 md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0">
        {FESTIVAL.offers.map((o) => (
          <li key={o.id} className="flex w-[78%] shrink-0 snap-start flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-navy-900/5 ring-1 ring-navy-900/5 md:w-auto">
            <div className="relative overflow-hidden bg-gradient-to-br from-festive-900 to-festive-700 px-5 py-4">
              <p className="text-3xl font-extrabold tracking-tight text-sun-400">{o.badge}</p>
              <Diya className="pointer-events-none absolute -bottom-2 right-3 h-16 w-16" />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <p className="text-lg font-extrabold leading-tight text-navy-950">{o.title}</p>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-navy-700">{o.text}</p>
              <a href={waOfferLink(o, area)} target="_blank" rel="noopener" aria-label={`Claim on WhatsApp: ${o.title}`} className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-leaf-700 px-5 text-sm font-bold text-white hover:bg-leaf-800 active:scale-[0.98]">
                <WhatsAppIcon className="h-4 w-4" />
                Claim on WhatsApp
              </a>
            </div>
          </li>
        ))}
      </Swiper>

      <a href={WA_SHARE_OFFERS} target="_blank" rel="noopener" className="mt-4 flex items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-navy-900/5 hover:ring-leaf-600 active:scale-[0.99]">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sun-400 text-navy-950">
          <Share2 className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-extrabold text-navy-950 sm:text-base">Share in your society WhatsApp group</span>
          <span className="block text-xs text-navy-700 sm:text-sm">Three flats booking together unlock the group offer.</span>
        </span>
        <ArrowRight className="h-5 w-5 shrink-0 text-leaf-700" aria-hidden="true" />
      </a>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs text-navy-600 sm:text-sm">
        <p>{FESTIVAL.terms.join(' ')}</p>
        {showLink && (
          <Link to={FESTIVAL_PATH} className="inline-flex items-center gap-1.5 font-bold text-festive-700 hover:underline">
            Offer details &amp; Diwali cleaning checklist
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        )}
      </div>
    </div>
  )
}

/** One-line offer for a service page: the offer that covers this service, or the headline. */
export function FestivalStrip({ serviceSlug }: { serviceSlug: string }) {
  const live = useFestivalLive()
  if (!live) return null
  const offer = offersForService(serviceSlug)[0]
  return (
    <Link to={FESTIVAL_PATH} className="flex items-center gap-3 rounded-2xl bg-festive-800 p-4 text-white hover:bg-festive-900 active:scale-[0.99]">
      <Diya className="h-9 w-9 shrink-0" />
      <span className="min-w-0 flex-1">
        <span className="block font-extrabold">
          {FESTIVAL.name} offer{offer ? `: ${offer.badge}` : ''}
        </span>
        <span className="block text-sm text-white/85">{offer ? `${offer.title} — book by ${OFFER_ENDS_LABEL}.` : `${FESTIVAL.headline} — book by ${OFFER_ENDS_LABEL}.`}</span>
      </span>
      <ArrowRight className="h-5 w-5 shrink-0 text-sun-400" aria-hidden="true" />
    </Link>
  )
}

const DISMISS_KEY = 'festival-offer-dismissed'

function wasDismissed(): boolean {
  try {
    return sessionStorage.getItem(DISMISS_KEY) === '1'
  } catch {
    return false
  }
}

/** The featured offer, sliding in once the visitor has scrolled a third of the
 *  page. Closing it keeps it closed for the rest of the visit. */
export function FestivalScrollOffer() {
  const live = useFestivalLive()
  const { pathname } = useLocation()
  const daysLeft = useDaysLeft(FESTIVAL.diwali)
  const [shown, setShown] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const offer = FESTIVAL.offers[0]

  useEffect(() => {
    if (wasDismissed()) return
    function onScroll() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      if (scrollable > 0 && window.scrollY / scrollable > 0.3) {
        setShown(true)
        window.removeEventListener('scroll', onScroll)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function dismiss() {
    setDismissed(true)
    try {
      sessionStorage.setItem(DISMISS_KEY, '1')
    } catch {
      // Private mode: stays closed until the next page load.
    }
  }

  if (!live || !offer || !shown || dismissed || pathname === FESTIVAL_PATH) return null

  return (
    // Sits above the phone bottom bar; bottom-right corner on larger screens.
    <aside
      aria-label={`${FESTIVAL.name} offer`}
      className="offer-pop fixed inset-x-3 bottom-[calc(max(0.75rem,env(safe-area-inset-bottom))+5.75rem)] z-30 mx-auto max-w-md rounded-3xl bg-gradient-to-br from-festive-900 to-festive-700 p-4 text-white shadow-2xl shadow-navy-950/40 ring-1 ring-white/15 md:inset-x-auto md:bottom-6 md:right-6 md:mx-0 md:w-96 md:p-5"
    >
      <button type="button" onClick={dismiss} aria-label="Close offer" className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full text-white/80 hover:bg-white/10 hover:text-white">
        <X className="h-5 w-5" aria-hidden="true" />
      </button>
      <div className="flex items-start gap-3 pr-8">
        <Diya className="h-11 w-11 shrink-0" />
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-sun-400">
            {FESTIVAL.name} offer{daysLeft !== null ? ` · ${daysLeftLabel(daysLeft, 'Diwali')}` : ''}
          </p>
          <p className="mt-1 text-lg font-extrabold leading-tight">
            <span className="text-sun-400">{offer.badge}</span> {offer.title}
          </p>
          <p className="mt-1 text-sm leading-snug text-white/85">Book by {OFFER_ENDS_LABEL}. Charges told on WhatsApp first.</p>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <a href={waOfferLink(offer)} target="_blank" rel="noopener" className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-sun-400 px-4 text-sm font-extrabold text-navy-950 hover:bg-sun-500 active:scale-[0.98]">
          <WhatsAppIcon className="h-4 w-4" />
          Claim offer
        </a>
        <Link to={FESTIVAL_PATH} onClick={dismiss} className="flex min-h-11 items-center justify-center rounded-full px-4 text-sm font-bold text-white ring-1 ring-white/40 hover:bg-white/10">
          All offers
        </Link>
      </div>
    </aside>
  )
}
