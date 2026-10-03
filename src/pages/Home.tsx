import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck, CalendarCheck, Check, Clock, IndianRupee, MessageCircle, Phone, ShieldCheck, Smile, Sparkles } from 'lucide-react'
import { FaqList } from '../components/FaqList'
import { QuoteForm } from '../components/QuoteForm'
import { Reveal } from '../components/Reveal'
import { Seo } from '../components/Seo'
import { ServiceIcon } from '../components/ServiceIcon'
import { WhatsAppIcon } from '../components/WhatsAppIcon'
import { businessSchema, faqSchema } from '../lib/schema'
import { HOME_FAQS, SERVICES, servicePath } from '../lib/services'
import { IN_CITY, PHONE_DISPLAY, SITE, TEL_LINK, WA_DEFAULT, waServiceLink } from '../lib/site'

const TRUST = [
  { icon: ShieldCheck, title: 'Reliable & trustworthy', text: 'We come when we say and do the job properly.' },
  { icon: IndianRupee, title: 'Affordable rates', text: 'A fair price for the work, told to you before we start.' },
  { icon: Smile, title: 'Professional & friendly staff', text: 'Polite people who treat your home with care.' },
  { icon: Clock, title: 'Flexible timing', text: 'Pick the day and time that suits you.' },
]

const STEPS = [
  { icon: MessageCircle, title: 'Message or call us', text: 'Tell us which service you need, the size of the place and your area. Photos help.' },
  { icon: IndianRupee, title: 'Get a free quote', text: 'The price depends on the work, so we quote for your home — no surprises later.' },
  { icon: CalendarCheck, title: 'We come and clean', text: 'Choose a day and time. We arrive, clean every corner and leave it shining.' },
]

const WHY = ['Reliable & trustworthy', 'Affordable rates', 'Professional & friendly staff', 'Flexible timing', '100% satisfaction']

