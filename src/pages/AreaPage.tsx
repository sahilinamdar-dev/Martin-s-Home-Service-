import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, MapPin, Phone } from 'lucide-react'
import { FaqList } from '../components/FaqList'
import { FestivalOffers } from '../components/Festival'
import { Illustration } from '../components/Illustration'
import { QuoteForm } from '../components/QuoteForm'
import { Seo } from '../components/Seo'
import { ServiceCard } from '../components/ServiceCard'
import { WhatsAppIcon } from '../components/WhatsAppIcon'
import { areaPath, getArea, nearbyAreas, type Area } from '../lib/areas'
import { FESTIVAL, festivalAreaFaq } from '../lib/festival'
import { areaServiceSchema, breadcrumbSchema, faqSchema } from '../lib/schema'
import { SERVICES, type Faq } from '../lib/services'
import { PHONE_DISPLAY, SITE, TEL_LINK, waLink } from '../lib/site'
import NotFound from './NotFound'

function areaFaqs(area: Area): Faq[] {
  const isBase = area.name === SITE.base
  const place = `${area.name}, ${SITE.city}`
  return [
    {
      q: `Do you provide cleaning services in ${area.name}?`,
      a: isBase
        ? `Yes. ${SITE.name} is based in ${SITE.base}, ${SITE.city}, and cleans homes, flats and offices all over ${area.name}. WhatsApp or call ${SITE.phone} to book.`
        : `Yes. ${SITE.name} is based in ${SITE.base}, ${SITE.city}, and covers ${area.name} along with other areas within about ${SITE.radiusKm} km. WhatsApp or call ${SITE.phone} to book.`,
    },
    {
      q: `Which cleaning services can I book in ${area.name}?`,
      a: `All of them: ${SERVICES.map((s) => s.name.toLowerCase()).join(', ')}.`,
    },
    {
      q: `What are the charges for home cleaning in ${area.name}?`,
      a: `Charges depend on the work — the size of your place in ${place}, its condition and the services you need. Send the details or a few photos on WhatsApp and we will tell you there. Asking is free.`,
    },
    {
      q: `How do I book a cleaning in ${area.name}?`,
      a: `WhatsApp or call ${SITE.phone}. Tell us the service, your society or address in ${area.name} and the day and time you prefer. Our timing is flexible and we confirm the slot on WhatsApp.`,
    },
    ...(FESTIVAL.enabled ? [festivalAreaFaq(area.name)] : []),
  ]
}

export default function AreaPage() {
  const { slug } = useParams()
  const area = getArea(slug)
  if (!area) return <NotFound />

  const path = areaPath(area)
  const place = `${area.name}, ${SITE.city}`
  const faqs = areaFaqs(area)
  const nearby = nearbyAreas(area)
  const wa = waLink(`Hi ${SITE.name}, I need cleaning in ${area.name}.`)

  return (
    <>
      <Seo
        title={`Cleaning Services in ${place} — Home, Flat & Office Deep Cleaning`}
        description={`Home, flat and office cleaning in ${place}: bathroom, kitchen, sofa, floor and complete deep cleaning by ${SITE.name}. Book on WhatsApp — ${SITE.phone}.`}
        path={path}
        jsonLd={[
          areaServiceSchema(area),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Service areas', path: '/service-areas' },
            { name: area.name, path },
          ]),
        ]}
      />

      <section className="relative overflow-hidden rounded-b-[2.5rem] bg-[#cfeedd]">
        <div className="container-page pb-8 pt-5 sm:pb-12 sm:pt-8">
          <Link to="/service-areas" className="inline-flex items-center gap-2 rounded-full bg-white/70 py-2 pl-2 pr-4 text-sm font-bold text-navy-900 backdrop-blur hover:bg-white active:scale-95">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </span>
            All areas
          </Link>

          <div className="mt-5 grid items-center gap-2 md:grid-cols-[1.3fr_1fr] md:gap-10">
            <div>
              <p className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-[0.14em] text-leaf-800">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {place}
              </p>
              <h1 className="mt-2 text-4xl font-extrabold leading-[1.08] tracking-tight text-navy-950 sm:text-5xl">
                Cleaning services in <em className="font-bold text-leaf-800">{area.name}</em>
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-navy-800">
                {SITE.name} cleans homes, flats and offices in {place}. {area.note}
              </p>
              <div className="mt-6 hidden gap-3 sm:flex">
                <a href={wa} target="_blank" rel="noopener" className="btn btn-wa">
                  <WhatsAppIcon className="h-5 w-5" />
                  Book on WhatsApp
                </a>
                <a href={TEL_LINK} className="btn btn-outline">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  Call {PHONE_DISPLAY}
                </a>
              </div>
            </div>
            <Illustration slug="complete-deep-cleaning" className="mx-auto hidden h-64 w-64 md:block" />
          </div>
        </div>
      </section>

      <section className="container-page py-10 sm:py-14">
        <h2 className="h-section">Cleaning we do in {area.name}</h2>
        <p className="mt-3 max-w-2xl text-lg text-navy-700">Book one service or the whole home. Tap a card to see what is included.</p>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>

      <section aria-label="Festival offers" className="container-page pb-10 empty:hidden sm:pb-14">
        <FestivalOffers area={area.name} showLink />
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-14">
          <div>
            <h2 className="h-section">
              Book a cleaning in <em className="font-bold text-leaf-700">{area.name}</em>
            </h2>
            <ol className="mt-6 space-y-4 text-lg text-navy-800">
              <li className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900 font-extrabold text-white">1</span>
                <span>WhatsApp us your society or address in {area.name} and the cleaning you need.</span>
              </li>
              <li className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900 font-extrabold text-white">2</span>
                <span>Send a few photos. We tell you the charges on WhatsApp itself.</span>
              </li>
              <li className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900 font-extrabold text-white">3</span>
                <span>Pick your day and time. We come to {area.name} and clean every corner.</span>
              </li>
            </ol>
          </div>
          <QuoteForm idPrefix="area" defaultArea={place} />
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container-page max-w-3xl">
          <h2 className="h-section">Cleaning in {area.name} — common questions</h2>
          <div className="mt-7">
            <FaqList faqs={faqs} />
          </div>
        </div>
      </section>

      <section className="pb-14 sm:pb-20">
        <div className="container-page">
          <h2 className="text-2xl font-extrabold text-navy-900">We also clean near {area.name}</h2>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {nearby.map((a) => (
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
