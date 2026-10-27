import { rupees } from './prices'
import type { Faq } from './services'
import { SITE } from './site'
import type { LocalBlock } from './local'

/** Salon at home for ladies — a lady beautician comes to the customer's home.
 *  Bookings go to the beautician's own number, not the cleaning line.
 *  Prices are the owner's list (21 Oct 2026) and are negotiable. */
export const BEAUTY = {
  name: 'Salon at Home for Ladies',
  /** 10-digit number for calls and WhatsApp. */
  phone: '9370680151',
}

export const BEAUTY_PATH = '/salon-at-home-pune'

export const BEAUTY_PHONE_DISPLAY = `${BEAUTY.phone.slice(0, 5)} ${BEAUTY.phone.slice(5)}`
export const BEAUTY_PHONE_E164 = `+${SITE.countryCode}${BEAUTY.phone}`
export const BEAUTY_TEL_LINK = `tel:${BEAUTY_PHONE_E164}`

export function beautyWaLink(message: string): string {
  return `https://wa.me/${SITE.countryCode}${BEAUTY.phone}?text=${encodeURIComponent(message)}`
}

export const BEAUTY_WA_DEFAULT = beautyWaLink('Hi, I would like to book a salon-at-home appointment in Pune. Please share available slots.')

export type BeautyItem = {
  id: string
  name: string
  /** What is covered, or what the treatment is for. */
  detail: string
  price: number
}

export type BeautyCategory = {
  id: string
  title: string
  /** Short label for the jump chips. */
  chip: string
  blurb: string
  items: BeautyItem[]
}

const FULL = 'Full arms + underarms + full legs'

export const BEAUTY_MENU: BeautyCategory[] = [
  {
    id: 'waxing',
    title: 'Waxing at home',
    chip: 'Waxing',
    blurb: 'Full arms, underarms and full legs in one sitting, or bikini wax — in the privacy of your own home.',
    items: [
      { id: 'honey-wax', name: 'Honey wax', detail: FULL, price: 700 },
      { id: 'roll-on-wax', name: 'Roll-on wax', detail: FULL, price: 1000 },
      { id: 'rica-white-chocolate', name: 'Rica white chocolate wax', detail: FULL, price: 1000 },
      { id: 'honey-wax-bikini', name: 'Honey wax — bikini', detail: 'Bikini area', price: 1000 },
      { id: 'bikini-peel-off', name: 'Bikini wax — peel-off', detail: 'Bikini area, peel-off wax', price: 1200 },
    ],
  },
  {
    id: 'facials',
    title: 'Facials at home',
    chip: 'Facials',
    blurb: 'Branded facials from O3, Sara and more, for glow, hydration, tan or firming.',
    items: [
      { id: 'sara-orange', name: 'Sara Orange Monodose facial', detail: 'Fresh, vitamin-C style glow for dull skin', price: 800 },
      { id: 'kumkumadi', name: 'Kumkumadi hydration facial', detail: 'Ayurvedic saffron facial for hydration', price: 1000 },
      { id: 'elysian-vinglo', name: 'Elysian Vinglo firming facial', detail: 'Firming facial for tired, loose-looking skin', price: 1000 },
      { id: 'sara-glow-light', name: 'Sara Glow Light facial', detail: 'Light, brightening glow facial', price: 1000 },
      { id: 'anti-tan', name: 'Anti-tan facial', detail: 'Takes off sun tan and evens the skin tone', price: 1000 },
      { id: 'o3-shine-glow', name: 'O3 Shine & Glow facial', detail: 'O3+ facial for an instant party-ready shine', price: 1400 },
      { id: 'korean-glow', name: 'Korean glow facial', detail: 'Glass-skin glow, Korean-style', price: 1400 },
      { id: 'o3-power-brightening', name: 'O3 Power Brightening facial', detail: 'Our most premium brightening facial', price: 1500 },
    ],
  },
  {
    id: 'clean-up',
    title: 'Clean-up',
    chip: 'Clean-up',
    blurb: 'A quick freshen-up between facials.',
    items: [{ id: 'power-glow-clean-up', name: 'Power Glow clean-up', detail: 'Cleanse, scrub and glow — quick and fresh', price: 500 }],
  },
  {
    id: 'mani-pedi',
    title: 'Manicure & pedicure',
    chip: 'Mani-Pedi',
    blurb: 'Soft hands and feet, without stepping out.',
    items: [
      { id: 'manicure', name: 'Manicure', detail: 'Hands and nails cleaned, shaped and cared for', price: 600 },
      { id: 'pedicure', name: 'Pedicure', detail: 'Feet soaked, scrubbed and nails done', price: 700 },
    ],
  },
]

