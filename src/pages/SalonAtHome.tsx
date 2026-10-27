import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CalendarCheck, Check, ChevronRight, Gem, House, MapPin, MessageCircle, Phone, Plus, ReceiptIndianRupee, Sparkles, UserRound } from 'lucide-react'
import { FaqList } from '../components/FaqList'
import { LocalFaqs } from '../components/LocalFaqs'
import { Reveal } from '../components/Reveal'
import { Seo } from '../components/Seo'
import { WhatsAppIcon } from '../components/WhatsAppIcon'
import { TOP_AREAS } from '../lib/areas'
import {
  BEAUTY_FAQS,
  BEAUTY_FROM,
  BEAUTY_ITEMS,
  BEAUTY_LOCAL_FAQS,
  BEAUTY_MAX,
  BEAUTY_MENU,
  BEAUTY_MIN,
  BEAUTY_NOTE,
  BEAUTY_PATH,
  BEAUTY_PHONE_DISPLAY,
  BEAUTY_TEL_LINK,
  BEAUTY_WA_DEFAULT,
  beautyWaLink,
  type BeautyItem,
} from '../lib/beauty'
import { allFaqs } from '../lib/local'
import { rupees } from '../lib/prices'
import { beautySchema, breadcrumbSchema, faqSchema } from '../lib/schema'
import { SITE } from '../lib/site'

const PROMISES = [
  { icon: UserRound, title: 'Lady beautician', text: 'Women-only service, in the privacy of your home.' },
  { icon: House, title: 'No travel, no waiting', text: 'No salon queue. She comes to you at the time you pick.' },
  { icon: Gem, title: 'Known brands', text: 'Rica, O3, Sara, Kumkumadi — you know exactly what is used.' },
  { icon: ReceiptIndianRupee, title: 'Prices shown upfront', text: `Every service priced on this page, from ${rupees(BEAUTY_MIN)}.` },
]

const STEPS = [
  { icon: MessageCircle, title: 'Pick your services', text: 'Tap “Add” on what you want below, or just WhatsApp us the list.' },
  { icon: CalendarCheck, title: 'Choose a date & time', text: 'Send your area and a slot that suits you. We confirm on WhatsApp.' },
  { icon: Sparkles, title: 'Relax at home', text: 'The beautician arrives at your door. You never leave the house.' },
]

/** One look at the menu in the hero: cheapest of each category. */
const GLIMPSE = BEAUTY_MENU.map((c) => ({ id: c.id, label: c.chip, from: BEAUTY_FROM[c.id] }))

function bookingMessage(items: BeautyItem[]): string {
  const total = items.reduce((sum, i) => sum + i.price, 0)
  return [
    'Hi, I would like to book a salon-at-home appointment:',
    ...items.map((i) => `• ${i.name} — ${rupees(i.price)}`),
    `Total as per price list: ${rupees(total)}`,
    '',
    'My area: ',
    'Preferred date and time: ',
  ].join('\n')
}

/** Gold line-art lotus for the hero. Decorative. */
function Lotus({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 140" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="lotus-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f3d792" />
          <stop offset="1" stopColor="#f7a8c4" />
        </linearGradient>
      </defs>
      <g stroke="url(#lotus-gold)" strokeWidth="2.2" strokeLinejoin="round">
        <path d="M100 118C86 96 86 58 100 22c14 36 14 74 0 96z" fill="#f7a8c4" fillOpacity=".12" />
        <path d="M100 118C78 108 60 82 62 46c22 14 36 42 38 72z" />
        <path d="M100 118c22-10 40-36 38-72-22 14-36 42-38 72z" />
        <path d="M100 118C70 118 40 102 26 74c28-2 56 14 74 44z" />
        <path d="M100 118c30 0 60-16 74-44-28-2-56 14-74 44z" />
        <path d="M30 124h140" strokeLinecap="round" opacity=".6" />
      </g>
      <g fill="#f3d792">
        <path className="twinkle" d="M168 18l2.6 7.4L178 28l-7.4 2.6L168 38l-2.6-7.4L158 28l7.4-2.6z" />
        <path className="twinkle" style={{ animationDelay: '1.1s' }} d="M34 26l1.8 5.2L41 33l-5.2 1.8L34 40l-1.8-5.2L27 33l5.2-1.8z" />
      </g>
    </svg>
  )
}

