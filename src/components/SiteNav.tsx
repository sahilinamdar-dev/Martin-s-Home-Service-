import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Phone, X } from 'lucide-react'
import { PHONE_DISPLAY, TEL_LINK, WA_DEFAULT } from '../lib/site'
import { Logo } from './Logo'
import { WhatsAppIcon } from './WhatsAppIcon'

const LINKS = [
  { to: '/#services', label: 'Services' },
  { to: '/#how-it-works', label: 'How it works' },
  { to: '/#faq', label: 'FAQ' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export function SiteNav() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 border-b border-navy-900/5 bg-cream/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" aria-label="Martin's Home Service — home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="text-sm font-semibold text-navy-800 hover:text-leaf-700">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={TEL_LINK} className="hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-navy-900 hover:bg-navy-900/5 sm:inline-flex">
            <Phone className="h-4 w-4" aria-hidden="true" />
            {PHONE_DISPLAY}
          </a>
          <a href={WA_DEFAULT} target="_blank" rel="noopener" className="hidden items-center gap-2 rounded-full bg-leaf-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-leaf-800 md:inline-flex">
            <WhatsAppIcon className="h-4 w-4" />
            Free quote
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-navy-900 hover:bg-navy-900/5 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" className="border-t border-navy-900/5 bg-cream lg:hidden" aria-label="Mobile">
          <div className="container-page flex flex-col py-2">
            {LINKS.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-base font-semibold text-navy-900 hover:bg-leaf-50">
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
