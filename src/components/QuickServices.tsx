import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { FESTIVAL_PATH } from '../lib/festival'
import { SERVICES, servicePath } from '../lib/services'
import { useFestivalLive } from '../lib/useFestival'
import { Diya } from './Festival'
import { Illustration } from './Illustration'

const TILE = 'flex h-[4.5rem] w-full items-center justify-center overflow-hidden rounded-3xl transition duration-200 group-hover:-translate-y-0.5 group-active:scale-95'
const LABEL = 'mt-1.5 block text-center text-xs font-bold leading-tight text-navy-900'

/** App-style category grid: one tap to any service. The last tile is the
 *  festival offers in season, and the area list otherwise. */
export function QuickServices() {
  const live = useFestivalLive()
  return (
    <nav aria-label="Services at a glance">
      <ul className="grid grid-cols-4 gap-x-3 gap-y-4 lg:grid-cols-8">
        {SERVICES.map((s) => (
          <li key={s.slug}>
            <Link to={servicePath(s)} className="group block">
              <span className={TILE} style={{ backgroundColor: s.tint }}>
                <Illustration slug={s.slug} className="h-16 w-16" />
              </span>
              <span className={LABEL}>{s.chip}</span>
            </Link>
          </li>
        ))}
        <li>
          {live ? (
            <Link to={FESTIVAL_PATH} className="group block">
              <span className={`${TILE} bg-gradient-to-br from-festive-900 to-festive-700`}>
                <Diya className="h-11 w-11" />
              </span>
              <span className={`${LABEL} text-festive-800`}>Diwali offers</span>
            </Link>
          ) : (
            <Link to="/service-areas" className="group block">
              <span className={`${TILE} bg-leaf-100 text-leaf-700`}>
                <MapPin className="h-8 w-8" aria-hidden="true" />
              </span>
              <span className={LABEL}>Our areas</span>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  )
}
