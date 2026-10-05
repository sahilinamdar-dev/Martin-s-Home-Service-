import { IN_CITY, SITE } from './site'

export type Faq = { q: string; a: string }

export type Service = {
  slug: string
  name: string
  /** Short label for chips and tabs. */
  chip: string
  /** Pastel background of this service's cards. */
  tint: string
  /** One line for cards. */
  short: string
  /** Opening paragraph of the service page. */
  intro: string
  /** What the job usually covers. The final scope is agreed in the quote. */
  includes: string[]
  goodFor: string[]
  faqs: Faq[]
}

export const SERVICES: Service[] = [
  {
    slug: 'home-flat-office-cleaning',
    chip: 'Home & office',
    tint: '#ead9fb',
    name: 'Home, Flat & Office Cleaning',
    short: 'All rooms and areas of your home, flat or office cleaned top to bottom.',
    intro:
      'A full clean of every room and area — dusting and wiping, floors, furniture, windows and glass. For homes, flats and offices of any size.',
    includes: [
      'Dusting and wiping of all surfaces',
      'Floor cleaning in every room',
      'Furniture cleaning',
      'Window and glass cleaning',
      'Corners and hard-to-reach spots',
      'A fresh, hygienic finish throughout',
    ],
    goodFor: ['Regular upkeep of a home or flat', 'Before guests or a festival', 'Offices and small workplaces', 'Moving in or moving out'],
    faqs: [
      {
        q: 'Do you clean offices as well as homes?',
        a: 'Yes. We clean homes, flats and offices. Tell us the size of the place and what needs doing, and we will send a quote.',
      },
      {
        q: 'How long does a full home cleaning take?',
        a: 'It depends on the size of the place and its condition. We give you an expected time together with the quote, before you book.',
      },
    ],
  },
  {
    slug: 'bathroom-deep-cleaning',
    chip: 'Bathroom',
    tint: '#cfeedd',
    name: 'Bathroom Deep Cleaning',
    short: 'Tiles, fittings and floor scrubbed until the whole bathroom sparkles.',
    intro:
      'We clean every detail of the bathroom so you can relax and enjoy the shine — walls, floor, fittings and the corners that everyday cleaning misses.',
    includes: [
      'Wall and floor tile scrubbing',
      'Toilet, basin and sink cleaning',
      'Taps, shower and fittings wiped and shined',
      'Mirror and glass cleaning',
      'Corners, edges and drains',
      'Eco-friendly cleaning products',
    ],
    goodFor: ['Stains and build-up on tiles', 'Bathrooms that have not been deep cleaned in a while', 'Before guests arrive', 'Moving into a new flat'],
    faqs: [
      {
        q: 'What is included in bathroom deep cleaning?',
        a: 'Tiles, floor, toilet, basin, taps, shower fittings, mirror and corners. The exact scope is confirmed in your quote, so you know what is covered before we start.',
      },
      {
        q: 'Can you clean more than one bathroom in a visit?',
        a: 'Yes. Tell us how many bathrooms you have when you ask for a quote and we will price them together.',
      },
    ],
  },
  {
    slug: 'kitchen-deep-cleaning',
    chip: 'Kitchen',
    tint: '#ffe7a8',
    name: 'Kitchen Deep Cleaning',
    short: 'Deep, hygienic cleaning of the stove, chimney, sink, cabinets and tiles.',
    intro:
      'A clean kitchen keeps your family healthy. We deep clean the places where grease and food residue collect, and leave the kitchen fresh and hygienic.',
    includes: [
      'Countertops and surfaces',
      'Stove and chimney cleaning',
      'Sink and faucet cleaning',
      'Cabinets and drawers',
      'Tile and floor cleaning',
      'Odour removal',
    ],
    goodFor: ['Grease on the stove, chimney and tiles', 'Sticky cabinets and drawers', 'Kitchen smells that do not go away', 'Before festivals and family functions'],
    faqs: [
      {
        q: 'What is included in kitchen deep cleaning?',
        a: 'Countertops and surfaces, stove and chimney, sink and faucet, cabinets and drawers, tiles and floor, and odour removal.',
      },
      {
        q: 'Do you clean the chimney too?',
        a: 'Yes, stove and chimney cleaning is part of our kitchen deep cleaning.',
      },
    ],
  },
  {
    slug: 'sofa-cleaning',
    chip: 'Sofa',
    tint: '#cfe6fb',
    name: 'Sofa Cleaning',
    short: 'Dust, dirt and stains lifted from your sofa so it looks and feels fresh.',
    intro:
      'Sofas hold dust and dirt that a quick wipe does not reach. We clean your sofa so it looks fresh again and is pleasant to sit on.',
    includes: ['Dust and dirt removal from the fabric', 'Cleaning of seats, backrest and armrests', 'Attention to visible stains and marks', 'Cushions cleaned', 'A fresh finish'],
    goodFor: ['Sofas used every day', 'Homes with children or pets', 'Before guests or a function', 'Sofas that look dull or dusty'],
    faqs: [
      {
        q: 'How is sofa cleaning priced?',
        a: 'The price depends on the size of the sofa and how much cleaning it needs. Send a photo on WhatsApp and we will give you a quote.',
      },
      {
        q: 'Can you clean the sofa together with the rest of the home?',
        a: 'Yes. Sofa cleaning can be booked on its own or added to a home or complete deep cleaning.',
      },
    ],
  },
  {
    slug: 'floor-cleaning',
    chip: 'Floor',
    tint: '#ffd9c9',
    name: 'Floor Cleaning',
    short: 'Floors and tiles cleaned of dirt, marks and dullness across the home.',
    intro:
      'Floors take the most wear in any home. We clean floors and tiles thoroughly, including edges and corners, so every room feels cleaner.',
    includes: ['Floor cleaning in all rooms', 'Tile cleaning', 'Edges, corners and under furniture where reachable', 'Removal of marks and dirt build-up', 'A clean, fresh finish'],
    goodFor: ['Floors that look dull', 'After renovation or painting work', 'Large halls and offices', 'Before moving in'],
    faqs: [
      {
        q: 'Which areas does floor cleaning cover?',
        a: 'Any rooms you choose — the whole home, or only the areas that need it. Tell us the rooms and we will quote for them.',
      },
    ],
  },
  {
    slug: 'dust-dirt-removal',
    chip: 'Dust removal',
    tint: '#fbd3e3',
    name: 'Dust & Dirt Removal',
    short: 'Dusting and wiping of surfaces, furniture, corners and hard-to-reach spots.',
    intro:
      'Dust settles everywhere — shelves, furniture, fans, window frames, corners. We remove dust and dirt from the whole home so it feels clean and is easier to keep clean.',
    includes: ['Dusting and wiping of surfaces', 'Furniture and shelves', 'Window frames and glass', 'Corners and hard-to-reach spots', 'Floor cleaning to finish'],
    goodFor: ['Homes closed for some time', 'After repair or renovation work', 'Dust-sensitive family members', 'Regular upkeep'],
    faqs: [
      {
        q: 'Is dust removal different from deep cleaning?',
        a: 'Yes. Dust and dirt removal focuses on dusting and wiping the home. Complete deep cleaning also includes deep cleaning of the kitchen, bathrooms, sofa and floors.',
      },
    ],
  },
  {
    slug: 'complete-deep-cleaning',
    chip: 'Full deep clean',
    tint: '#c9f0ee',
    name: 'Complete Deep Cleaning',
    short: 'Every room, bathroom, the kitchen, sofa and floors — the whole home, deep cleaned.',
    intro:
      'Our most thorough service. Every room, the kitchen, the bathrooms, the sofa and the floors are deep cleaned in one booking, so the whole home feels new.',
    includes: [
      'All rooms: dusting, wiping and floors',
      'Kitchen deep cleaning',
      'Bathroom deep cleaning',
      'Sofa and furniture cleaning',
      'Window and glass cleaning',
      'Every corner covered',
    ],
    goodFor: ['Moving into a new home', 'Moving out of a rented flat', 'Before Diwali, weddings and functions', 'A once-in-a-while reset of the whole home'],
    faqs: [
      {
        q: 'What does complete deep cleaning include?',
        a: 'All rooms, the kitchen, the bathrooms, sofa and furniture, floors, windows and glass. It is the full service for the whole home.',
      },
      {
        q: 'How long does a complete deep cleaning take?',
        a: 'It depends on the size and condition of the home. We tell you the expected time with your quote.',
      },
    ],
  },
]

