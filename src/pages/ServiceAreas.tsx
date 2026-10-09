import { Link } from 'react-router-dom'
import { MapPin, Phone } from 'lucide-react'
import { Seo } from '../components/Seo'
import { WhatsAppIcon } from '../components/WhatsAppIcon'
import { AREAS, ZONES, areaPath } from '../lib/areas'
import { breadcrumbSchema, businessSchema } from '../lib/schema'
import { PHONE_DISPLAY, SITE, TEL_LINK, WA_DEFAULT } from '../lib/site'

export default function ServiceAreas() {
  return (
    <>
      <Seo
        title={`Cleaning Service Areas in ${SITE.city} — ${SITE.base} & ${SITE.radiusKm} km Around`}
        description={`${SITE.name} cleans homes, flats and offices within ${SITE.radiusKm} km of ${SITE.base}, ${SITE.city}: Kalyani Nagar, Viman Nagar, Yerawada, Kharadi, Hadapsar and more.`}
        path="/service-areas"
        jsonLd={[
          businessSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Service areas', path: '/service-areas' },
          ]),
        ]}
      />

      <section className="container-page py-10 sm:py-14">
        <p className="eyebrow">Where we work</p>
        <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-navy-950 sm:text-5xl">
          Cleaning in {SITE.base} and <em className="font-bold text-leaf-700">{SITE.radiusKm} km around</em>
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-navy-700">
          {SITE.name} is based in {SITE.base}, {SITE.city}. We clean homes, flats and offices in the areas below. If your area is not listed, WhatsApp us your location — we will tell you right away.
        </p>

        <div className="mt-10 space-y-9">
          {ZONES.map((zone) => (
            <div key={zone}>
              <h2 className="text-xl font-extrabold text-navy-900">{zone}</h2>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {AREAS.filter((a) => a.zone === zone).map((a) => (
                  <li key={a.slug}>
                    <Link to={areaPath(a)} className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-navy-900 ring-1 ring-navy-900/10 hover:ring-leaf-600 active:scale-95">
                      <MapPin className="h-4 w-4 text-leaf-700" aria-hidden="true" />
                      {a.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <a href={WA_DEFAULT} target="_blank" rel="noopener" className="btn btn-wa">
            <WhatsAppIcon className="h-5 w-5" />
            Book on WhatsApp
          </a>
          <a href={TEL_LINK} className="btn btn-outline">
            <Phone className="h-5 w-5" aria-hidden="true" />
            Call {PHONE_DISPLAY}
          </a>
        </div>
      </section>
    </>
  )
}
