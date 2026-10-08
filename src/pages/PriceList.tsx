import { Link } from 'react-router-dom'
import { Phone } from 'lucide-react'
import { FaqList } from '../components/FaqList'
import { FestivalOffers } from '../components/Festival'
import { PriceTable } from '../components/PriceTable'
import { QuoteForm } from '../components/QuoteForm'
import { Seo } from '../components/Seo'
import { WhatsAppIcon } from '../components/WhatsAppIcon'
import { LOCAL_PRICES, PRICE_FAQS, PRICE_MAX, PRICE_MIN, PRICE_PATH, PRICE_SUMMARY, rupees } from '../lib/prices'
import { breadcrumbSchema, faqSchema, priceSchema } from '../lib/schema'
import { SERVICES, servicePath } from '../lib/services'
import { PHONE_DISPLAY, SITE, TEL_LINK, waLink } from '../lib/site'

const WA_PRICE = waLink(`Hi ${SITE.name}, please tell me the price for cleaning my home.`)

export default function PriceList() {
  return (
    <>
      <Seo
        title={`Deep Cleaning Price List in ${SITE.city} — 1 RK, 1, 2 & 3 BHK Charges`}
        description={`Home deep cleaning charges in ${SITE.city}: ${rupees(PRICE_MIN)} to ${rupees(PRICE_MAX)} for an empty flat, 1 RK, 1 BHK, 2 BHK or 3 BHK. Negotiable — call ${SITE.phone} for your price.`}
        path={PRICE_PATH}
        jsonLd={[
          priceSchema(),
          faqSchema([...PRICE_FAQS, ...LOCAL_PRICES.flatMap((l) => l.faqs)]),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Price list', path: PRICE_PATH },
          ]),
        ]}
      />

      <section className="bg-gradient-to-b from-sky-50 to-cream">
        <div className="container-page max-w-3xl py-12 sm:py-16">
          <p className="eyebrow">Price list</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-navy-900 sm:text-5xl">
            Home deep cleaning charges in <em className="font-bold text-leaf-700">{SITE.city}</em>
          </h1>
          {/* The whole answer in one paragraph, for search snippets and AI assistants. */}
          <p className="mt-5 text-lg leading-relaxed text-navy-700">
            {SITE.name} charges for home deep cleaning in {SITE.base} and {SITE.radiusKm} km around {SITE.city}: {PRICE_SUMMARY}. All prices are negotiable, and we tell you the final price on call.
          </p>

          <div className="mt-8">
            <PriceTable />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={TEL_LINK} className="btn btn-wa">
              <Phone className="h-5 w-5" aria-hidden="true" />
              Call {PHONE_DISPLAY} for your price
            </a>
            <a href={WA_PRICE} target="_blank" rel="noopener" className="btn btn-outline">
              <WhatsAppIcon className="h-5 w-5" />
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section aria-label="Festival offers" className="container-page py-10 empty:hidden sm:py-14">
        <FestivalOffers showLink />
      </section>

      <section className="container-page max-w-3xl py-10 sm:py-14">
        <h2 className="h-section">Only one room or one service?</h2>
        <p className="mt-3 text-lg leading-relaxed text-navy-700">You can also book a single service. Tell us what you need on call or WhatsApp and we tell you the price for it.</p>
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {SERVICES.map((s) => (
            <li key={s.slug}>
              <Link to={servicePath(s)} className="inline-block rounded-full bg-leaf-100 px-4 py-2 font-semibold text-leaf-800 hover:bg-leaf-700 hover:text-white">
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* The same prices in Hinglish, Hindi and Marathi, each marked with its language. */}
      <section aria-label="Price list in Hindi and Marathi" className="container-page max-w-3xl space-y-12 pb-12 sm:pb-16">
        {LOCAL_PRICES.map((l) => (
          <div key={l.lang} lang={l.lang}>
            <p className="eyebrow">{l.label}</p>
            <h2 className="h-section mt-3">{l.heading}</h2>
            <p className="mt-3 text-lg leading-relaxed text-navy-700">{l.intro}</p>
            <ul className="mt-5 divide-y divide-navy-900/10 overflow-hidden rounded-2xl bg-white ring-1 ring-navy-900/10">
              {l.rows.map((r) => (
                <li key={r.name} className="flex items-center justify-between gap-4 px-5 py-3.5 sm:px-6">
                  <span className="font-bold text-navy-900">{r.name}</span>
                  <span className="whitespace-nowrap font-extrabold text-leaf-700">{r.price}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-navy-600">{l.note}</p>
            <div className="mt-6">
              <FaqList faqs={l.faqs} />
            </div>
          </div>
        ))}
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-14">
          <div>
            <h2 className="h-section">Cleaning charges — common questions</h2>
            <div className="mt-7">
              <FaqList faqs={PRICE_FAQS} />
            </div>
          </div>
          <QuoteForm idPrefix="price" />
        </div>
      </section>
    </>
  )
}
