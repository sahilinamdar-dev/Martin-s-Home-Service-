import { Link } from 'react-router-dom'
import { Clock, MapPin, Phone } from 'lucide-react'
import { QuoteForm } from '../components/QuoteForm'
import { Seo } from '../components/Seo'
import { WhatsAppIcon } from '../components/WhatsAppIcon'
import { breadcrumbSchema, businessSchema } from '../lib/schema'
import { ALT_PHONE_DISPLAY, ALT_TEL_LINK, IN_CITY, PHONE_DISPLAY, REACH_US, SITE, TEL_LINK, WA_DEFAULT } from '../lib/site'

export default function Contact() {
  const serviceArea = `${SITE.base}, ${SITE.city} and areas within about ${SITE.radiusKm} km`

  return (
    <>
      <Seo
        title={`Contact ${SITE.name} — Call or WhatsApp`}
        description={`Book home, flat or office cleaning${IN_CITY}. ${REACH_US} for a free quote.`}
        path="/contact"
        jsonLd={[
          businessSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
        ]}
      />

      <section className="bg-gradient-to-b from-sky-50 to-cream">
        <div className="container-page grid gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <div>
            <p className="eyebrow">Contact us</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-navy-900 sm:text-5xl">Book your cleaning today</h1>
            <p className="mt-5 text-lg leading-relaxed text-navy-700">To book {SITE.name}, call {SITE.phone} or WhatsApp {SITE.whatsapp}{SITE.hoursLabel ? ` — ${SITE.hoursLabel.charAt(0).toLowerCase()}${SITE.hoursLabel.slice(1)}` : ''}. Tell us which service you need, your area and a day that suits you — we will reply with a free quote.</p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-navy-900/10">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy-900 text-white">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-navy-600">Call us</span>
                  <a href={TEL_LINK} className="block text-2xl font-extrabold text-navy-900 hover:text-leaf-700">
                    {PHONE_DISPLAY}
                  </a>
                  {ALT_PHONE_DISPLAY && (
                    <a href={ALT_TEL_LINK} className="block text-2xl font-extrabold text-navy-900 hover:text-leaf-700">
                      {ALT_PHONE_DISPLAY}
                    </a>
                  )}
                </span>
              </div>

              <a href={WA_DEFAULT} target="_blank" rel="noopener" className="flex items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-navy-900/10 hover:ring-leaf-600">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-leaf-700 text-white">
                  <WhatsAppIcon className="h-6 w-6" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-navy-600">WhatsApp</span>
                  <span className="block text-xl font-extrabold text-navy-900">Chat with us — send photos for a quote</span>
                </span>
              </a>

              <div className="flex items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-navy-900/10">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-leaf-100 text-leaf-700">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-navy-600">Service area</span>
                  <span className="block font-bold text-navy-900">{serviceArea}</span>
                  <Link to="/service-areas" className="mt-1 inline-block text-sm font-bold text-leaf-700 underline">
                    See all areas
                  </Link>
                </span>
              </div>

              {SITE.hoursLabel && (
                <div className="flex items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-navy-900/10">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-leaf-100 text-leaf-700">
                    <Clock className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-navy-600">Working hours</span>
                    <span className="block font-bold text-navy-900">{SITE.hoursLabel}</span>
                  </span>
                </div>
              )}
            </div>

            <p className="mt-8 font-hand text-3xl text-leaf-700">Booking ke liye aaj hi contact karein.</p>
          </div>

          <div>
            <QuoteForm idPrefix="contact" />
          </div>
        </div>
      </section>
    </>
  )
}
