import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check, Phone } from 'lucide-react'
import { FaqList } from '../components/FaqList'
import { FestivalStrip } from '../components/Festival'
import { Illustration } from '../components/Illustration'
import { QuoteForm } from '../components/QuoteForm'
import { Seo } from '../components/Seo'
import { ServiceCard } from '../components/ServiceCard'
import { WhatsAppIcon } from '../components/WhatsAppIcon'
import { breadcrumbSchema, faqSchema, serviceSchema } from '../lib/schema'
import { COMMON_FAQS, SERVICES, getService, servicePath } from '../lib/services'
import { IN_CITY, PHONE_DISPLAY, SITE, TEL_LINK, waServiceLink } from '../lib/site'
import NotFound from './NotFound'

export default function ServicePage() {
  const { slug } = useParams()
  const service = getService(slug)
  if (!service) return <NotFound />

  const path = servicePath(service)
  const faqs = [...service.faqs, ...COMMON_FAQS]
  const others = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3)

  return (
    <>
      <Seo
        title={`${service.name}${IN_CITY} — ${SITE.name}`}
        description={`${service.short} Book on WhatsApp or call ${SITE.phone}.`}
        path={path}
        jsonLd={[
          serviceSchema(service),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: service.name, path },
          ]),
        ]}
      />

      {/* Coloured header, like the top of an app screen */}
      <section className="relative overflow-hidden rounded-b-[2.5rem]" style={{ backgroundColor: service.tint }}>
        <div className="container-page pb-8 pt-5 sm:pb-12 sm:pt-8">
          <Link to="/#services" className="inline-flex items-center gap-2 rounded-full bg-white/70 py-2 pl-2 pr-4 text-sm font-bold text-navy-900 backdrop-blur hover:bg-white active:scale-95">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </span>
            All services
          </Link>

          <div className="mt-4 grid items-center gap-2 md:grid-cols-[1.2fr_1fr] md:gap-10">
            <Illustration slug={service.slug} className="mx-auto h-52 w-52 sm:h-64 sm:w-64 md:order-2 md:h-80 md:w-80" />
            <div>
              <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-navy-950 sm:text-5xl">
                {service.name}
                {IN_CITY}
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-navy-800">{service.intro}</p>
              <div className="mt-6 hidden gap-3 sm:flex">
                <a href={waServiceLink(service.name)} target="_blank" rel="noopener" className="btn btn-wa">
                  <WhatsAppIcon className="h-5 w-5" />
                  Book on WhatsApp
                </a>
                <a href={TEL_LINK} className="btn btn-outline">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  Call {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-page pt-6 empty:hidden">
        <FestivalStrip serviceSlug={service.slug} />
      </div>

      <section className="container-page grid gap-10 py-10 sm:py-14 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <div>
          <h2 className="text-2xl font-extrabold text-navy-900">What&rsquo;s included</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {service.includes.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-2xl bg-white p-4 ring-1 ring-navy-900/10">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-leaf-700 text-white">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                </span>
                <span className="font-semibold text-navy-900">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-navy-600">The exact work for your place is confirmed with you on WhatsApp.</p>

          <h2 className="mt-10 text-2xl font-extrabold text-navy-900">Good for</h2>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {service.goodFor.map((item) => (
              <li key={item} className="rounded-full px-4 py-2 text-sm font-semibold text-navy-900" style={{ backgroundColor: service.tint }}>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-3xl bg-navy-900 p-6 text-white">
            <h2 className="text-xl font-extrabold">What are the charges?</h2>
            <p className="mt-2 leading-relaxed text-white/80">Charges depend on the work — the size of the place and its condition. Send us the details or a few photos on WhatsApp and we will tell you there, before you book.</p>
            <a href={waServiceLink(service.name)} target="_blank" rel="noopener" className="btn btn-sun mt-5">
              <WhatsAppIcon className="h-5 w-5" />
              Ask on WhatsApp
            </a>
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <QuoteForm defaultService={service.name} idPrefix="service" />
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="container-page max-w-3xl">
          <h2 className="h-section">Questions about {service.name.toLowerCase()}</h2>
          <div className="mt-7">
            <FaqList faqs={faqs} />
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container-page">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-extrabold text-navy-900">More cleaning services</h2>
            <Link to="/#services" className="whitespace-nowrap text-sm font-bold text-leaf-700 hover:underline">
              See all
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
