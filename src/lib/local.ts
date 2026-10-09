import { FESTIVAL, OFFER_ENDS_LABEL } from './festival'
import { LOCAL_PRICES } from './prices'
import type { Faq } from './services'
import { SITE } from './site'

/** Questions in the words people here type into Google — Hindi in English
 *  letters ("safai wala near me"), Hindi and Marathi. Each block is shown with
 *  its own lang attribute. Answers repeat facts from site.ts, prices.ts and
 *  festival.ts only. */
export type LocalBlock = { lang: string; label: string; faqs: Faq[] }

function priceLine(lang: string): string {
  const l = LOCAL_PRICES.find((p) => p.lang === lang)
  return l ? l.rows.map((r) => `${r.name} ${r.price}`).join('; ') : ''
}

/** Biggest discount on offer, read from the badges ('20% OFF' → 20). */
const MAX_OFF = Math.max(...FESTIVAL.offers.map((o) => parseInt(o.badge, 10)))

const HOURS = '9 am – 8:30 pm'

export const LOCAL_FAQS: LocalBlock[] = [
  {
    lang: 'hi-Latn',
    label: 'Hinglish',
    faqs: [
      {
        q: 'Deep cleaning kya hota hai? Deep cleaning mein kya kya hota hai?',
        a: 'Deep cleaning mein poore ghar ki gehri safai hoti hai: har room ki dusting aur wiping, floor, furniture, khidki aur glass, kitchen (stove, chimney, sink, cabinet, tiles), bathroom (tiles, toilet, basin, nal, mirror) aur sofa ki safai.',
      },
      {
        q: 'Safai wala near me — kya aap mere area mein ghar ki safai karte hain?',
        a: `Haan. ${SITE.name} ${SITE.base}, ${SITE.city} mein hai aur ${SITE.radiusKm} km ke andar ghar ki safai service deti hai — Kalyani Nagar, Viman Nagar, Yerawada, Kharadi, Wadgaon Sheri, Vishrantwadi, Dhanori, Hadapsar aur aas-paas. Apna area WhatsApp par bhejein, hum turant bata dete hain.`,
      },
      {
        q: 'Ghar ki safai karne wale ka number kya hai?',
        a: `Call karein ${SITE.phone} par ya WhatsApp karein ${SITE.whatsapp} par. Har din, ${HOURS}.`,
      },
      {
        q: 'Ghar ki safai karne wale kitna charge lete hain?',
        a: `${SITE.name} ka rate: ${priceLine('hi-Latn')}. Sabhi rate negotiable hain, final rate call par bataya jata hai.`,
      },
    ],
  },
  {
    lang: 'hi',
    label: 'हिंदी',
    faqs: [
      {
        q: 'डीप क्लीनिंग क्या होता है?',
        a: 'डीप क्लीनिंग में पूरे घर की गहरी सफाई होती है: हर कमरे की डस्टिंग और वाइपिंग, फर्श, फर्नीचर, खिड़की और ग्लास, किचन (स्टोव, चिमनी, सिंक, कैबिनेट, टाइल्स), बाथरूम (टाइल्स, टॉयलेट, बेसिन, नल, शीशा) और सोफे की सफाई।',
      },
      {
        q: 'पुणे में घर की सफाई करने वाले का नंबर क्या है?',
        a: `${SITE.name} — कॉल करें ${SITE.phone} पर या WhatsApp करें ${SITE.whatsapp} पर। हर दिन, ${HOURS}। हम कोरेगांव पार्क, पुणे और आसपास ${SITE.radiusKm} किमी में घर की सफाई सर्विस देते हैं।`,
      },
      {
        q: 'घर की सफाई करने वाले कितना चार्ज लेते हैं?',
        a: `${SITE.name} के रेट: ${priceLine('hi')}। सभी रेट नेगोशिएबल हैं, फाइनल रेट कॉल पर बताया जाता है।`,
      },
    ],
  },
  {
    lang: 'mr',
    label: 'मराठी',
    faqs: [
      {
        q: 'पुण्यात घर साफसफाई सेवा कोण देते?',
        a: `${SITE.name} कोरेगाव पार्क, पुणे येथून घर, फ्लॅट आणि ऑफिससाठी साफसफाई व स्वच्छता सेवा देते — बाथरूम, किचन, सोफा, फरशी आणि संपूर्ण घराची डीप क्लीनिंग. कॉल करा ${SITE.phone} किंवा WhatsApp करा ${SITE.whatsapp}. दररोज, ${HOURS}.`,
      },
      {
        q: 'माझ्या जवळ घर साफसफाईची सेवा मिळेल का?',
        a: `हो. आम्ही कोरेगाव पार्कपासून ${SITE.radiusKm} किमी परिसरात सेवा देतो — कल्याणी नगर, विमान नगर, येरवडा, खराडी, वडगाव शेरी, विश्रांतवाडी, धानोरी, हडपसर आणि आसपास. तुमचा परिसर WhatsApp वर पाठवा, आम्ही लगेच सांगतो.`,
      },
      {
        q: 'घर स्वच्छता सेवेची किंमत यादी काय आहे?',
        a: `${SITE.name} चे दर: ${priceLine('mr')}. सर्व दर कमी-जास्त होऊ शकतात, अंतिम दर कॉलवर सांगितला जातो.`,
      },
      {
        q: 'डीप क्लीनिंगमध्ये काय काय केले जाते?',
        a: 'डीप क्लीनिंगमध्ये संपूर्ण घराची सखोल साफसफाई होते: प्रत्येक खोलीची धूळ साफ करणे आणि पुसणे, फरशी, फर्निचर, खिडक्या आणि काच, किचन (गॅस शेगडी, चिमणी, सिंक, कपाटे, टाइल्स), बाथरूम (टाइल्स, टॉयलेट, बेसिन, नळ, आरसा) आणि सोफा साफसफाई.',
      },
    ],
  },
]

