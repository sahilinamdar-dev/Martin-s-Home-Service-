import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck, CalendarCheck, Camera, Check, ChevronRight, Clock, HandCoins, MapPin, MessageCircle, Phone, ShieldCheck, Smile, Sparkles } from 'lucide-react'
import { FaqList } from '../components/FaqList'
import { Diya, FestivalOffers } from '../components/Festival'
import { Illustration } from '../components/Illustration'
import { QuickServices } from '../components/QuickServices'
import { QuoteForm } from '../components/QuoteForm'
import { Reveal } from '../components/Reveal'
import { Seo } from '../components/Seo'
import { ServiceCard } from '../components/ServiceCard'
import { Swiper } from '../components/Swiper'
import { WhatsAppIcon } from '../components/WhatsAppIcon'
import { AREAS, TOP_AREAS, areaPath } from '../lib/areas'
import { FESTIVAL, FESTIVAL_FAQS, FESTIVAL_PATH, OFFER_ENDS_LABEL } from '../lib/festival'
import { businessSchema, faqSchema, websiteSchema } from '../lib/schema'
import { HOME_FAQS, SERVICES } from '../lib/services'
import { useFestivalLive } from '../lib/useFestival'
import { IN_CITY, PHONE_DISPLAY, SITE, TEL_LINK, WA_DEFAULT, waServiceLink } from '../lib/site'

const TRUST = [
  { icon: ShieldCheck, title: 'Reliable & trustworthy', tint: '#cfeedd' },
  { icon: HandCoins, title: 'Affordable rates', tint: '#ffe7a8' },
  { icon: Smile, title: 'Friendly staff', tint: '#ead9fb' },
  { icon: Clock, title: 'Flexible timing', tint: '#cfe6fb' },
]

const STEPS = [
  { icon: MessageCircle, title: 'WhatsApp or call us', text: 'Tell us which cleaning you need, your flat size (1 BHK, 2 BHK…) and your area.' },
  { icon: Camera, title: 'Send a few photos', text: 'We look at the work and tell you the price on WhatsApp itself. Asking is free.' },
  { icon: CalendarCheck, title: 'We come and clean', text: 'Pick your day and time. We arrive, clean every corner and leave it shining.' },
]

const WHY = ['Reliable & trustworthy', 'Affordable rates', 'Professional & friendly staff', 'Flexible timing', '100% satisfaction']

const FEATURED = SERVICES[SERVICES.length - 1]

const FAQS = FESTIVAL.enabled ? [FESTIVAL_FAQS[0], ...HOME_FAQS] : HOME_FAQS

