import type { Faq } from './services'
import { PRICE_SUMMARY } from './prices'
import { REACH_US, SITE, absoluteUrl, waLink } from './site'

export type FestivalOffer = {
  id: string
  /** Big label on the card, e.g. '15% OFF'. */
  badge: string
  title: string
  /** One line for cards. */
  text: string
  /** The offer as a phrase, for sentences and search-engine markup. */
  summary: string
  /** Slugs from services.ts this offer applies to. Empty = any service. */
  services: string[]
}

/** The festival campaign — the one place to edit offers, dates and terms.
 *  Set `enabled: false` after the season to remove every offer from the site;
 *  the offers also hide themselves in the browser once `endsOn` has passed. */
export const FESTIVAL = {
  enabled: true,
  slug: 'diwali-cleaning-offers',
  name: 'Diwali & Dussehra',
  year: 2026,
  /** ISO dates. Navratri starts, Vijayadashami, Dhanteras, Lakshmi Pujan. */
  navratri: '2026-10-11',
  dussehra: '2026-10-20',
  dhanteras: '2026-11-06',
  diwali: '2026-11-08',
  startsOn: '2026-10-06',
  /** Last day a booking can claim an offer. */
  endsOn: '2026-11-08',
  /** Short line for the top bar and the scroll offer. */
  headline: 'Up to 20% off deep cleaning',
  /** The first offer is the featured one shown in the scroll offer. */
  offers: [
    {
      id: 'full-home',
      badge: '15% OFF',
      title: 'Diwali Full Home Deep Clean',
      text: 'Every room, kitchen, bathrooms, sofa and floors deep cleaned in one booking — the whole home ready for Diwali.',
      summary: '15% off complete deep cleaning',
      services: ['complete-deep-cleaning'],
    },
    {
      id: 'kitchen-bathroom',
      badge: '10% OFF',
      title: 'Kitchen + Bathroom Combo',
      text: 'Book kitchen deep cleaning and bathroom deep cleaning together. Chimney, stove, tiles and fittings, all in one visit.',
      summary: '10% off kitchen and bathroom deep cleaning booked together',
      services: ['kitchen-deep-cleaning', 'bathroom-deep-cleaning'],
    },
    {
      id: 'society-group',
      badge: '20% OFF',
      title: 'Society Group Offer',
      text: 'Three or more flats in the same society booking together? Every flat gets the group discount on any cleaning.',
      summary: '20% off for each flat when 3 or more flats in one society book together',
      services: [],
    },
  ] as FestivalOffer[],
  terms: [
    'The discount is on the charges we quote for your home on WhatsApp.',
    'One offer per booking. Offers cannot be combined.',
    `Valid in ${SITE.base} and areas within about ${SITE.radiusKm} km, ${SITE.city}.`,
  ],
}

export const FESTIVAL_PATH = `/${FESTIVAL.slug}`

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function parts(iso: string): [number, number, number] {
  const [y, m, d] = iso.split('-').map(Number)
  return [y, m, d]
}

/** '2026-11-08' → '8 November 2026'. Hand-rolled so the server and the browser print the same text. */
export function formatDay(iso: string, withYear = true): string {
  const [y, m, d] = parts(iso)
  return `${d} ${MONTHS[m - 1]}${withYear ? ` ${y}` : ''}`
}

function endOfDay(iso: string): Date {
  const [y, m, d] = parts(iso)
  return new Date(y, m - 1, d, 23, 59, 59)
}

export function isFestivalLive(now: Date = new Date()): boolean {
  return FESTIVAL.enabled && now <= endOfDay(FESTIVAL.endsOn)
}

/** Whole days from now until the end of the given day; 0 on the day itself. */
export function daysUntil(iso: string, now: Date = new Date()): number {
  return Math.floor((endOfDay(iso).getTime() - now.getTime()) / 86_400_000)
}

export const OFFER_ENDS_LABEL = formatDay(FESTIVAL.endsOn)

/** "15% off complete deep cleaning; 10% off …; 20% off …" */
export const OFFER_SUMMARY = FESTIVAL.offers.map((o) => o.summary).join('; ')

