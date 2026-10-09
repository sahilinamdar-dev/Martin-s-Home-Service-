import type { Faq } from './services'
import { REACH_US, SITE } from './site'

export type Kind = 'Empty flat' | 'Furnished'

export type Price = {
  id: string
  /** Size of the home, e.g. '2 BHK'. */
  home: string
  kind: Kind
  /** Rupees. `max` only when the owner gave a range. */
  min: number
  max?: number
  /** True when the owner said "starting from". */
  from?: boolean
}

/** Deep cleaning charges, as the owner set them: every size of home has an
 *  empty-flat price and a furnished price. They are starting points — every
 *  price is negotiable and the final one is told on call. */
export const PRICES: Price[] = [
  { id: '1rk-empty', home: '1 RK', kind: 'Empty flat', min: 1500 },
  { id: '1rk-furnished', home: '1 RK', kind: 'Furnished', min: 1700 },
  { id: '1bhk-empty', home: '1 BHK', kind: 'Empty flat', min: 2000 },
  { id: '1bhk-furnished', home: '1 BHK', kind: 'Furnished', min: 2500, from: true },
  { id: '2bhk-empty', home: '2 BHK', kind: 'Empty flat', min: 2500 },
  { id: '2bhk-furnished', home: '2 BHK', kind: 'Furnished', min: 3499, from: true },
  { id: '3bhk-empty', home: '3 BHK', kind: 'Empty flat', min: 4000 },
  { id: '3bhk-furnished', home: '3 BHK', kind: 'Furnished', min: 6000, max: 7000 },
]

/** The sizes of home, in the order they are shown. */
export const HOMES = [...new Set(PRICES.map((p) => p.home))]

export function priceOf(home: string, kind: Kind): Price {
  const price = PRICES.find((p) => p.home === home && p.kind === kind)
  if (!price) throw new Error(`No ${kind} price for ${home}`)
  return price
}

export const PRICE_PATH = '/price-list'

export function rupees(n: number): string {
  return `₹${n.toLocaleString('en-IN')}`
}

/** '₹1,700', '₹2,500 – ₹3,000' or 'from ₹3,499'. */
export function priceLabel(p: Price): string {
  if (p.max) return `${rupees(p.min)} – ${rupees(p.max)}`
  return p.from ? `from ${rupees(p.min)}` : rupees(p.min)
}

/** '2 BHK furnished' — the row as a phrase. */
export function priceName(p: Price): string {
  return `${p.home} ${p.kind.toLowerCase()}`
}

export const PRICE_MIN = Math.min(...PRICES.map((p) => p.min))
export const PRICE_MAX = Math.max(...PRICES.map((p) => p.max ?? p.min))

/** "1 RK empty flat ₹1,500, furnished ₹1,700; 1 BHK …" */
export const PRICE_SUMMARY = HOMES.map((home) => `${home} empty flat ${priceLabel(priceOf(home, 'Empty flat'))}, furnished ${priceLabel(priceOf(home, 'Furnished'))}`).join('; ')

export const PRICE_NOTE = 'Prices are negotiable. The final charge depends on the size and condition of the home and is confirmed on call or WhatsApp before you book.'

/** The same price list in the languages customers here search and ask in. */
export type LocalPrices = {
  /** BCP 47 code for the lang attribute. */
  lang: string
  label: string
  heading: string
  intro: string
  rows: { name: string; price: string }[]
  note: string
  faqs: Faq[]
}

type Words = { empty: string; furnished: string; from: (price: string) => string }

function localRows(w: Words): { name: string; price: string }[] {
  const kinds: Record<Kind, string> = { 'Empty flat': w.empty, Furnished: w.furnished }
  return PRICES.map((p) => {
    const amount = p.max ? `${rupees(p.min)} – ${rupees(p.max)}` : rupees(p.min)
    return { name: `${p.home} ${kinds[p.kind]}`, price: p.from ? w.from(amount) : amount }
  })
}

function localSummary(rows: { name: string; price: string }[]): string {
  return rows.map((r) => `${r.name} ${r.price}`).join('; ')
}

const HINGLISH_ROWS = localRows({ empty: 'khali flat', furnished: 'furnished', from: (p) => `${p} se shuru` })
const HINDI_ROWS = localRows({ empty: 'खाली फ्लैट', furnished: 'फर्निश्ड', from: (p) => `${p} से शुरू` })
const MARATHI_ROWS = localRows({ empty: 'रिकामा फ्लॅट', furnished: 'फर्निश्ड', from: (p) => `${p} पासून` })

const HINGLISH_NOTE = 'Sabhi rate negotiable hain. Final rate ghar ke size aur condition par depend karta hai aur booking se pehle call ya WhatsApp par bataya jata hai.'
const HINDI_NOTE = 'सभी रेट नेगोशिएबल हैं। फाइनल रेट घर के साइज़ और हालत पर निर्भर है और बुकिंग से पहले कॉल या WhatsApp पर बताया जाता है।'
const MARATHI_NOTE = 'सर्व दर कमी-जास्त होऊ शकतात. अंतिम दर घराच्या आकारावर आणि स्थितीवर अवलंबून असतो आणि बुकिंगपूर्वी कॉल किंवा WhatsApp वर सांगितला जातो.'

