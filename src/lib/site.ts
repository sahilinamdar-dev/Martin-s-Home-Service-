/** Business facts — the one place to edit when the owner confirms details.
 *  Empty values are left out of the page and of the search-engine markup
 *  rather than guessed. */
export const SITE = {
  name: "Martin's Home Service",
  tagline: 'Making every corner shine',
  /** 10-digit number for calls. */
  phone: '9604557901',
  /** 10-digit number for WhatsApp. Can be the same as `phone`. */
  whatsapp: '7875871443',
  /** Second 10-digit number that also takes calls. Leave empty if there is none. */
  altPhone: '7875871443',
  countryCode: '91',
  /** Year the business started taking jobs. */
  foundedYear: 2011,
  city: 'Pune',
  state: 'Maharashtra',
  /** Locality the business works out of. The served localities are in areas.ts. */
  base: 'Yerawada',
  /** PIN code of the base locality. */
  postalCode: '411006',
  /** Google Business Profile link. Leave empty if there is none. */
  googleProfile: 'https://share.google/DRZlBeUSUwHXWYrQq',
  /** How far from the base we travel. */
  radiusKm: 15,
  /** Approximate centre of the base locality, for the service-area circle in the schema. */
  geo: { lat: 18.5529, lng: 73.8796 },
  /** e.g. 'Mo-Su 08:00-20:00' (schema.org openingHours format). */
  openingHours: 'Mo-Su 09:00-20:30',
  /** Human version of the above, e.g. 'Every day, 8 am – 8 pm'. */
  hoursLabel: 'Every day, 9 am – 8:30 pm',
  url: ((import.meta.env.VITE_SITE_URL as string | undefined) ?? 'https://martinshomeservies.in').replace(/\/$/, ''),
}

/** " in Pune" once the city is known, otherwise nothing. */
export const IN_CITY = SITE.city ? ` in ${SITE.city}` : ''

export const PHONE_DISPLAY = `${SITE.phone.slice(0, 5)} ${SITE.phone.slice(5)}`
export const PHONE_E164 = `+${SITE.countryCode}${SITE.phone}`
export const TEL_LINK = `tel:${PHONE_E164}`

export const ALT_PHONE_DISPLAY = SITE.altPhone ? `${SITE.altPhone.slice(0, 5)} ${SITE.altPhone.slice(5)}` : ''
export const ALT_PHONE_E164 = SITE.altPhone ? `+${SITE.countryCode}${SITE.altPhone}` : ''
export const ALT_TEL_LINK = `tel:${ALT_PHONE_E164}`

/** "WhatsApp or call 96045 57901" — or both numbers, when they differ. */
export const REACH_US = SITE.whatsapp === SITE.phone ? `WhatsApp or call ${SITE.phone}` : `WhatsApp ${SITE.whatsapp} or call ${SITE.phone}`

export function waLink(message: string): string {
  return `https://wa.me/${SITE.countryCode}${SITE.whatsapp}?text=${encodeURIComponent(message)}`
}

export const WA_DEFAULT = waLink(`Hi ${SITE.name}, I would like a quote for cleaning.`)

export function waServiceLink(serviceName: string): string {
  return waLink(`Hi ${SITE.name}, I would like a quote for ${serviceName}.`)
}

export function absoluteUrl(path: string): string {
  return `${SITE.url}${path === '/' ? '/' : path}`
}
