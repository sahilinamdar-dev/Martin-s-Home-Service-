/** Localities within roughly 15 km of the Yerawada base. Each one gets its own
 *  landing page, so every entry needs a note that is true of that place — pages
 *  that differ only by the name are treated as spam by search engines. */

export const ZONES = ['Around Yerawada', 'East Pune', 'North Pune', 'Central Pune', 'South Pune', 'West Pune', 'Pimpri-Chinchwad side'] as const

export type Zone = (typeof ZONES)[number]

export type Area = {
  slug: string
  name: string
  zone: Zone
  note: string
  /** Other common spellings of the name, which people also type into search. */
  aka?: string[]
}

export const AREAS: Area[] = [
  // Around Yerawada
  { slug: 'yerawada', name: 'Yerawada', aka: ['Yerwada', 'Yeravda'], zone: 'Around Yerawada', note: 'Yerawada is our home base, so societies, flats and offices here are the quickest for us to reach.' },
  { slug: 'kalyani-nagar', name: 'Kalyani Nagar', zone: 'Around Yerawada', note: 'Right next to Yerawada — apartments, row houses and offices are all a short ride from us.' },
  { slug: 'viman-nagar', name: 'Viman Nagar', zone: 'Around Yerawada', note: 'We clean flats in housing societies and offices across Viman Nagar, near the airport.' },
  { slug: 'koregaon-park', name: 'Koregaon Park', zone: 'Around Yerawada', note: 'Bungalows, apartments and offices in the lanes of Koregaon Park, just across the river from Yerawada.' },
  { slug: 'shastri-nagar', name: 'Shastri Nagar', zone: 'Around Yerawada', note: 'Shastri Nagar is a neighbour of Yerawada, so we can usually fit in a visit at a time that suits you.' },
  { slug: 'tingre-nagar', name: 'Tingre Nagar', zone: 'Around Yerawada', note: 'Flats and independent houses in Tingre Nagar, a few minutes north of our base.' },
  { slug: 'vishrantwadi', name: 'Vishrantwadi', zone: 'Around Yerawada', note: 'Housing societies and family homes in Vishrantwadi, along Alandi Road.' },
  { slug: 'sangamwadi', name: 'Sangamwadi', zone: 'Around Yerawada', note: 'Homes and offices in Sangamwadi, between Yerawada and Shivajinagar.' },
  { slug: 'bund-garden', name: 'Bund Garden', zone: 'Around Yerawada', note: 'Apartments and offices on and around Bund Garden Road, just over the bridge from Yerawada.' },

  // East Pune
  { slug: 'kharadi', name: 'Kharadi', zone: 'East Pune', note: 'High-rise societies and IT offices in Kharadi — popular for move-in and full deep cleaning.' },
  { slug: 'wadgaon-sheri', name: 'Wadgaon Sheri', aka: ['Vadgaon Sheri'], zone: 'East Pune', note: 'Flats and row houses in Wadgaon Sheri, off Nagar Road.' },
  { slug: 'chandan-nagar', name: 'Chandan Nagar', zone: 'East Pune', note: 'Family homes and societies in Chandan Nagar, along Nagar Road.' },
  { slug: 'wagholi', name: 'Wagholi', zone: 'East Pune', note: 'New housing societies in Wagholi, where many families book cleaning before moving in.' },
  { slug: 'mundhwa', name: 'Mundhwa', zone: 'East Pune', note: 'Apartments and offices in Mundhwa, between Koregaon Park and Hadapsar.' },
  { slug: 'keshav-nagar', name: 'Keshav Nagar', zone: 'East Pune', note: 'Newer apartment towers in Keshav Nagar, next to Mundhwa.' },
  { slug: 'magarpatta', name: 'Magarpatta', zone: 'East Pune', note: 'Flats inside Magarpatta City and the offices around it.' },
  { slug: 'hadapsar', name: 'Hadapsar', zone: 'East Pune', note: 'Societies, independent homes and offices across Hadapsar.' },
  { slug: 'manjri', name: 'Manjri', zone: 'East Pune', note: 'Housing societies in Manjri, beyond Hadapsar.' },
  { slug: 'ghorpadi', name: 'Ghorpadi', zone: 'East Pune', note: 'Homes and flats in Ghorpadi, between Koregaon Park and Camp.' },

  // North Pune
  { slug: 'dhanori', name: 'Dhanori', zone: 'North Pune', note: 'Apartments and societies in Dhanori, north of Vishrantwadi.' },
  { slug: 'lohegaon', name: 'Lohegaon', zone: 'North Pune', note: 'Flats and independent houses in Lohegaon, around the airport.' },
  { slug: 'kalas', name: 'Kalas', zone: 'North Pune', note: 'Family homes in Kalas, off Alandi Road.' },
  { slug: 'dighi', name: 'Dighi', zone: 'North Pune', note: 'Homes and societies in Dighi, further along Alandi Road.' },
  { slug: 'khadki', name: 'Khadki', aka: ['Kirkee'], zone: 'North Pune', note: 'Homes, flats and shops in Khadki, across the river from Yerawada.' },
  { slug: 'bopodi', name: 'Bopodi', zone: 'North Pune', note: 'Flats and houses in Bopodi, on the old Mumbai–Pune road.' },

  // Central Pune
  { slug: 'camp', name: 'Camp', zone: 'Central Pune', note: 'Older bungalows, flats, shops and offices in Pune Camp.' },
  { slug: 'shivajinagar', name: 'Shivajinagar', aka: ['Shivaji Nagar'], zone: 'Central Pune', note: 'Apartments and offices in Shivajinagar, in the centre of the city.' },
  { slug: 'deccan', name: 'Deccan Gymkhana', zone: 'Central Pune', note: 'Flats, older homes and offices around Deccan Gymkhana.' },
  { slug: 'model-colony', name: 'Model Colony', zone: 'Central Pune', note: 'Bungalows and apartments in Model Colony, near Shivajinagar.' },
  { slug: 'swargate', name: 'Swargate', zone: 'Central Pune', note: 'Homes, flats and offices around Swargate.' },

  // South Pune
  { slug: 'wanowrie', name: 'Wanowrie', aka: ['Wanawadi', 'Wanwadi'], zone: 'South Pune', note: 'Societies and row houses in Wanowrie and Fatima Nagar.' },
  { slug: 'kondhwa', name: 'Kondhwa', zone: 'South Pune', note: 'Apartments and family homes across Kondhwa.' },
  { slug: 'nibm-road', name: 'NIBM Road', zone: 'South Pune', note: 'Housing societies along NIBM Road.' },
  { slug: 'bibwewadi', name: 'Bibwewadi', zone: 'South Pune', note: 'Flats and independent homes in Bibwewadi.' },

  // West Pune
  { slug: 'aundh', name: 'Aundh', zone: 'West Pune', note: 'Apartments, bungalows and offices in Aundh.' },
  { slug: 'baner', name: 'Baner', zone: 'West Pune', note: 'Societies and offices in Baner — at the edge of our service area, so please book a little ahead.' },
  { slug: 'balewadi', name: 'Balewadi', zone: 'West Pune', note: 'Apartment towers in Balewadi — at the edge of our service area, so please book a little ahead.' },
  { slug: 'pashan', name: 'Pashan', zone: 'West Pune', note: 'Homes and societies in Pashan.' },
  { slug: 'kothrud', name: 'Kothrud', zone: 'West Pune', note: 'Flats and family homes across Kothrud.' },

  // Pimpri-Chinchwad side
  { slug: 'dapodi', name: 'Dapodi', zone: 'Pimpri-Chinchwad side', note: 'Homes and flats in Dapodi, just past Bopodi.' },
  { slug: 'sangvi', name: 'Sangvi', zone: 'Pimpri-Chinchwad side', note: 'Flats and societies in Old and New Sangvi.' },
  { slug: 'pimple-gurav', name: 'Pimple Gurav', zone: 'Pimpri-Chinchwad side', note: 'Apartments and family homes in Pimple Gurav.' },
  { slug: 'pimple-saudagar', name: 'Pimple Saudagar', zone: 'Pimpri-Chinchwad side', note: 'Large housing societies in Pimple Saudagar.' },
  { slug: 'kasarwadi', name: 'Kasarwadi', zone: 'Pimpri-Chinchwad side', note: 'Homes and flats in Kasarwadi.' },
  { slug: 'bhosari', name: 'Bhosari', zone: 'Pimpri-Chinchwad side', note: 'Homes, societies and small offices in Bhosari.' },
  { slug: 'pimpri', name: 'Pimpri', zone: 'Pimpri-Chinchwad side', note: 'Flats, homes and offices in Pimpri.' },
]

export function getArea(slug: string | undefined): Area | undefined {
  return AREAS.find((a) => a.slug === slug)
}

export function areaPath(a: Area): string {
  return `/cleaning-services/${a.slug}`
}

/** Other localities to link from an area page: its own zone first, then the ones around the base. */
export function nearbyAreas(area: Area, limit = 8): Area[] {
  // Start from the area's own place in its zone and wrap round, so the last
  // areas of a long zone are linked as often as the first.
  const zone = AREAS.filter((a) => a.zone === area.zone)
  const at = zone.findIndex((a) => a.slug === area.slug)
  const sameZone = [...zone.slice(at + 1), ...zone.slice(0, at)]
  const aroundBase = AREAS.filter((a) => a.zone === 'Around Yerawada' && a.zone !== area.zone)
  return [...sameZone, ...aroundBase].slice(0, limit)
}

/** The localities shown on the home page. */
export const TOP_AREAS = AREAS.filter((a) => a.zone === 'Around Yerawada' || ['kharadi', 'wadgaon-sheri', 'hadapsar', 'camp', 'dhanori', 'aundh'].includes(a.slug))