export default function Home() {
  return (
    <>
      <Seo
        title={`${SITE.name} — Home, Flat & Office Cleaning${IN_CITY}`}
        description={`Home, flat and office cleaning${IN_CITY}: bathroom and kitchen deep cleaning, sofa and floor cleaning, complete deep cleaning. Free quote on WhatsApp — ${SITE.phone}.`}
        path="/"
        jsonLd={[businessSchema(), faqSchema(HOME_FAQS)]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-cream to-cream">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-leaf-100 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-20 top-40 h-80 w-80 rounded-full bg-sun-100 blur-3xl" aria-hidden="true" />

        <div className="container-page relative grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-bold text-leaf-700 shadow-sm ring-1 ring-leaf-600/20">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Home · Flat · Office cleaning{IN_CITY}
            </p>

            <h1 className="mt-5 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-navy-900 sm:text-6xl">
              Making every corner{' '}
              <span className="relative inline-block text-leaf-700">
                shine
                <svg viewBox="0 0 200 14" className="absolute -bottom-2 left-0 h-3 w-full text-sun-400" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M3 10c40-8 120-10 194-3" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-700">
              {SITE.name} deep cleans homes, flats and offices — bathrooms, kitchens, sofas and floors. Tell us what you need and get a free quote on WhatsApp.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href={WA_DEFAULT} target="_blank" rel="noopener" className="btn btn-wa">
                <WhatsAppIcon className="h-5 w-5" />
                Get a free quote
              </a>
              <a href={TEL_LINK} className="btn btn-outline">
                <Phone className="h-5 w-5" aria-hidden="true" />
                Call {PHONE_DISPLAY}
              </a>
            </div>

            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-navy-800">
              {['Trusted', 'Affordable', 'Quality service'].map((t) => (
                <li key={t} className="inline-flex items-center gap-1.5">
                  <BadgeCheck className="h-4 w-4 text-leaf-700" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>

            <p className="mt-6 -rotate-2 font-hand text-3xl text-navy-800">Clean Home, Happy You!</p>
          </div>

          <div id="quote" className="scroll-mt-24">
            <QuoteForm idPrefix="hero" />
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-navy-900/5 bg-white" aria-label="Why customers choose us">
        <div className="container-page grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((t) => (
            <div key={t.title} className="flex items-start gap-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-leaf-100 text-leaf-700">
                <t.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-bold text-navy-900">{t.title}</p>
                <p className="mt-0.5 text-sm leading-snug text-navy-600">{t.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 sm:py-20">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Our cleaning services</p>
            <h2 className="h-section mt-3">One call for every kind of cleaning</h2>
            <p className="mt-4 text-lg text-navy-700">Book a single service or the whole home. Every job is quoted for your place, so you pay for the work that is needed.</p>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 80}>
                <article className="group flex h-full flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-navy-900/10 transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-900/10">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-900 text-white transition-colors group-hover:bg-leaf-700">
                    <ServiceIcon slug={s.slug} className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 text-xl font-extrabold text-navy-900">
                    <Link to={servicePath(s)} className="hover:text-leaf-700">
                      {s.name}
                    </Link>
                  </h3>
                  <p className="mt-2 flex-1 leading-relaxed text-navy-700">{s.short}</p>
                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-navy-900/10 pt-4">
                    <Link to={servicePath(s)} className="inline-flex items-center gap-1.5 text-sm font-bold text-navy-900 hover:text-leaf-700">
                      What&rsquo;s included
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <a
                      href={waServiceLink(s.name)}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-1.5 rounded-full bg-leaf-50 px-3.5 py-2 text-sm font-bold text-leaf-800 hover:bg-leaf-100"
                      aria-label={`Get a quote for ${s.name} on WhatsApp`}
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      Quote
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}

            <Reveal delay={160}>
              <div className="flex h-full flex-col justify-between rounded-3xl bg-sun-400 p-6">
                <div>
                  <p className="font-hand text-3xl leading-tight text-navy-950">Not sure what you need?</p>
                  <p className="mt-2 leading-relaxed text-navy-900">Send a few photos of your home on WhatsApp. We will suggest the right service and tell you the price.</p>
                </div>
                <a href={WA_DEFAULT} target="_blank" rel="noopener" className="btn mt-6 bg-navy-900 text-white hover:bg-navy-800">
                  <WhatsAppIcon className="h-5 w-5" />
                  Send photos
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-navy-900 py-16 text-white sm:py-20">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-sun-400">How it works</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Booked in three simple steps</h2>
          </Reveal>

          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * 100} className="h-full">
                  <div className="h-full rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
                    <div className="flex items-center gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sun-400 text-navy-950">
                        <step.icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <span className="text-5xl font-extrabold text-white/15">0{i + 1}</span>
                    </div>
                    <h3 className="mt-5 text-xl font-extrabold">{step.title}</h3>
                    <p className="mt-2 leading-relaxed text-white/75">{step.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-16 sm:py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Why choose us</p>
            <h2 className="h-section mt-3">A cleaner home means a healthier, happier you</h2>
            <p className="mt-4 text-lg leading-relaxed text-navy-700">We don&rsquo;t just clean — we make it sparkle. Your home deserves the best, and so do the people living in it.</p>
            <ul className="mt-7 space-y-3.5">
              {WHY.map((w) => (
                <li key={w} className="flex items-center gap-3 text-lg font-semibold text-navy-900">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-leaf-700 text-white">
                    <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {w}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative rounded-[2rem] bg-gradient-to-br from-leaf-100 to-sky-100 p-8 sm:p-10">
              <Sparkles className="twinkle absolute right-7 top-7 h-8 w-8 text-sun-500" aria-hidden="true" />
              <p className="font-hand text-4xl leading-tight text-navy-900 sm:text-5xl">Ghar ko banaye ekdum clean aur fresh!</p>
              <p className="mt-5 max-w-sm leading-relaxed text-navy-800">Price depends on the work, so every quote is made for your home. Asking is free.</p>
              <a href={WA_DEFAULT} target="_blank" rel="noopener" className="btn btn-wa mt-7">
                <WhatsAppIcon className="h-5 w-5" />
                Ask for your price
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white py-16 sm:py-20">
        <div className="container-page max-w-3xl">
          <Reveal>
            <p className="eyebrow">Questions</p>
            <h2 className="h-section mt-3">Frequently asked questions</h2>
          </Reveal>
          <Reveal className="mt-8">
            <FaqList faqs={HOME_FAQS} />
          </Reveal>
        </div>
      </section>

      {/* Closing call to action */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-navy-900 px-6 py-12 text-center text-white sm:px-12 sm:py-16">
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-leaf-600/30 blur-3xl" aria-hidden="true" />
              <p className="font-hand text-3xl text-sun-400">Book now</p>
              <h2 className="mx-auto mt-2 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-5xl">Ready for a home that shines?</h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-white/75">Call or message today. Tell us what needs cleaning and we will take it from there.</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a href={WA_DEFAULT} target="_blank" rel="noopener" className="btn btn-sun">
                  <WhatsAppIcon className="h-5 w-5" />
                  WhatsApp us
                </a>
                <a href={TEL_LINK} className="btn btn-ghost-light">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
