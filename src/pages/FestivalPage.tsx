import { Link } from 'react-router-dom'
import { ArrowRight, CalendarCheck, Check, MapPin, Phone } from 'lucide-react'
import { FaqList } from '../components/FaqList'
import { LocalFaqs } from '../components/LocalFaqs'
import { Diya, FestivalOffers } from '../components/Festival'
import { QuoteForm } from '../components/QuoteForm'
import { Seo } from '../components/Seo'
import { WhatsAppIcon } from '../components/WhatsAppIcon'
import { AREAS, TOP_AREAS, areaPath } from '../lib/areas'
import { FESTIVAL, FESTIVAL_FAQS, FESTIVAL_PATH, OFFER_ENDS_LABEL, OFFER_SUMMARY, WA_FESTIVAL, formatDay } from '../lib/festival'
import { LOCAL_FESTIVAL_FAQS, allFaqs } from '../lib/local'
import { breadcrumbSchema, faqSchema, festivalSchema } from '../lib/schema'
import { getService, servicePath } from '../lib/services'
import { PHONE_DISPLAY, SITE, TEL_LINK } from '../lib/site'

/** Room-by-room list, each linked to the service that does it. */
const CHECKLIST = [
  { slug: 'kitchen-deep-cleaning', room: 'Kitchen', items: ['Stove and chimney degreased', 'Cabinets and drawers wiped', 'Sink, faucet and countertops', 'Wall tiles and floor'] },
  { slug: 'bathroom-deep-cleaning', room: 'Bathrooms', items: ['Wall and floor tiles scrubbed', 'Toilet, basin and sink', 'Taps and shower fittings shined', 'Mirror, corners and drains'] },
  { slug: 'sofa-cleaning', room: 'Living room & sofa', items: ['Sofa fabric, seats and armrests', 'Cushions cleaned', 'Visible stains and marks', 'Furniture wiped'] },
  { slug: 'dust-dirt-removal', room: 'Bedrooms & every corner', items: ['Shelves and furniture dusted', 'Window frames and glass', 'Corners and hard-to-reach spots', 'Floors in every room'] },
]

const TIMELINE = [
  {
    when: `Before Dussehra · ${formatDay(FESTIVAL.dussehra, false)}`,
    title: 'Start with the heavy work',
    text: 'Kitchen and bathroom deep cleaning, so the home is fresh for Navratri and Dasara puja.',
  },
  {
    when: 'Two to three weeks before Diwali',
    title: 'Full home deep clean',
    text: 'The best time for a complete deep cleaning. You get the day and time you want, before the rush.',
  },
  {
    when: `Last week · before ${formatDay(FESTIVAL.dhanteras, false)}`,
    title: 'Finishing touches',
    text: 'Sofa cleaning, floors and dusting, so everything shines when guests arrive for Lakshmi Pujan.',
  },
]