export const LOCAL_PRICES: LocalPrices[] = [
  {
    lang: 'hi-Latn',
    label: 'Hinglish',
    heading: `Ghar ki safai service ${SITE.city} — rate list`,
    intro: `${SITE.name} ${SITE.base}, ${SITE.city} aur aas-paas ${SITE.radiusKm} km mein ghar ki safai aur deep cleaning service deti hai — ghar, flat aur office.`,
    rows: HINGLISH_ROWS,
    note: HINGLISH_NOTE,
    faqs: [
      { q: `${SITE.city} mein ghar ki safai aur deep cleaning ka kharcha kitna hai?`, a: `${SITE.name} ke ghar ki safai (deep cleaning) ke rate: ${localSummary(HINGLISH_ROWS)}. ${HINGLISH_NOTE}` },
      { q: 'Kya rate fix hain?', a: `Nahi, sabhi rate negotiable hain. ${SITE.phone} par call karein ya ${SITE.whatsapp} par WhatsApp karein, ghar ka size batayein aur kuch photo bhejein — hum booking se pehle final rate bata dete hain.` },
    ],
  },
  {
    lang: 'hi',
    label: 'हिंदी',
    heading: 'पुणे में घर की सफाई सर्विस — रेट लिस्ट',
    intro: `${SITE.name} कोरेगांव पार्क, पुणे और आसपास ${SITE.radiusKm} किमी में घर की सफाई और डीप क्लीनिंग सर्विस देती है — घर, फ्लैट और ऑफिस।`,
    rows: HINDI_ROWS,
    note: HINDI_NOTE,
    faqs: [
      { q: 'पुणे में घर की सफाई और डीप क्लीनिंग का खर्च कितना है?', a: `${SITE.name} के घर की सफाई (डीप क्लीनिंग) के रेट: ${localSummary(HINDI_ROWS)}। ${HINDI_NOTE}` },
      { q: 'क्या रेट फिक्स हैं?', a: `नहीं, सभी रेट नेगोशिएबल हैं। ${SITE.phone} पर कॉल करें या ${SITE.whatsapp} पर WhatsApp करें, घर का साइज़ बताएं और कुछ फोटो भेजें — हम बुकिंग से पहले फाइनल रेट बता देते हैं।` },
    ],
  },
  {
    lang: 'mr',
    label: 'मराठी',
    heading: 'पुण्यात घर साफसफाई सेवा — किंमत यादी',
    intro: `${SITE.name} कोरेगाव पार्क, पुणे आणि आसपासच्या ${SITE.radiusKm} किमी परिसरात घर, फ्लॅट आणि ऑफिससाठी साफसफाई व स्वच्छता सेवा (डीप क्लीनिंग) देते.`,
    rows: MARATHI_ROWS,
    note: MARATHI_NOTE,
    faqs: [
      { q: 'पुण्यात घर साफसफाई सेवेची किंमत किती आहे?', a: `${SITE.name} च्या घर स्वच्छता सेवेची (डीप क्लीनिंग) किंमत यादी: ${localSummary(MARATHI_ROWS)}. ${MARATHI_NOTE}` },
      { q: 'दर फिक्स आहेत का?', a: `नाही, सर्व दर कमी-जास्त होऊ शकतात. ${SITE.phone} वर कॉल करा किंवा ${SITE.whatsapp} वर WhatsApp करा, घराचा साइज सांगा आणि काही फोटो पाठवा — बुकिंगपूर्वी आम्ही अंतिम दर सांगतो.` },
    ],
  },
]

function answerFor(home: string): string {
  const rows = PRICES.filter((p) => p.home === home)
  return rows.map((p) => `${priceName(p)}: ${priceLabel(p)}`).join('. ')
}

export const PRICE_FAQS: Faq[] = [
  {
    q: `How much does home deep cleaning cost in ${SITE.city}?`,
    a: `At ${SITE.name}, deep cleaning charges are: ${PRICE_SUMMARY}. ${PRICE_NOTE}`,
  },
  {
    q: `What is the charge for 1 BHK deep cleaning in ${SITE.city}?`,
    a: `${answerFor('1 BHK')}. ${answerFor('1 RK')}. ${PRICE_NOTE}`,
  },
  {
    q: `What is the charge for 2 BHK deep cleaning in ${SITE.city}?`,
    a: `${answerFor('2 BHK')}. ${PRICE_NOTE}`,
  },
  {
    q: `What is the charge for 3 BHK deep cleaning in ${SITE.city}?`,
    a: `${answerFor('3 BHK')}. ${PRICE_NOTE}`,
  },
  {
    q: 'How much does it cost to clean an empty flat before moving in?',
    a: `Empty flat deep cleaning: ${HOMES.map((home) => `${home} ${priceLabel(priceOf(home, 'Empty flat'))}`).join(', ')}. ${PRICE_NOTE}`,
  },
  {
    q: 'Are the prices fixed?',
    a: `No. All prices are negotiable. ${REACH_US}, tell us the size of your home and send a few photos, and we tell you the final price before you book.`,
  },
]
