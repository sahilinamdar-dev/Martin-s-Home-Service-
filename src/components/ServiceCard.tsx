import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { servicePath, type Service } from '../lib/services'
import { waServiceLink } from '../lib/site'
import { Illustration } from './Illustration'
import { ServiceIcon } from './ServiceIcon'
import { WhatsAppIcon } from './WhatsAppIcon'

/** Pastel card: the whole card opens the service page, the button books on WhatsApp. */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <article
      className="group relative flex h-full min-h-56 flex-col overflow-hidden rounded-[1.75rem] p-5 transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-900/10 active:scale-[0.99]"
      style={{ backgroundColor: service.tint }}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/80 text-navy-900">
          <ServiceIcon slug={service.slug} className="h-5 w-5" />
        </span>
        <h3 className="text-lg font-extrabold leading-tight text-navy-950">
          <Link to={servicePath(service)} className="after:absolute after:inset-0">
            {service.name}
          </Link>
        </h3>
      </div>

      <p className="mt-3 max-w-[60%] flex-1 text-sm leading-snug text-navy-800">{service.short}</p>

      <div className="mt-4 flex items-center gap-3">
        <a
          href={waServiceLink(service.name)}
          target="_blank"
          rel="noopener"
          aria-label={`Book Now: ${service.name} on WhatsApp`}
          className="relative z-10 inline-flex items-center gap-1.5 rounded-full bg-navy-950 px-4 py-2.5 text-sm font-bold text-white hover:bg-leaf-700 active:scale-95"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Book Now
        </a>
        <span className="inline-flex items-center gap-1 text-sm font-bold text-navy-900" aria-hidden="true">
          Details
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>

      <Illustration slug={service.slug} className="pointer-events-none absolute -bottom-2 -right-3 h-36 w-36 transition-transform duration-300 group-hover:scale-105" />
    </article>
  )
}