export default function SalonAtHome() {
  const [picked, setPicked] = useState<string[]>([])
  const chosen = BEAUTY_ITEMS.filter((i) => picked.includes(i.id))
  const total = chosen.reduce((sum, i) => sum + i.price, 0)
  const bookLink = chosen.length ? beautyWaLink(bookingMessage(chosen)) : BEAUTY_WA_DEFAULT

  function toggle(id: string) {
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
  }

  return (
    <>
      <Seo
        title={`Salon at Home in ${SITE.city} for Ladies — Parlour Price List from ${rupees(BEAUTY_MIN)}`}
        description={`Parlour at home in ${SITE.city} by a lady beautician: waxing from ${rupees(BEAUTY_FROM.waxing)}, facials from ${rupees(BEAUTY_FROM.facials)}, clean-up ${rupees(BEAUTY_FROM['clean-up'])}, manicure & pedicure. ${SITE.base} + ${SITE.radiusKm} km. WhatsApp to book.`}
        path={BEAUTY_PATH}
        jsonLd={[
          beautySchema(),
          faqSchema([...BEAUTY_FAQS, ...allFaqs(BEAUTY_LOCAL_FAQS)]),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Salon at home', path: BEAUTY_PATH },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="salon-mesh relative overflow-hidden text-white">
        <Lotus className="pointer-events-none absolute -right-10 top-10 w-56 opacity-25 sm:right-4 sm:w-80 sm:opacity-40 lg:right-[8%] lg:top-16 lg:w-[26rem] lg:opacity-90" />
        <div className="container-page relative pb-10 pt-5 sm:pb-16 sm:pt-8">
          <nav aria-label="Breadcrumb" className="text-[0.8rem] font-semibold text-white/60">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="mx-1 inline h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-white/90">Salon at home</span>
          </nav>

          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 py-1 pl-1 pr-3 text-[0.8rem] font-bold ring-1 ring-white/15 backdrop-blur">
            <span className="rounded-full bg-gold-400 px-2 py-0.5 text-[0.7rem] font-extrabold uppercase tracking-wider text-plum-950">New</span>
            Women only · Lady beautician
          </p>

          <h1 className="mt-4 max-w-2xl text-[2.35rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            Salon at home in {SITE.city}, <em className="text-gold">just for you</em>
          </h1>

          {/* The whole answer in one paragraph, for search snippets and AI assistants. */}
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            {SITE.name} brings the parlour to your home: waxing, facials, clean-up, manicure and pedicure by a lady beautician in {SITE.base} and {SITE.radiusKm} km around {SITE.city}. {rupees(BEAUTY_MIN)} to {rupees(BEAUTY_MAX)} per service.
          </p>

          <ul className="no-scrollbar -mx-4 mt-6 flex gap-2.5 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
            {GLIMPSE.map((g) => (
              <li key={g.id} className="shrink-0">
                <a href={`#${g.id}`} className="flex flex-col rounded-2xl bg-white/[0.07] px-4 py-2.5 ring-1 ring-white/15 backdrop-blur active:scale-95">
                  <span className="text-xs font-semibold text-white/65">{g.label}</span>
                  <span className="font-display text-lg font-extrabold text-gold-300">
                    <span className="text-xs font-semibold text-white/65">from </span>
                    {rupees(g.from)}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={BEAUTY_WA_DEFAULT} target="_blank" rel="noopener" className="btn bg-gradient-to-r from-gold-300 to-gold-400 text-plum-950 shadow-lg shadow-gold-500/25 hover:to-gold-500">
              <WhatsAppIcon className="h-5 w-5" />
              Book on WhatsApp
            </a>
            <a href={BEAUTY_TEL_LINK} className="btn btn-ghost-light">
              <Phone className="h-5 w-5" aria-hidden="true" />
              Call {BEAUTY_PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      {/* Promises */}
      <section aria-label="Why book with us" className="container-page -mt-5 relative z-10">
        <ul className="grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-4">
          {PROMISES.map((p) => (
            <li key={p.title} className="rounded-3xl bg-white p-4 shadow-xl shadow-plum-900/10 ring-1 ring-plum-900/5">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blush-100 text-blush-600">
                <p.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-3 text-[0.95rem] font-extrabold leading-tight text-plum-950">{p.title}</h2>
              <p className="mt-1 text-[0.8rem] leading-snug text-navy-700 sm:text-sm">{p.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Price menu */}
      <section id="price-list" className="pb-16 pt-12 sm:pt-16">
        <div className="container-page max-w-3xl">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blush-600">Price list</p>
            <h2 className="h-section mt-3">
              Parlour at home <em className="text-blush">price list</em>
            </h2>
            <p className="mt-3 text-lg text-navy-700">Tap “Add” on what you want. Your list and total go to WhatsApp in one tap.</p>
          </Reveal>
        </div>

        {/* Jump chips stay under the header while the menu scrolls. */}
        <nav aria-label="Price list sections" className="sticky top-16 z-30 mt-6 border-y border-plum-900/5 bg-cream/90 backdrop-blur">
          <ul className="container-page no-scrollbar flex max-w-3xl gap-2 overflow-x-auto py-2.5">
            {BEAUTY_MENU.map((c) => (
              <li key={c.id} className="shrink-0">
                <a href={`#${c.id}`} className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-bold text-plum-900 ring-1 ring-plum-900/10 hover:bg-plum-900 hover:text-white active:scale-95">
                  {c.chip}
                  <span className="text-xs font-semibold text-blush-600">{c.items.length}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="container-page max-w-3xl space-y-12 pt-8">
          {BEAUTY_MENU.map((c) => (
            <section key={c.id} id={c.id} aria-labelledby={`${c.id}-title`} className="scroll-mt-32">
              <div className="flex items-end justify-between gap-3">
                <h2 id={`${c.id}-title`} className="text-2xl font-extrabold tracking-tight text-plum-950 sm:text-3xl">
                  {c.title}
                  <span className="sr-only"> in {SITE.city}</span>
                </h2>
                <span className="shrink-0 rounded-full bg-blush-100 px-3 py-1 text-xs font-bold text-blush-600">from {rupees(BEAUTY_FROM[c.id])}</span>
              </div>
              <p className="mt-1.5 text-navy-700">{c.blurb}</p>

              <ul className="mt-4 space-y-2.5">
                {c.items.map((i) => {
                  const on = picked.includes(i.id)
                  return (
                    <li key={i.id}>
                      <button
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggle(i.id)}
                        className={`flex w-full items-center gap-3 rounded-3xl p-4 text-left transition active:scale-[0.99] sm:p-5 ${on ? 'bg-plum-900 text-white shadow-lg shadow-plum-900/25' : 'bg-white ring-1 ring-plum-900/10 hover:ring-blush-500'}`}
                      >
                        <span className="min-w-0 flex-1">
                          <span className={`block font-extrabold leading-snug ${on ? 'text-white' : 'text-plum-950'}`}>{i.name}</span>
                          <span className={`mt-0.5 block text-sm leading-snug ${on ? 'text-white/70' : 'text-navy-600'}`}>{i.detail}</span>
                        </span>
                        <span className="flex shrink-0 flex-col items-end gap-1.5">
                          <span className={`font-display text-xl font-extrabold ${on ? 'text-gold-300' : 'text-plum-800'}`}>{rupees(i.price)}</span>
                          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${on ? 'bg-gold-400 text-plum-950' : 'bg-blush-100 text-blush-600'}`}>
                            {on ? <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" /> : <Plus className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />}
                            {on ? 'Added' : 'Add'}
                          </span>
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}

          <p className="rounded-2xl bg-blush-50 px-4 py-3 text-sm font-semibold text-plum-800 ring-1 ring-blush-200">{BEAUTY_NOTE}</p>
        </div>
      </section>

      {/* How it works */}
      <section className="below-fold container-page">
        <div className="relative overflow-hidden rounded-[2rem] bg-plum-900 px-5 py-10 text-white sm:px-10 sm:py-14">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blush-500/30 blur-3xl" aria-hidden="true" />
          <Reveal className="relative max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold-300">How it works</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Your parlour, <em className="text-gold">at your doorstep</em>
            </h2>
          </Reveal>
          <ol className="relative mt-8 grid gap-4 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.title} className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-400 text-plum-950">
                    <step.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="text-5xl font-extrabold text-white/15">0{i + 1}</span>
                </div>
                <h3 className="mt-4 text-xl font-extrabold">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-white/75">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Areas */}
      <section className="below-fold py-14 sm:py-20">
        <div className="container-page max-w-3xl">
          <Reveal>
            <p className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-[0.14em] text-blush-600">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Where we come
            </p>
            <h2 className="h-section mt-3">
              Parlour at home near you in <em className="text-blush">{SITE.city}</em>
            </h2>
            <p className="mt-3 text-lg text-navy-700">
              The beautician comes to homes in {SITE.base} and about {SITE.radiusKm} km around. Not sure if your area is covered? Send it on WhatsApp.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {TOP_AREAS.map((a) => (
                <li key={a.slug} className="rounded-full bg-white px-3.5 py-2 text-sm font-bold text-plum-900 ring-1 ring-plum-900/10">
                  {a.name}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="below-fold bg-white py-14 sm:py-20">
        <div className="container-page max-w-3xl">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blush-600">Questions</p>
            <h2 className="h-section mt-3">Salon at home — common questions</h2>
          </Reveal>
          <div className="mt-7">
            <FaqList faqs={BEAUTY_FAQS} />
          </div>
          <div className="mt-10">
            <LocalFaqs blocks={BEAUTY_LOCAL_FAQS} />
          </div>
        </div>
      </section>

      {/* Closing call to action, and the way back to cleaning */}
      <section className="below-fold py-14 sm:py-20">
        <div className="container-page">
          <div className="salon-mesh relative overflow-hidden rounded-[2rem] px-6 py-12 text-center text-white sm:px-12 sm:py-16">
            <p className="font-hand text-3xl text-gold-300">Ghar baithe parlour</p>
            <h2 className="mx-auto mt-2 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-5xl">
              Book your <em className="text-gold">me-time</em> today
            </h2>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={BEAUTY_WA_DEFAULT} target="_blank" rel="noopener" className="btn bg-gradient-to-r from-gold-300 to-gold-400 text-plum-950">
                <WhatsAppIcon className="h-5 w-5" />
                Book on WhatsApp
              </a>
              <a href={BEAUTY_TEL_LINK} className="btn btn-ghost-light">
                <Phone className="h-5 w-5" aria-hidden="true" />
                {BEAUTY_PHONE_DISPLAY}
              </a>
            </div>
          </div>

          <Link to="/" className="mt-6 flex items-center gap-4 rounded-3xl bg-white p-5 ring-1 ring-navy-900/10 hover:ring-leaf-600 active:scale-[0.99]">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-leaf-100 text-leaf-700">
              <Sparkles className="h-6 w-6" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-extrabold text-navy-900">Need your home cleaned too?</span>
              <span className="block text-sm text-navy-600">Home, kitchen, bathroom and sofa deep cleaning by {SITE.name}.</span>
            </span>
            <ArrowRight className="h-5 w-5 shrink-0 text-leaf-700" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Booking bar: phones always; larger screens once something is picked. */}
      <div className={`fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 mx-auto max-w-md ${chosen.length ? '' : 'md:hidden'}`}>
        <div className="flex items-center gap-2 rounded-full bg-plum-950/95 p-1.5 shadow-2xl shadow-plum-950/40 ring-1 ring-white/10 backdrop-blur">
          {chosen.length ? (
            <span className="min-w-0 flex-1 pl-4 text-white" aria-live="polite">
              <span className="block text-xs font-semibold text-white/65">
                {chosen.length} selected
              </span>
              <span className="block font-display text-lg font-extrabold leading-tight text-gold-300">{rupees(total)}</span>
            </span>
          ) : (
            <a href={BEAUTY_TEL_LINK} aria-label={`Call ${BEAUTY_PHONE_DISPLAY}`} className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-white/10 text-white active:scale-95">
              <Phone className="h-5 w-5" aria-hidden="true" />
            </a>
          )}
          <a
            href={bookLink}
            target="_blank"
            rel="noopener"
            className={`flex h-13 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-300 to-gold-400 px-5 text-base font-extrabold text-plum-950 active:scale-[0.98] ${chosen.length ? 'shrink-0' : 'flex-1'}`}
          >
            <WhatsAppIcon className="h-5 w-5" />
            {chosen.length ? 'Book now' : 'Book on WhatsApp'}
          </a>
        </div>
      </div>
    </>
  )
}