export default function FestivalPage() {
  return (
    <>
      <Seo
        title={`Diwali Cleaning in ${SITE.city} ${FESTIVAL.year} — Deep Cleaning Offers`}
        description={`Diwali & Dussehra home deep cleaning in ${SITE.base} and ${SITE.radiusKm} km around ${SITE.city}. Offers till ${OFFER_ENDS_LABEL}: ${FESTIVAL.headline.toLowerCase()}. Book on WhatsApp — ${SITE.whatsapp}.`}
        path={FESTIVAL_PATH}
        jsonLd={[
          festivalSchema(),
          faqSchema([...FESTIVAL_FAQS, ...allFaqs(LOCAL_FESTIVAL_FAQS)]),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Diwali cleaning offers', path: FESTIVAL_PATH },
          ]),
        ]}
      />

      <section className="relative overflow-hidden rounded-b-[2.5rem] bg-[#ffe7a8]">
        <div className="container-page grid items-center gap-4 pb-9 pt-7 sm:pb-12 sm:pt-10 md:grid-cols-[1.4fr_1fr] md:gap-10">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-festive-800">
              <Diya className="h-5 w-5" />
              Festival cleaning {FESTIVAL.year}
            </p>
            <h1 className="mt-2 text-4xl font-extrabold leading-[1.08] tracking-tight text-navy-950 sm:text-5xl">
              Diwali &amp; Dussehra cleaning offers in <em className="font-bold text-festive-800">{SITE.city}</em>
            </h1>
            {/* The whole answer in one paragraph, for search snippets and AI assistants. */}
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-navy-800">
              {SITE.name} does Diwali and Dussehra (Dasara) deep cleaning for homes, flats and offices in {SITE.base} and {SITE.radiusKm} km around {SITE.city}. Festival offers for bookings until {OFFER_ENDS_LABEL}: {OFFER_SUMMARY}.
            </p>
            <p className="mt-3 font-hand text-3xl text-festive-800">Diwali ki safai, hum par chhod dijiye!</p>
            <div className="mt-6 hidden gap-3 sm:flex">
              <a href={WA_FESTIVAL} target="_blank" rel="noopener" className="btn btn-wa">
                <WhatsAppIcon className="h-5 w-5" />
                Book Diwali cleaning
              </a>
              <a href={TEL_LINK} className="btn btn-outline">
                <Phone className="h-5 w-5" aria-hidden="true" />
                Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>
          <Diya className="mx-auto hidden h-56 w-56 md:block" />
        </div>
      </section>

      <section id="offers" className="container-page py-10 sm:py-14">
        <FestivalOffers />
      </section>

      <section className="container-page pb-12 sm:pb-16">
        <h2 className="h-section">
          What Diwali cleaning <em className="font-bold text-leaf-700">covers</em>
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-navy-700">Book the whole home, or only the rooms that need it. Tap a room to see the full service.</p>
        <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CHECKLIST.map((c) => {
            const service = getService(c.slug)
            if (!service) return null
            return (
              <li key={c.slug} className="relative rounded-[1.75rem] p-5" style={{ backgroundColor: service.tint }}>
                <h3 className="text-lg font-extrabold text-navy-950">
                  <Link to={servicePath(service)} className="after:absolute after:inset-0">
                    {c.room}
                  </Link>
                </h3>
                <ul className="mt-3 space-y-2">
                  {c.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm font-semibold text-navy-900">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-leaf-800" strokeWidth={3} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-navy-900">
                  {service.name}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </p>
              </li>
            )
          })}
        </ul>
        <p className="mt-3 text-sm text-navy-600">The exact work for your home is confirmed with you on WhatsApp.</p>
      </section>

      <section className="container-page">
        <div className="rounded-[2rem] bg-navy-900 px-5 py-10 text-white sm:px-10 sm:py-14">
          <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-sun-400">
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            When to book
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Diwali is on <em className="font-bold text-sun-400">{formatDay(FESTIVAL.diwali)}</em>
          </h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {TIMELINE.map((t) => (
              <li key={t.title} className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                <p className="text-sm font-bold text-sun-400">{t.when}</p>
                <h3 className="mt-2 text-xl font-extrabold">{t.title}</h3>
                <p className="mt-2 leading-relaxed text-white/75">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="quote" className="py-12 sm:py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-14">
          <div>
            <h2 className="h-section">
              Book your <em className="font-bold text-leaf-700">Diwali cleaning</em>
            </h2>
            <ol className="mt-6 space-y-4 text-lg text-navy-800">
              <li className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900 font-extrabold text-white">1</span>
                <span>WhatsApp us the offer you want, your flat size (1 BHK, 2 BHK…) and your area.</span>
              </li>
              <li className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900 font-extrabold text-white">2</span>
                <span>Send a few photos. We tell you the charges on WhatsApp, with the festival discount applied.</span>
              </li>
              <li className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900 font-extrabold text-white">3</span>
                <span>Pick your day and time before Diwali. We come and clean every corner.</span>
              </li>
            </ol>
          </div>
          <QuoteForm idPrefix="festival" defaultService="Complete Deep Cleaning" offer={`${FESTIVAL.name} festival offer`} />
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="container-page max-w-3xl">
          <h2 className="h-section">Diwali cleaning — common questions</h2>
          <div className="mt-7">
            <FaqList faqs={FESTIVAL_FAQS} />
          </div>
          <div className="mt-10">
            <LocalFaqs blocks={LOCAL_FESTIVAL_FAQS} />
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container-page">
          <h2 className="text-2xl font-extrabold text-navy-900">Diwali cleaning near you</h2>
          <p className="mt-2 text-navy-700">
            We come to {AREAS.length} localities around {SITE.base}, {SITE.city}.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {TOP_AREAS.map((a) => (
              <li key={a.slug}>
                <Link to={areaPath(a)} className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-navy-900 ring-1 ring-navy-900/10 hover:ring-leaf-600 active:scale-95">
                  <MapPin className="h-4 w-4 text-leaf-700" aria-hidden="true" />
                  {a.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/service-areas" className="inline-flex rounded-full bg-navy-950 px-4 py-2.5 text-sm font-bold text-white active:scale-95">
                All areas
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}
