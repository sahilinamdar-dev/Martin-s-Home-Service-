import { SITE, PHONE_E164, ALT_PHONE_E164, absoluteUrl } from './site'
import { AREAS, areaPath, type Area } from './areas'
import { BEAUTY, BEAUTY_MENU, BEAUTY_PATH, BEAUTY_PHONE_E164 } from './beauty'
import { FESTIVAL, FESTIVAL_PATH } from './festival'
import { PRICES, PRICE_MAX, PRICE_MIN, PRICE_PATH, priceName, rupees } from './prices'
import { SERVICES, servicePath, type Faq, type Service } from './services'

const BUSINESS_ID = `${SITE.url}/#business`

const ADDRESS = { '@type': 'PostalAddress', ...(SITE.street ? { streetAddress: SITE.street } : {}), addressLocality: SITE.city, addressRegion: SITE.state, postalCode: SITE.postalCode, addressCountry: 'IN' }

/** The business, named in full. Search engines read each page alone, so a bare
 *  '@id' pointing at the home page's LocalBusiness tells them nothing here. */
const PROVIDER = { '@type': 'LocalBusiness', '@id': BUSINESS_ID, name: SITE.name, url: `${SITE.url}/`, telephone: PHONE_E164, image: `${SITE.url}/og.jpg`, address: ADDRESS }

/** schema.org LocalBusiness. Location fields appear only once they are set in
 *  site.ts — search engines treat a wrong address as worse than a missing one. */
export function businessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': BUSINESS_ID,
    name: SITE.name,
    slogan: SITE.tagline,
    description: 'Home, flat and office cleaning, bathroom and kitchen deep cleaning, sofa and floor cleaning, dust removal and complete deep cleaning. Also salon at home for ladies: waxing, facials, clean-up, manicure and pedicure.',
    url: `${SITE.url}/`,
    telephone: PHONE_E164,
    foundingDate: String(SITE.foundedYear),
    image: `${SITE.url}/og.jpg`,
    logo: `${SITE.url}/icons/icon-512.png`,
    priceRange: `${rupees(PRICE_MIN)} – ${rupees(PRICE_MAX)}`,
    address: ADDRESS,
    geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    ...(SITE.googleProfile ? { sameAs: [SITE.googleProfile] } : {}),
    areaServed: [
      {
        '@type': 'GeoCircle',
        geoMidpoint: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
        geoRadius: SITE.radiusKm * 1000,
      },
      ...AREAS.map((a) => ({ '@type': 'Place', name: `${a.name}, ${SITE.city}` })),
    ],
    ...(SITE.openingHours ? { openingHours: SITE.openingHours } : {}),
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: SITE.hours.opens,
      closes: SITE.hours.closes,
    },
    contactPoint: [PHONE_E164, ALT_PHONE_E164].filter(Boolean).map((telephone) => ({
      '@type': 'ContactPoint',
      telephone,
      contactType: 'customer service',
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Cleaning services',
      itemListElement: SERVICES.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name, url: absoluteUrl(servicePath(s)) },
      })).concat({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: BEAUTY.name, url: absoluteUrl(BEAUTY_PATH) } }),
    },
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    name: SITE.name,
    alternateName: ["Martin's Home Service Pune", 'Martins Home Service'],
    url: `${SITE.url}/`,
    inLanguage: 'en-IN',
    publisher: { '@id': BUSINESS_ID },
  }
}

/** The festival campaign as a Service with dated Offers. No prices: charges are quoted per home. */
export function festivalSchema() {
  const url = absoluteUrl(FESTIVAL_PATH)
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${FESTIVAL.name} deep cleaning in ${SITE.city}`,
    serviceType: 'House cleaning',
    description: `Diwali and Dussehra deep cleaning for homes, flats and offices in ${SITE.base} and within about ${SITE.radiusKm} km, ${SITE.city}.`,
    url,
    provider: PROVIDER,
    areaServed: { '@type': 'City', name: SITE.city },
    ...(FESTIVAL.enabled
      ? {
          offers: FESTIVAL.offers.map((o) => ({
            '@type': 'Offer',
            name: o.title,
            description: `${o.summary}. ${o.text}`,
            category: `${FESTIVAL.name} festival offer`,
            validFrom: FESTIVAL.startsOn,
            validThrough: FESTIVAL.endsOn,
            url: `${url}#offers`,
            seller: PROVIDER,
          })),
        }
      : {}),
  }
}

/** The price list as one Service with an Offer for each size of home. */
export function priceSchema() {
  const url = absoluteUrl(PRICE_PATH)
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Home deep cleaning in ${SITE.city}`,
    serviceType: 'House cleaning',
    url,
    provider: PROVIDER,
    areaServed: { '@type': 'City', name: SITE.city },
    offers: PRICES.map((p) => ({
      '@type': 'Offer',
      name: `${priceName(p)} deep cleaning`,
      url,
      priceCurrency: 'INR',
      price: p.min,
      priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'INR', minPrice: p.min, ...(p.max ? { maxPrice: p.max } : {}) },
      seller: PROVIDER,
    })),
  }
}

export function faqSchema(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function serviceSchema(s: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.name,
    serviceType: s.name,
    description: s.intro,
    url: absoluteUrl(servicePath(s)),
    provider: PROVIDER,
    areaServed: { '@type': 'City', name: SITE.city },
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

/** All services, as offered in one locality. */
export function areaServiceSchema(area: Area) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Cleaning services in ${area.name}, ${SITE.city}`,
    serviceType: 'House cleaning',
    description: `Home, flat and office cleaning in ${area.name}, ${SITE.city}. ${area.note}`,
    url: absoluteUrl(areaPath(area)),
    provider: PROVIDER,
    areaServed: { '@type': 'Place', name: `${area.name}, ${SITE.city}, ${SITE.state}` },
  }
}

/** Salon at home: one Service with a priced Offer for every item on the menu.
 *  Bookings go to the beautician's own number, given as the service channel. */
export function beautySchema() {
  const url = absoluteUrl(BEAUTY_PATH)
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: `${BEAUTY.name} in ${SITE.city}`,
    alternateName: [`Parlour at home ${SITE.city}`, `Beauty parlour services at home in ${SITE.city}`, 'Ladies salon at home'],
    serviceType: 'Beauty salon services at home',
    description: `Women-only salon at home in ${SITE.base} and about ${SITE.radiusKm} km around, ${SITE.city}: waxing, facials, clean-up, manicure and pedicure by a lady beautician.`,
    url,
    provider: PROVIDER,
    audience: { '@type': 'PeopleAudience', suggestedGender: 'female' },
    areaServed: [{ '@type': 'City', name: SITE.city }, ...AREAS.map((a) => ({ '@type': 'Place', name: `${a.name}, ${SITE.city}` }))],
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: url,
      servicePhone: { '@type': 'ContactPoint', telephone: BEAUTY_PHONE_E164, contactType: 'reservations', availableLanguage: ['en', 'hi', 'mr'] },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Salon at home price list',
      itemListElement: BEAUTY_MENU.map((c) => ({
        '@type': 'OfferCatalog',
        name: c.title,
        itemListElement: c.items.map((i) => ({
          '@type': 'Offer',
          name: i.name,
          description: i.detail,
          price: i.price,
          priceCurrency: 'INR',
          url: `${url}#${c.id}`,
          itemOffered: { '@type': 'Service', name: `${i.name} at home`, serviceType: c.title },
        })),
      })),
    },
  }
}
