import { Link } from 'react-router-dom'
import { Check, Phone } from 'lucide-react'
import { Seo } from '../components/Seo'
import { WhatsAppIcon } from '../components/WhatsAppIcon'
import { breadcrumbSchema } from '../lib/schema'
import { SERVICES, servicePath } from '../lib/services'
import { IN_CITY, PHONE_DISPLAY, SITE, TEL_LINK, WA_DEFAULT } from '../lib/site'

const PROMISES = [
  { title: 'Reliable & trustworthy', text: 'You let us into your home. We respect that — we arrive when agreed and take care with your things.' },
  { title: 'Affordable rates', text: 'The price depends on the work, and you hear it before we begin.' },
  { title: 'Professional & friendly staff', text: 'People who know how to clean properly and are pleasant to have around.' },
  { title: 'Flexible timing', text: 'We work around your day, not the other way round.' },
  { title: '100% satisfaction', text: 'We want you to be happy with every corner before we leave.' },
]

export default function About() {
  return (
    <>
      <Seo
        title={`About ${SITE.name} — Home Cleaning Services${IN_CITY}`}
        description={`${SITE.name} cleans homes, flats and offices${IN_CITY}. Reliable, affordable, friendly staff and flexible timing.`}
        path="/about"
        jsonLd={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ]),
        ]}
      />

      <section className="bg-gradient-to-b from-sky-50 to-cream">
        <div className="container-page max-w-3xl py-12 sm:py-16">
          <p className="eyebrow">About us</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-navy-900 sm:text-5xl">{SITE.tagline}</h1>
          <p className="mt-6 text-lg leading-relaxed text-navy-700">
            {SITE.name} is a home cleaning service{IN_CITY}. We clean homes, flats and offices — from a single bathroom or kitchen to a complete deep cleaning of the whole place.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-navy-700">
            Our belief is simple: a cleaner home means a healthier and happier you. So we do not rush, we do not skip corners, and we tell you the price before we start.
          </p>
          <p className="mt-6 font-hand text-3xl text-leaf-700">Because your home deserves the best!</p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-page max-w-3xl">
          <h2 className="h-section">What you can expect from us</h2>
          <ul className="mt-8 space-y-4">
            {PROMISES.map((p) => (
              <li key={p.title} className="flex items-start gap-4 rounded-2xl bg-white p-5 ring-1 ring-navy-900/10">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-leaf-700 text-white">
                  <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-extrabold text-navy-900">{p.title}</h3>
                  <p className="mt-1 leading-relaxed text-navy-700">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <h2 className="h-section mt-14">What we clean</h2>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link to={servicePath(s)} className="inline-block rounded-full bg-leaf-100 px-4 py-2 font-semibold text-leaf-800 hover:bg-leaf-700 hover:text-white">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <a href={WA_DEFAULT} target="_blank" rel="noopener" className="btn btn-wa">
              <WhatsAppIcon className="h-5 w-5" />
              Get a free quote
            </a>
            <a href={TEL_LINK} className="btn btn-outline">
              <Phone className="h-5 w-5" aria-hidden="true" />
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
