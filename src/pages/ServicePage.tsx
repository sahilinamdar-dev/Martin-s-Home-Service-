import { Link, useParams } from 'react-router-dom'
import { ArrowRight, Check, ChevronRight, Phone } from 'lucide-react'
import { FaqList } from '../components/FaqList'
import { QuoteForm } from '../components/QuoteForm'
import { Seo } from '../components/Seo'
import { ServiceIcon } from '../components/ServiceIcon'
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
  const others = SERVICES.filter((s) => s.slug !== service.slug)

  return (
    <>
      <Seo
        title={`${service.name}${IN_CITY} — ${SITE.name}`}
        description={`${service.short} Free quote on WhatsApp or call ${SITE.phone}.`}
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

      <section className="bg-gradient-to-b from-sky-50 to-cream">
        <div className="container-page py-8 sm:py-12">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm font-semibold text-navy-600">
            <Link to="/" className="hover:text-leaf-700">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <Link to="/#services" className="hover:text-leaf-700">
              Services
            </Link>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <span className="text-navy-900">{service.name}</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
            <div>
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-navy-900 text-white">
                <ServiceIcon slug={service.slug} className="h-8 w-8" />
              </span>
              <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-navy-900 sm:text-5xl">
                {service.name}
                {IN_CITY}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-navy-700">{service.intro}</p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href={waServiceLink(service.name)} target="_blank" rel="noopener" className="btn btn-wa">
                  <WhatsAppIcon className="h-5 w-5" />
                  Get a free quote
                </a>
                <a href={TEL_LINK} className="btn btn-outline">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  Call {PHONE_DISPLAY}
                </a>
              </div>

              <h2 className="mt-12 text-2xl font-extrabold text-navy-900">What&rsquo;s included</h2>
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
              <p className="mt-3 text-sm text-navy-600">The exact scope for your place is confirmed in your quote.</p>

              <h2 className="mt-12 text-2xl font-extrabold text-navy-900">Good for</h2>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {service.goodFor.map((item) => (
                  <li key={item} className="rounded-full bg-leaf-100 px-4 py-2 text-sm font-semibold text-leaf-800">
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-12 rounded-3xl bg-sun-100 p-6">
                <h2 className="text-xl font-extrabold text-navy-900">How much does {service.name.toLowerCase()} cost?</h2>
                <p className="mt-2 leading-relaxed text-navy-800">
                  The price depends on the work — the size of the place and its condition. Send us the details or a few photos on WhatsApp and we will give you a free quote before you book.
                </p>
              </div>
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start">
              <QuoteForm defaultService={service.name} idPrefix="service" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="container-page max-w-3xl">
          <h2 className="h-section">Questions about {service.name.toLowerCase()}</h2>
          <div className="mt-7">
            <FaqList faqs={faqs} />
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-page">
          <h2 className="text-2xl font-extrabold text-navy-900">Other cleaning services</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((s) => (
              <li key={s.slug}>
                <Link to={servicePath(s)} className="group flex items-center gap-3.5 rounded-2xl bg-white p-4 ring-1 ring-navy-900/10 hover:ring-leaf-600">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-leaf-100 text-leaf-700">
                    <ServiceIcon slug={s.slug} className="h-5 w-5" />
                  </span>
                  <span className="flex-1 font-bold text-navy-900">{s.name}</span>
                  <ArrowRight className="h-4 w-4 text-navy-600 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
