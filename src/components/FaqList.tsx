import { ChevronDown } from 'lucide-react'
import type { Faq } from '../lib/services'

/** Native <details> — answers are in the HTML and open without JavaScript. */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-navy-900/10 overflow-hidden rounded-2xl bg-white ring-1 ring-navy-900/10">
      {faqs.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left text-base font-bold text-navy-900 hover:bg-leaf-50 sm:px-6 sm:text-lg">
            <h3 className="text-base font-bold sm:text-lg">{f.q}</h3>
            <ChevronDown className="h-5 w-5 shrink-0 text-leaf-700 transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
          </summary>
          <p className="px-5 pb-5 leading-relaxed text-navy-700 sm:px-6">{f.a}</p>
        </details>
      ))}
    </div>
  )
}