export default function Home() {
  const festivalLive = useFestivalLive()
  return (
    <>
      <Seo
        title={`Home Cleaning Services in ${SITE.base}, ${SITE.city} — ${SITE.name}`}
        description={`Home, flat and office cleaning in ${SITE.base}, ${SITE.city} and ${SITE.radiusKm} km around: bathroom, kitchen, sofa, floor and complete deep cleaning.${FESTIVAL.enabled ? ` ${FESTIVAL.name} offers on now.` : ''} Book on WhatsApp — ${SITE.whatsapp}.`}
        path="/"
        jsonLd={[businessSchema(), websiteSchema(), faqSchema(FAQS)]}
      />

      {/* Hero — a coloured app header: title, then banners you swipe */}
      <section className="relative overflow-hidden rounded-b-[2.5rem] bg-gradient-to-br from-navy-950 via-navy-900 to-leaf-800 text-white">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-leaf-500/25 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-sun-400/15 blur-3xl" aria-hidden="true" />

        <div className="container-page relative grid gap-6 pb-7 pt-5 sm:pt-8 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14 lg:pb-16 lg:pt-14">
          <div className="min-w-0">
            <Link to="/service-areas" className="inline-flex items-center gap-1.5 rounded-full bg-white/10 py-1.5 pl-2 pr-3 text-sm font-bold ring-1 ring-white/15 backdrop-blur hover:bg-white/15 active:scale-95">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sun-400 text-navy-950">
                <MapPin className="h-4 w-4" aria-hidden="true" />
              </span>
              {SITE.base}, {SITE.city} · {SITE.radiusKm} km around
              <ChevronRight className="h-4 w-4 text-white/70" aria-hidden="true" />
            </Link>

            <h1 className="mt-5">
              <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-sun-400">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Home · Flat · Office cleaning{IN_CITY}
              </span>
              <span className="mt-2 block text-[2.6rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
                Making every corner <em className="font-bold text-sun-400">shine</em>
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/80">Deep cleaning for homes, flats and offices in {SITE.base} and nearby {SITE.city}. Just WhatsApp us — we reply with everything you need to know.</p>

            <div className="mt-6 hidden gap-3 sm:flex">
              <a href={WA_DEFAULT} target="_blank" rel="noopener" className="btn btn-sun">
                <WhatsAppIcon className="h-5 w-5" />
                Book on WhatsApp
              </a>
              <a href={TEL_LINK} className="btn btn-ghost-light">
                <Phone className="h-5 w-5" aria-hidden="true" />
                Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          {/* Banners: swiped on phones; on desktop only the photo shows, beside the text. */}
          <div className="min-w-0">
            <Swiper label="Banner" onDark dotsClassName="lg:hidden" className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:block lg:overflow-visible lg:px-0">
              <div className="relative h-64 w-[88%] shrink-0 snap-start overflow-hidden rounded-[2rem] shadow-xl shadow-navy-950/40 sm:h-80 lg:h-[30rem] lg:w-full">
                <img
                  src="/hero-living.jpg"
                  alt="A bright, freshly cleaned living room with a spotless sofa"
                  width={800}
                  height={1040}
                  fetchPriority="high"
                  className="h-full w-full object-cover object-[50%_58%]"
                />
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-navy-950/85 via-navy-950/30 to-transparent" aria-hidden="true" />
                <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-2 sm:inset-x-6 sm:top-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-2 text-sm font-bold text-navy-900 backdrop-blur">
                    <BadgeCheck className="h-4 w-4 text-leaf-700" aria-hidden="true" />
                    Trusted service
                  </span>
                </div>
                <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 sm:inset-x-6 sm:bottom-6">
                  <p className="font-hand text-3xl leading-none text-white sm:text-4xl">
                    Clean Home,
                    <br />
                    Happy You!
                  </p>
                  <a
                    href={waServiceLink(FEATURED.name)}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white py-2 pl-2 pr-5 text-sm font-bold text-navy-950 shadow-lg active:scale-95"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-leaf-700 text-white">
                      <WhatsAppIcon className="h-4.5 w-4.5" />
                    </span>
                    Book Now
                  </a>
                </div>
              </div>

              {festivalLive && (
                <Link to={FESTIVAL_PATH} className="relative flex h-64 w-[88%] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-[2rem] bg-gradient-to-br from-festive-900 to-festive-700 p-6 shadow-xl shadow-navy-950/40 active:scale-[0.99] sm:h-80 lg:hidden">
                  <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sun-400/30 blur-2xl" aria-hidden="true" />
                  <div className="relative">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-sun-400">{FESTIVAL.name} offer</p>
                    <p className="mt-2 max-w-[75%] text-3xl font-extrabold leading-[1.05] tracking-tight">{FESTIVAL.headline}</p>
                    <p className="mt-2 text-sm text-white/80">Book by {OFFER_ENDS_LABEL}</p>
                  </div>
                  <span className="relative inline-flex items-center gap-1.5 self-start rounded-full bg-sun-400 px-5 py-2.5 text-sm font-extrabold text-navy-950">
                    See all offers
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <Diya className="pointer-events-none absolute -bottom-2 right-2 h-32 w-32" />
                </Link>
              )}

              <a href={WA_DEFAULT} target="_blank" rel="noopener" className="relative flex h-64 w-[88%] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-[2rem] bg-[#ffe7a8] p-6 text-navy-950 shadow-xl shadow-navy-950/40 active:scale-[0.99] sm:h-80 lg:hidden">
                <div className="relative z-10 max-w-[68%]">
                  <p className="font-hand text-4xl leading-none">Send photos, get the price</p>
                  <p className="mt-3 text-sm font-semibold leading-snug text-navy-800">We tell you the charges on WhatsApp before you book. Asking is free.</p>
                </div>
                <span className="relative z-10 inline-flex items-center gap-2 self-start rounded-full bg-navy-950 px-5 py-2.5 text-sm font-extrabold text-white">
                  <Camera className="h-4 w-4" aria-hidden="true" />
                  Send on WhatsApp
                </span>
                <Illustration slug="complete-deep-cleaning" className="pointer-events-none absolute -bottom-3 -right-4 h-40 w-40" />
              </a>
            </Swiper>
          </div>
        </div>
      </section>

      {/* Quick access, like the home screen of an app */}
      <section className="container-page pt-7 sm:pt-10">
        <h2 className="mb-4 text-lg font-extrabold text-navy-950">What do you need cleaned?</h2>
        <QuickServices />
      </section>

      {/* Trust chips — one swipeable line on phones, four tiles on desktop */}
      <section aria-label="Why customers choose us" className="container-page mt-7">
        <ul className="no-scrollbar -mx-4 flex gap-2.5 overflow-x-auto px-4 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-4 lg:gap-3">
          {TRUST.map((t) => (
            <li key={t.title} className="flex shrink-0 items-center gap-2.5 rounded-full bg-white py-2 pl-2 pr-4 ring-1 ring-navy-900/5 lg:rounded-2xl lg:p-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-navy-900 lg:h-11 lg:w-11" style={{ backgroundColor: t.tint }}>
                <t.icon className="h-4.5 w-4.5 lg:h-5 lg:w-5" aria-hidden="true" />
              </span>
              <span className="whitespace-nowrap text-sm font-bold leading-tight text-navy-900">{t.title}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Festival offers — renders nothing outside the season */}
      <section id="offers" aria-label="Festival offers" className="container-page pt-10 empty:hidden sm:pt-14">
        <FestivalOffers showLink />
      </section>

      {/* Services */}
      <section id="services" className="py-14 sm:py-20">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Our cleaning services</p>
            <h2 className="h-section mt-3">
              One call, <em className="font-bold text-leaf-700">every kind of cleaning</em>
            </h2>
            <p className="mt-3 text-lg text-navy-700">
              Book one service or the whole home. <span className="sm:hidden">Swipe to see them all.</span>
              <span className="hidden sm:inline">Tap a card to see what is included.</span>
            </p>
          </Reveal>

          <Swiper label="Service" dotsClassName="sm:hidden" className="swipe-row mt-8 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={s.slug} className="swipe-item">
                <ServiceCard service={s} />
              </div>
            ))}

            <div className="swipe-item sm:col-span-2">
              <div className="flex h-full min-h-56 flex-col justify-between rounded-[1.75rem] bg-navy-900 p-6 text-white">
                <div>
                  <p className="font-hand text-3xl leading-tight text-sun-400">Not sure what you need?</p>
                  <p className="mt-2 max-w-md leading-relaxed text-white/80">Send a few photos of your home on WhatsApp. We will suggest the right cleaning for it.</p>
                </div>
                <a href={WA_DEFAULT} target="_blank" rel="noopener" className="btn btn-sun mt-6 self-start">
                  <Camera className="h-5 w-5" aria-hidden="true" />
                  Send photos on WhatsApp
                </a>
              </div>
            </div>
          </Swiper>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="container-page">
        <div className="rounded-[2rem] bg-navy-900 px-5 py-10 text-white sm:px-10 sm:py-14">
          <Reveal className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-sun-400">How it works</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Booked in <em className="font-bold text-sun-400">three simple steps</em>
            </h2>
          </Reveal>

          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * 100} className="h-full">
                  <div className="h-full rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                    <div className="flex items-center gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sun-400 text-navy-950">
                        <step.icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <span className="text-5xl font-extrabold text-white/15">0{i + 1}</span>
                    </div>
                    <h3 className="mt-4 text-xl font-extrabold">{step.title}</h3>
                    <p className="mt-2 leading-relaxed text-white/75">{step.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-14 sm:py-20">
        <div className="container-page grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <p className="eyebrow">Why choose us</p>
            <h2 className="h-section mt-3">
              A cleaner home means a <em className="font-bold text-leaf-700">healthier, happier you</em>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-navy-700">We don&rsquo;t just clean — we make it sparkle. Because your home deserves the best.</p>
            <ul className="mt-6 space-y-3">
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
            <div className="relative min-h-72 overflow-hidden rounded-[2rem] bg-[#ffe7a8] p-7 sm:p-9">
              <p className="relative z-10 max-w-[70%] font-hand text-4xl leading-tight text-navy-950 sm:text-5xl">Ghar ko banaye ekdum clean aur fresh!</p>
              <p className="relative z-10 mt-4 max-w-[62%] font-semibold leading-relaxed text-navy-800">Festival, function or just a fresh start — we are one WhatsApp message away.</p>
              <a href={WA_DEFAULT} target="_blank" rel="noopener" className="btn relative z-10 mt-6 bg-navy-950 text-white hover:bg-leaf-700">
                <WhatsAppIcon className="h-5 w-5" />
                WhatsApp karein
              </a>
              <Illustration slug="complete-deep-cleaning" className="pointer-events-none absolute -bottom-3 -right-5 h-44 w-44 sm:h-56 sm:w-56" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Areas */}
      <section id="areas" className="pb-14 sm:pb-20">
        <div className="container-page">
          <Reveal>
            <div className="rounded-[2rem] bg-[#cfeedd] p-6 sm:p-10">
              <p className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-[0.14em] text-leaf-800">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Where we work
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
                Cleaning services in {SITE.base} &amp; <em className="font-bold text-leaf-800">{SITE.radiusKm} km around</em>
              </h2>
              <p className="mt-3 max-w-2xl text-lg text-navy-800">
                We are based in {SITE.base}, {SITE.city} and come to {AREAS.length} localities nearby. Tap your area.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {TOP_AREAS.map((a) => (
                  <li key={a.slug}>
                    <Link to={areaPath(a)} className="inline-flex items-center rounded-full bg-white px-4 py-2.5 text-sm font-bold text-navy-900 hover:bg-navy-950 hover:text-white active:scale-95">
                      {a.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/service-areas" className="inline-flex items-center gap-1.5 rounded-full bg-navy-950 px-4 py-2.5 text-sm font-bold text-white active:scale-95">
                    All {AREAS.length} areas
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Booking form */}
      <section id="quote" className="bg-white py-14 sm:py-20">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14">
          <Reveal>
            <p className="eyebrow">Book your cleaning</p>
            <h2 className="h-section mt-3">
              Tell us once, <em className="font-bold text-leaf-700">we handle the rest</em>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-navy-700">Fill in the form and it opens WhatsApp with your message ready. Press send, and we reply there with everything — timing, what is included and the charges for your home.</p>
            <a href={TEL_LINK} className="mt-6 inline-flex items-center gap-3 text-xl font-extrabold text-navy-900 hover:text-leaf-700">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-leaf-100 text-leaf-700">
                <Phone className="h-5 w-5" aria-hidden="true" />
              </span>
              {PHONE_DISPLAY}
            </a>
          </Reveal>
          <Reveal delay={100}>
            <QuoteForm idPrefix="home" />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-14 sm:py-20">
        <div className="container-page max-w-3xl">
          <Reveal>
            <p className="eyebrow">Questions</p>
            <h2 className="h-section mt-3">Frequently asked questions</h2>
          </Reveal>
          <Reveal className="mt-7">
            <FaqList faqs={FAQS} />
          </Reveal>
        </div>
      </section>

      {/* Closing call to action */}
      <section className="pb-14 sm:pb-20">
        <div className="container-page">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-leaf-700 px-6 py-12 text-center text-white sm:px-12 sm:py-16">
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sun-400/30 blur-3xl" aria-hidden="true" />
              <p className="font-hand text-3xl text-sun-400">Booking ke liye aaj hi contact karein</p>
              <h2 className="mx-auto mt-2 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-5xl">Ready for a home that shines?</h2>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <a href={WA_DEFAULT} target="_blank" rel="noopener" className="btn btn-sun">
                  <WhatsAppIcon className="h-5 w-5" />
                  Book on WhatsApp
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
