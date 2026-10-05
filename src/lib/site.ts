/** Business facts — the one place to edit when the owner confirms details.
 *  Empty values are left out of the page and of the search-engine markup
 *  rather than guessed. */
export const SITE = {
  name: "Martin's Home Service",
  tagline: 'Making every corner shine',
  /** 10-digit number used for both calls and WhatsApp. */
  phone: '7875871443',
  countryCode: '91',
  city: 'Pune',
  state: 'Maharashtra',
  /** Locality the business works out of. The served localities are in areas.ts. */
  base: 'Yerawada',
  /** How far from the base we travel. */
  radiusKm: 15,
  /** Approximate centre of the base locality, for the service-area circle in the schema. */
  geo: { lat: 18.5529, lng: 73.8796 },
  /** e.g. 'Mo-Su 08:00-20:00' (schema.org openingHours format). */
  openingHours: '',
  /** Human version of the above, e.g. 'Every day, 8 am – 8 pm'. */
  hoursLabel: '',
  url: ((import.meta.env.VITE_SITE_URL as string | undefined) ?? 'https://martins-home-service.vercel.app').replace(/\/$/, ''),
}

/** " in Pune" once the city is known, otherwise nothing. */
export const IN_CITY = SITE.city ? ` in ${SITE.city}` : ''

export const PHONE_DISPLAY = `${SITE.phone.slice(0, 5)} ${SITE.phone.slice(5)}`
export const PHONE_E164 = `+${SITE.countryCode}${SITE.phone}`
export const TEL_LINK = `tel:${PHONE_E164}`

export function waLink(message: string): string {
  return `https://wa.me/${SITE.countryCode}${SITE.phone}?text=${encodeURIComponent(message)}`
}

export const WA_DEFAULT = waLink(`Hi ${SITE.name}, I would like a quote for cleaning.`)

export function waServiceLink(serviceName: string): string {
  return waLink(`Hi ${SITE.name}, I would like a quote for ${serviceName}.`)
}

export function absoluteUrl(path: string): string {
  return `${SITE.url}${path === '/' ? '/' : path}`
}