export const BEAUTY_ITEMS = BEAUTY_MENU.flatMap((c) => c.items)
export const BEAUTY_MIN = Math.min(...BEAUTY_ITEMS.map((i) => i.price))
export const BEAUTY_MAX = Math.max(...BEAUTY_ITEMS.map((i) => i.price))

function item(id: string): BeautyItem {
  const found = BEAUTY_ITEMS.find((i) => i.id === id)
  if (!found) throw new Error(`No beauty item ${id}`)
  return found
}

function cheapest(categoryId: string): number {
  const c = BEAUTY_MENU.find((x) => x.id === categoryId)
  return Math.min(...(c?.items.map((i) => i.price) ?? [0]))
}

/** "from ₹700" for each category — for teaser tiles. */
export const BEAUTY_FROM = Object.fromEntries(BEAUTY_MENU.map((c) => [c.id, cheapest(c.id)])) as Record<string, number>

export const BEAUTY_NOTE = 'Prices are negotiable. The final price is confirmed on WhatsApp or call before the appointment.'

/** The whole price list in one sentence — for search snippets and AI answers. */
export const BEAUTY_SUMMARY = BEAUTY_MENU.map((c) => `${c.title.replace(' at home', '')}: ${c.items.map((i) => `${i.name} ${rupees(i.price)}`).join(', ')}`).join('. ')

const FACIALS = BEAUTY_MENU.find((c) => c.id === 'facials')?.items ?? []

const WHERE = `${SITE.base} and about ${SITE.radiusKm} km around, ${SITE.city}`

export const BEAUTY_FAQS: Faq[] = [
  {
    q: `How much does a salon at home cost in ${SITE.city}?`,
    a: `${SITE.name}'s salon at home for ladies costs ${rupees(BEAUTY_MIN)} to ${rupees(BEAUTY_MAX)} per service. ${BEAUTY_SUMMARY}. ${BEAUTY_NOTE}`,
  },
  {
    q: `What is the price of waxing at home in ${SITE.city}?`,
    a: `Full arms, underarms and full legs: honey wax ${rupees(item('honey-wax').price)}, roll-on wax ${rupees(item('roll-on-wax').price)}, Rica white chocolate wax ${rupees(item('rica-white-chocolate').price)}. Bikini wax: honey ${rupees(item('honey-wax-bikini').price)}, peel-off ${rupees(item('bikini-peel-off').price)}. ${BEAUTY_NOTE}`,
  },
  {
    q: `What is the price of a facial at home in ${SITE.city}?`,
    a: `Facials at home cost ${rupees(cheapest('facials'))} to ${rupees(Math.max(...FACIALS.map((i) => i.price)))}: ${FACIALS.map((i) => `${i.name} ${rupees(i.price)}`).join(', ')}. A Power Glow clean-up is ${rupees(item('power-glow-clean-up').price)}.`,
  },
  {
    q: 'What is the O3 facial price at home?',
    a: `O3 Shine & Glow facial ${rupees(item('o3-shine-glow').price)} and O3 Power Brightening facial ${rupees(item('o3-power-brightening').price)}, done at your home in ${WHERE}. ${BEAUTY_NOTE}`,
  },
  {
    q: 'What is the Korean glow facial price?',
    a: `The Korean glow facial is ${rupees(item('korean-glow').price)} at your home in ${WHERE}. ${BEAUTY_NOTE}`,
  },
  {
    q: 'What is the price of pedicure and manicure at home?',
    a: `Pedicure ${rupees(item('pedicure').price)} and manicure ${rupees(item('manicure').price)}, at your home.`,
  },
  {
    q: 'Is the salon at home service only for women?',
    a: 'Yes. It is a women-only service, done by a lady beautician at your home.',
  },
  {
    q: 'Which areas of Pune do you come to?',
    a: `The beautician comes to homes in ${WHERE} — including Koregaon Park, Kalyani Nagar, Viman Nagar, Yerawada, Kharadi, Wadgaon Sheri, Camp and nearby. Send your area on WhatsApp to confirm.`,
  },
  {
    q: 'How do I book a parlour service at home?',
    a: `WhatsApp or call ${BEAUTY.phone}. Tell us the services you want, your area and a date and time that suits you. We confirm the slot and the final price on WhatsApp.`,
  },
]

