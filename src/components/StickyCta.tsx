import { Phone } from 'lucide-react'
import { TEL_LINK, WA_DEFAULT } from '../lib/site'
import { WhatsAppIcon } from './WhatsAppIcon'

/** Always-visible call and WhatsApp buttons on phones. */
export function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-navy-900/10 bg-white/95 px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md gap-2.5">
        <a href={TEL_LINK} className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-navy-900 text-base font-bold text-white active:scale-[0.98]">
          <Phone className="h-5 w-5" aria-hidden="true" />
          Call
        </a>
        <a href={WA_DEFAULT} target="_blank" rel="noopener" className="flex min-h-12 flex-[1.4] items-center justify-center gap-2 rounded-full bg-leaf-700 text-base font-bold text-white active:scale-[0.98]">
          <WhatsAppIcon className="h-5 w-5" />
          WhatsApp
        </a>
      </div>
    </div>
  )
}