export function getService(slug: string | undefined): Service | undefined {
  return SERVICES.find((s) => s.slug === slug)
}

export function servicePath(s: Service): string {
  return `/services/${s.slug}`
}

/** Questions every service page shares, after its own. */
export const COMMON_FAQS: Faq[] = [
  {
    q: 'What are the charges?',
    a: 'Charges depend on the work — the size of the place, its condition and which services you need. Send us the details or a few photos on WhatsApp and we will tell you there. Asking is free.',
  },
  {
    q: 'How do I book?',
    a: `Call or WhatsApp ${SITE.phone}. Tell us the service, your location and a day that suits you, and we will confirm the booking.`,
  },
]

export const HOME_FAQS: Faq[] = [
  {
    q: "What cleaning services does Martin's Home Service offer?",
    a: 'Home, flat and office cleaning, bathroom deep cleaning, kitchen deep cleaning, sofa cleaning, floor cleaning, dust and dirt removal, and complete deep cleaning.',
  },
  ...COMMON_FAQS,
  {
    q: 'Which areas do you serve?',
    a: `Message us your location on WhatsApp and we will confirm right away whether we can come to you${IN_CITY}.`,
  },
  {
    q: 'Can I choose the day and time?',
    a: 'Yes. Our timing is flexible. Tell us the day and time you prefer and we will do our best to fit it.',
  },
  {
    q: 'Do you clean offices?',
    a: 'Yes. We clean offices as well as homes and flats.',
  },
]