/** The same questions as people type them in Hinglish, Hindi and Marathi. */
export const BEAUTY_LOCAL_FAQS: LocalBlock[] = [
  {
    lang: 'hi-Latn',
    label: 'Hinglish',
    faqs: [
      {
        q: `Ghar par parlour service ${SITE.city} — rate kya hai?`,
        a: `Ghar par parlour (ladies ke liye): honey wax full hand, underarms, full legs ${rupees(item('honey-wax').price)}, Rica wax ${rupees(item('rica-white-chocolate').price)}, facial ${rupees(cheapest('facials'))} se ${rupees(BEAUTY_MAX)}, clean-up ${rupees(item('power-glow-clean-up').price)}, pedicure ${rupees(item('pedicure').price)}, manicure ${rupees(item('manicure').price)}. Rate negotiable hain.`,
      },
      {
        q: 'Ghar par waxing aur facial ke liye kisko call karein?',
        a: `${BEAUTY.phone} par WhatsApp ya call karein. Lady beautician aapke ghar aati hai — sirf ladies ke liye.`,
      },
    ],
  },
  {
    lang: 'hi',
    label: 'हिंदी',
    faqs: [
      {
        q: 'पुणे में घर पर पार्लर सर्विस का रेट कितना है?',
        a: `घर पर पार्लर (सिर्फ महिलाओं के लिए): हनी वैक्स फुल हाथ, अंडरआर्म्स, फुल पैर ${rupees(item('honey-wax').price)}, रिका वैक्स ${rupees(item('rica-white-chocolate').price)}, फेशियल ${rupees(cheapest('facials'))} से ${rupees(BEAUTY_MAX)}, क्लीन-अप ${rupees(item('power-glow-clean-up').price)}, पेडिक्योर ${rupees(item('pedicure').price)}, मैनिक्योर ${rupees(item('manicure').price)}। रेट नेगोशिएबल हैं।`,
      },
      {
        q: 'घर पर वैक्सिंग और फेशियल कैसे बुक करें?',
        a: `${BEAUTY.phone} पर WhatsApp या कॉल करें। लेडी ब्यूटीशियन आपके घर आती हैं।`,
      },
    ],
  },
  {
    lang: 'mr',
    label: 'मराठी',
    faqs: [
      {
        q: 'पुण्यात घरी पार्लर सेवेचा दर किती आहे?',
        a: `घरी पार्लर (फक्त महिलांसाठी): हनी वॅक्स फुल हात, अंडरआर्म्स, फुल पाय ${rupees(item('honey-wax').price)}, रिका वॅक्स ${rupees(item('rica-white-chocolate').price)}, फेशियल ${rupees(cheapest('facials'))} ते ${rupees(BEAUTY_MAX)}, क्लीन-अप ${rupees(item('power-glow-clean-up').price)}, पेडिक्युअर ${rupees(item('pedicure').price)}, मॅनिक्युअर ${rupees(item('manicure').price)}. दर कमी-जास्त होऊ शकतात.`,
      },
      {
        q: 'घरी वॅक्सिंग आणि फेशियल कसे बुक करायचे?',
        a: `${BEAUTY.phone} वर WhatsApp किंवा कॉल करा. लेडी ब्युटीशियन तुमच्या घरी येतात.`,
      },
    ],
  },
]
