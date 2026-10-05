import { useState, type FormEvent } from 'react'
import { SERVICES } from '../lib/services'
import { SITE, waLink } from '../lib/site'
import { WhatsAppIcon } from './WhatsAppIcon'

const PLACE_SIZES = ['1 RK', '1 BHK', '2 BHK', '3 BHK', '4 BHK or bigger', 'Office / shop']

/** Collects the job details and opens WhatsApp with them typed out.
 *  Nothing is sent to or stored on a server — the customer presses send in
 *  their own WhatsApp. */
export function QuoteForm({ defaultService = '', idPrefix = 'quote' }: { defaultService?: string; idPrefix?: string }) {
  const [name, setName] = useState('')
  const [service, setService] = useState(defaultService)
  const [size, setSize] = useState('')
  const [area, setArea] = useState('')
  const [date, setDate] = useState('')
  const [notes, setNotes] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const lines = [`Hi ${SITE.name}, I would like a cleaning quote.`, '', `Name: ${name.trim()}`, `Service: ${service}`]
    if (size) lines.push(`Place: ${size}`)
    lines.push(`Area: ${area.trim()}`)
    if (date) lines.push(`Preferred date: ${date}`)
    if (notes.trim()) lines.push(`Details: ${notes.trim()}`)
    window.open(waLink(lines.join('\n')), '_blank', 'noopener')
  }

  const id = (field: string) => `${idPrefix}-${field}`

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-5 shadow-xl shadow-navy-900/10 ring-1 ring-navy-900/5 sm:p-7">
      <p className="text-xl font-extrabold text-navy-900">Book your cleaning</p>
      <p className="mt-1 text-sm text-navy-600">Fill this in — it opens WhatsApp with your message ready to send.</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={id('name')} className="field-label">
            Your name
          </label>
          <input id={id('name')} className="field" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={id('service')} className="field-label">
            Service needed
          </label>
          <select id={id('service')} className="field" value={service} onChange={(e) => setService(e.target.value)} required>
            <option value="" disabled>
              Choose a service
            </option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
            <option value="Not sure — please advise">Not sure — please advise</option>
          </select>
        </div>

        <div>
          <label htmlFor={id('size')} className="field-label">
            Size of place
          </label>
          <select id={id('size')} className="field" value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="">Select</option>
            {PLACE_SIZES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={id('date')} className="field-label">
            Preferred date
          </label>
          <input id={id('date')} type="date" className="field" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={id('area')} className="field-label">
            Your area / locality
          </label>
          <input id={id('area')} className="field" value={area} onChange={(e) => setArea(e.target.value)} autoComplete="address-level2" required />
        </div>

        <div className="sm:col-span-2">
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