/** The festival campaign in the same three languages. Empty outside the season. */
export const LOCAL_FESTIVAL_FAQS: LocalBlock[] = FESTIVAL.enabled
  ? [
      {
        lang: 'hi-Latn',
        label: 'Hinglish',
        faqs: [
          {
            q: `${SITE.city} mein Diwali ki safai service kaun deta hai?`,
            a: `${SITE.name} Diwali aur Dussehra se pehle poore ghar ki safai aur deep cleaning karti hai — ${SITE.base}, ${SITE.city} aur aas-paas ${SITE.radiusKm} km mein. ${OFFER_ENDS_LABEL} tak ki booking par ${MAX_OFF}% tak ki chhoot. Call ${SITE.phone} ya WhatsApp ${SITE.whatsapp}.`,
          },
          {
            q: 'Diwali ki safai kab book karni chahiye?',
            a: 'Diwali se do-teen hafte pehle book karein, taaki aapko apni pasand ka din aur time mile. Diwali se pehle ka aakhri hafta sabse zyada busy hota hai.',
          },
        ],
      },
      {
        lang: 'hi',
        label: 'हिंदी',
        faqs: [
          {
            q: 'पुणे में दिवाली की सफाई सर्विस कौन देता है?',
            a: `${SITE.name} दिवाली और दशहरे से पहले पूरे घर की सफाई और डीप क्लीनिंग करती है — कोरेगांव पार्क, पुणे और आसपास ${SITE.radiusKm} किमी में। ${OFFER_ENDS_LABEL} तक की बुकिंग पर ${MAX_OFF}% तक की छूट। कॉल ${SITE.phone} या WhatsApp ${SITE.whatsapp}।`,
          },
          {
            q: 'दिवाली की सफाई कब बुक करनी चाहिए?',
            a: 'दिवाली से दो-तीन हफ्ते पहले बुक करें, ताकि आपको अपनी पसंद का दिन और समय मिले। दिवाली से पहले का आखिरी हफ्ता सबसे ज़्यादा व्यस्त रहता है।',
          },
        ],
      },
      {
        lang: 'mr',
        label: 'मराठी',
        faqs: [
          {
            q: 'पुण्यात दिवाळी साफसफाई सेवा कोण देते?',
            a: `${SITE.name} दिवाळी आणि दसऱ्यापूर्वी संपूर्ण घराची साफसफाई आणि डीप क्लीनिंग करते — कोरेगाव पार्क, पुणे आणि आसपासच्या ${SITE.radiusKm} किमी परिसरात. ${OFFER_ENDS_LABEL} पर्यंतच्या बुकिंगवर ${MAX_OFF}% पर्यंत सूट. कॉल ${SITE.phone} किंवा WhatsApp ${SITE.whatsapp}.`,
          },
          {
            q: 'दिवाळी साफसफाई कधी बुक करावी?',
            a: 'दिवाळीच्या दोन-तीन आठवडे आधी बुक करा, म्हणजे तुम्हाला हवा तो दिवस आणि वेळ मिळेल. दिवाळीपूर्वीचा शेवटचा आठवडा सर्वात गर्दीचा असतो.',
          },
        ],
      },
    ]
  : []

export function allFaqs(blocks: LocalBlock[]): Faq[] {
  return blocks.flatMap((b) => b.faqs)
}
