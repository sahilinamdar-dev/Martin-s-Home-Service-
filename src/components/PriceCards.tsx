import { Phone } from 'lucide-react'
import { HOMES, PRICE_NOTE, priceLabel, priceOf } from '../lib/prices'
import { PHONE_DISPLAY, SITE, TEL_LINK, waLink } from '../lib/site'
import { WhatsAppIcon } from './WhatsAppIcon'

const TINTS = ['#cfe6fb', '#cfeedd', '#ffe7a8', '#ead9fb']

/** One card for each size of home, with the empty-flat and the furnished
 *  price side by side, so a visitor finds their own home at a glance. */
export function PriceCards() {
  return (
    <div>
      <a href={TEL_LINK} className="flex items-center gap-3 rounded-2xl bg-sun-400 px-4 py-3 text-navy-950 active:scale-[0.99]">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-950 text-white">
          <Phone className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="min-w-0 text-sm font-bold leading-snug sm:text-base">
          All prices are negotiable. Call {PHONE_DISPLAY} for your final price.
        </span>
      </a>

      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {HOMES.map((home, i) => (
          <li key={home} className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-navy-900/5 ring-1 ring-navy-900/5">
            <div className="flex items-center justify-between gap-3 px-5 py-4" style={{ backgroundColor: TINTS[i % TINTS.length] }}>
              <h3 className="text-2xl font-extrabold tracking-tight text-navy-950">{home}</h3>
              <span className="rounded-full bg-white/85 px-3 py-1 text-xs font-bold text-navy-900">Negotiable</span>
            </div>
            <dl className="flex-1 divide-y divide-navy-900/10 px-5">
              {(['Empty flat', 'Furnished'] as const).map((kind) => (
                <div key={kind} className="flex items-center justify-between gap-3 py-3.5">
                  <dt className="font-semibold text-navy-700">{kind}</dt>
                  <dd className="whitespace-nowrap text-xl font-extrabold text-leaf-700">{priceLabel(priceOf(home, kind))}</dd>
                </div>
              ))}
            </dl>
            <div className="px-5 pb-5 pt-1">
              <a
                href={waLink(`Hi ${SITE.name}, I want deep cleaning for my ${home}. Please tell me the final price.`)}
                target="_blank"
                rel="noopener"
                className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-navy-950 px-4 text-sm font-bold text-white hover:bg-leaf-700 active:scale-[0.98]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Book {home} cleaning
              </a>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm text-navy-600">{PRICE_NOTE}</p>
    </div>
  )
}
