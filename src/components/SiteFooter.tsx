import { Link } from 'react-router-dom'
import { Phone } from 'lucide-react'
import { SERVICES, servicePath } from '../lib/services'
import { PHONE_DISPLAY, SITE, TEL_LINK, WA_DEFAULT } from '../lib/site'
import { Logo } from './Logo'
import { WhatsAppIcon } from './WhatsAppIcon'

export function SiteFooter() {
  return (
    // Bottom padding on small screens keeps the last line clear of the sticky call bar.
    <footer className="bg-navy-950 pb-32 pt-14 text-white/80 md:pb-10">
      <div className="container-page grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Logo onDark />
          <p className="mt-4 max-w-xs leading-relaxed">
            Home, flat and office cleaning. {SITE.tagline}.
          </p>
          <p className="mt-4 font-hand text-2xl text-sun-400">Clean Home, Happy You!</p>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-white">Services</p>
          <ul className="mt-4 space-y-2.5">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link to={servicePath(s)} className="hover:text-white">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-white">Contact</p>
          <ul className="mt-4 space-y-3">
            <li>
              <a href={TEL_LINK} className="inline-flex items-center gap-2.5 text-lg font-bold text-white hover:text-sun-400">
                <Phone className="h-5 w-5" aria-hidden="true" />
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a href={WA_DEFAULT} target="_blank" rel="noopener" className="inline-flex items-center gap-2.5 hover:text-white">
                <WhatsAppIcon className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </li>
            {SITE.hoursLabel && <li>{SITE.hoursLabel}</li>}
          </ul>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-white">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-page mt-10 border-t border-white/10 pt-6 text-sm text-white/60">
        © {SITE.name}. All rights reserved.
      </div>
    </footer>
  )
}