export function offersForService(slug: string): FestivalOffer[] {
  return FESTIVAL.offers.filter((o) => o.services.includes(slug))
}

export function waOfferLink(offer: FestivalOffer, areaName?: string): string {
  const where = areaName ? ` in ${areaName}` : ''
  return waLink(`Hi ${SITE.name}, I want the ${FESTIVAL.name} offer "${offer.title}" (${offer.badge})${where}.`)
}

export const WA_FESTIVAL = waLink(`Hi ${SITE.name}, I want to book ${FESTIVAL.name} cleaning. Please tell me the offer for my home.`)

/** Opens WhatsApp's own "send to" screen, so the visitor can pick their society group. */
export const WA_SHARE_OFFERS = `https://wa.me/?text=${encodeURIComponent(
  `${FESTIVAL.name} cleaning offers from ${SITE.name} — ${FESTIVAL.headline.toLowerCase()}. If 3 or more flats in our society book together, every flat gets the group offer. ${absoluteUrl(FESTIVAL_PATH)}`,
)}`

export const FESTIVAL_FAQS: Faq[] = [
  {
    q: `Is there a Diwali cleaning offer in ${SITE.city} in ${FESTIVAL.year}?`,
    a: `Yes. ${SITE.name} has ${FESTIVAL.name} offers for bookings made until ${OFFER_ENDS_LABEL}: ${OFFER_SUMMARY}. ${REACH_US} to claim one.`,
  },
  {
    q: 'When should I book Diwali cleaning?',
    a: `Diwali ${FESTIVAL.year} is on ${formatDay(FESTIVAL.diwali)} and Dussehra (Dasara) is on ${formatDay(FESTIVAL.dussehra)}. Book two to three weeks before Diwali so you get the day and time you want — the last week before the festival is the busiest.`,
  },
  {
    q: 'What is included in Diwali deep cleaning?',
    a: 'A complete deep cleaning of the home: dusting and wiping in every room, floors, furniture, windows and glass, kitchen deep cleaning (stove, chimney, sink, cabinets, tiles), bathroom deep cleaning (tiles, toilet, basin, taps, mirror) and sofa cleaning. You can also book only the kitchen, the bathrooms or the sofa.',
  },
  {
    q: 'Do you also do cleaning before Navratri and Dussehra?',
    a: `Yes. Many families clean the home before Navratri (from ${formatDay(FESTIVAL.navratri, false)}) and Dussehra (${formatDay(FESTIVAL.dussehra, false)}). The same festival offers apply from now until ${OFFER_ENDS_LABEL}.`,
  },
  {
    q: 'How much does Diwali cleaning cost?',
    a: `Deep cleaning charges before the festival discount: ${PRICE_SUMMARY}. The final charge depends on the size and condition of your home and the services you pick. Send the details or a few photos on WhatsApp and we tell you the charges there, with the festival discount applied. Asking is free.`,
  },
  {
    q: 'How does the society group offer work?',
    a: 'When three or more flats in the same housing society book together, every flat gets the group discount. Share our number in your society WhatsApp group, then message us the society name and the flats that want cleaning.',
  },
  {
    q: 'Which areas do you cover for Diwali cleaning?',
    a: `${SITE.base} and areas within about ${SITE.radiusKm} km in ${SITE.city} — Kalyani Nagar, Viman Nagar, Yerawada, Kharadi, Wadgaon Sheri, Vishrantwadi, Dhanori, Hadapsar, Camp, Shivajinagar, Aundh and more.`,
  },
]

/** One locality-specific question for each area page. */
export function festivalAreaFaq(areaName: string): Faq {
  return {
    q: `Do you do Diwali cleaning in ${areaName}?`,
    a: `Yes. ${SITE.name} does Diwali and Dussehra deep cleaning for homes, flats and offices in ${areaName}, ${SITE.city}. Festival offers until ${OFFER_ENDS_LABEL}: ${OFFER_SUMMARY}. ${REACH_US} to book your day.`,
  }
}
