import { useState, type FormEvent } from 'react'
import { CircleHelp } from 'lucide-react'
import { SERVICES } from '../lib/services'
import { SITE, waLink } from '../lib/site'
import { ServiceIcon } from './ServiceIcon'
import { WhatsAppIcon } from './WhatsAppIcon'

const PLACE_SIZES = ['1 RK', '1 BHK', '2 BHK', '3 BHK', '4 BHK+', 'Office / shop']

const NOT_SURE = 'Not sure — please advise'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** Local date as the yyyy-mm-dd a date input uses. */
function toInputDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/** A date `days` from today, or the coming Saturday / Sunday. */
function quickDate(pick: 'tomorrow' | 'saturday' | 'sunday'): string {
  const d = new Date()
  if (pick === 'tomorrow') {
    d.setDate(d.getDate() + 1)
  } else {
    const target = pick === 'saturday' ? 6 : 0
    // Today does not count: on a Saturday, "Saturday" means next week's.
    d.setDate(d.getDate() + (((target - d.getDay() + 7) % 7) || 7))
  }
  return toInputDate(d)
}

/** '2026-10-17' → 'Sat, 17 Oct 2026' for the WhatsApp message. */
function readableDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  return `${WEEKDAYS[new Date(y, m - 1, d).getDay()]}, ${d} ${MONTHS[m - 1]} ${y}`
}

const CHIP = 'inline-flex min-h-11 cursor-pointer select-none items-center gap-1.5 rounded-full px-4 text-sm font-bold ring-1 transition active:scale-95'
const CHIP_OFF = 'bg-white text-navy-900 ring-navy-900/15 hover:ring-leaf-600'
const CHIP_ON = 'bg-navy-900 text-white ring-navy-900'

/** Collects the job details and opens WhatsApp with them typed out.
 *  Nothing is sent to or stored on a server — the customer presses send in
 *  their own WhatsApp. */
export function QuoteForm({ defaultService = '', defaultArea = '', idPrefix = 'quote', offer = '' }: { defaultService?: string; defaultArea?: string; idPrefix?: string; offer?: string }) {
  const [name, setName] = useState('')
  const [service, setService] = useState(defaultService)
  const [size, setSize] = useState('')
  const [area, setArea] = useState(defaultArea)
  const [date, setDate] = useState('')
  const [notes, setNotes] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const lines = [`Hi ${SITE.name}, I would like a cleaning quote.`, '', `Name: ${name.trim()}`, `Service: ${service}`]
    if (size) lines.push(`Place: ${size}`)
    lines.push(`Area: ${area.trim()}`)
    if (date) lines.push(`Preferred date: ${readableDate(date)}`)
    if (notes.trim()) lines.push(`Details: ${notes.trim()}`)
    if (offer) lines.push(`Offer: ${offer}`)
    window.open(waLink(lines.join('\n')), '_blank', 'noopener')
  }

  const id = (field: string) => `${idPrefix}-${field}`

  const serviceOptions = [...SERVICES.map((s) => ({ value: s.name, label: s.chip, slug: s.slug })), { value: NOT_SURE, label: 'Not sure', slug: '' }]

  const dateChips = [
    { label: 'Tomorrow', pick: 'tomorrow' },
    { label: 'Saturday', pick: 'saturday' },
    { label: 'Sunday', pick: 'sunday' },
  ] as const

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-5 shadow-xl shadow-navy-900/10 ring-1 ring-navy-900/5 sm:p-7">
      <p className="text-xl font-extrabold text-navy-900">Book your cleaning</p>
      <p className="mt-1 text-sm text-navy-600">Tap your choices — it opens WhatsApp with your message ready to send.</p>

      <div className="mt-5 grid gap-5">
        {/* Real radio buttons under the chips, so the keyboard and "required" work as usual. */}
        <fieldset>
          <legend className="field-label">Which cleaning do you need?</legend>
          <div className="flex flex-wrap gap-2">
            {serviceOptions.map((o) => (
              <label key={o.value} className={`${CHIP} has-focus-visible:outline-3 has-focus-visible:outline-sun-500 ${service === o.value ? CHIP_ON : CHIP_OFF}`}>
                <input type="radio" name={id('service')} value={o.value} checked={service === o.value} onChange={() => setService(o.value)} required className="sr-only" />
                {o.slug ? <ServiceIcon slug={o.slug} className="h-4 w-4" /> : <CircleHelp className="h-4 w-4" aria-hidden="true" />}
                {o.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="field-label">
            Size of place <span className="font-normal text-navy-600">(optional)</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {PLACE_SIZES.map((s) => (
              <button key={s} type="button" aria-pressed={size === s} onClick={() => setSize(size === s ? '' : s)} className={`${CHIP} ${size === s ? CHIP_ON : CHIP_OFF}`}>
                {s}
              </button>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor={id('date')} className="field-label">
            Preferred date <span className="font-normal text-navy-600">(optional)</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {dateChips.map((c) => {
              // Compared on click only — the chips never light up from a date the server could not know.
              return (
                <button key={c.pick} type="button" onClick={() => setDate(quickDate(c.pick))} className={`${CHIP} ${CHIP_OFF}`}>
                  {c.label}
                </button>
              )
            })}
          </div>
          <input id={id('date')} type="date" className="field mt-2" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={id('name')} className="field-label">
              Your name
            </label>
            <input id={id('name')} className="field" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
          </div>
          <div>
            <label htmlFor={id('area')} className="field-label">
              Your area / locality
            </label>
            <input id={id('area')} className="field" value={area} onChange={(e) => setArea(e.target.value)} autoComplete="address-level2" placeholder="e.g. Kalyani Nagar" required />
          </div>
        </div>

        <div>
          <label htmlFor={id('notes')} className="field-label">
            Anything else? <span className="font-normal text-navy-600">(optional)</span>
          </label>
          <textarea id={id('notes')} rows={2} className="field resize-none" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
      </div>

      <button type="submit" className="btn btn-wa mt-5 w-full">
        <WhatsAppIcon className="h-5 w-5" />
        Send on WhatsApp
      </button>
      <p className="mt-3 text-center text-xs text-navy-600">We reply on WhatsApp with timing and charges.</p>
    </form>
  )
}
