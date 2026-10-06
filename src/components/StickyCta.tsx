import { Link, useLocation } from 'react-router-dom'
import { ClipboardList, House, LayoutGrid, Phone } from 'lucide-react'
import { getService } from '../lib/services'
import { TEL_LINK, WA_DEFAULT, waServiceLink } from '../lib/site'
import { WhatsAppIcon } from './WhatsAppIcon'

const SHELL = 'fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 mx-auto max-w-md md:hidden'

/** Phone-only floating bar. On a service page it is a booking bar for that
 *  service; everywhere else it is app-style tabs with WhatsApp in the middle. */
export function StickyCta() {
  const { pathname } = useLocation()
  const service = pathname.startsWith('/services/') ? getService(pathname.split('/')[2]) : undefined

  if (service) {
    return (
      <div className={`${SHELL} flex items-center gap-2 rounded-full bg-white/95 p-1.5 shadow-2xl shadow-navy-900/25 ring-1 ring-navy-900/10 backdrop-blur`}>
        <a href={TEL_LINK} aria-label="Call us" className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-navy-900/5 text-navy-900 active:scale-95">
          <Phone className="h-5 w-5" aria-hidden="true" />
        </a>
        <a
          href={waServiceLink(service.name)}
          target="_blank"
          rel="noopener"
          className="flex h-13 flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-leaf-700 to-teal-600 text-base font-bold text-white active:scale-[0.98]"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Book on WhatsApp
        </a>
      </div>
    )
  }

  const tab = (active: boolean) =>
    `flex h-13 flex-1 flex-col items-center justify-center gap-0.5 rounded-full text-[0.65rem] font-bold transition active:scale-95 ${active ? 'bg-navy-900 text-white' : 'text-navy-700'}`

  return (
    <nav aria-label="Quick actions" className={`${SHELL} flex items-center gap-1 rounded-full bg-white/95 p-1.5 shadow-2xl shadow-navy-900/25 ring-1 ring-navy-900/10 backdrop-blur`}>
      <Link to="/" className={tab(pathname === '/')}>
        <House className="h-5 w-5" aria-hidden="true" />
        Home
      </Link>
      <Link to="/#services" className={tab(false)}>
        <LayoutGrid className="h-5 w-5" aria-hidden="true" />
        Services
      </Link>
      <a
        href={WA_DEFAULT}
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
        className="-mt-7 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-leaf-600 to-teal-600 text-white shadow-xl shadow-leaf-700/40 ring-4 ring-cream active:scale-95"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
      <Link to="/contact" className={tab(pathname === '/contact')}>
        <ClipboardList className="h-5 w-5" aria-hidden="true" />
        Book
      </Link>
      <a href={TEL_LINK} className={tab(false)}>
        <Phone className="h-5 w-5" aria-hidden="true" />
        Call
      </a>
    </nav>
  )
}
