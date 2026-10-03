import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { SITE } from '../lib/site'

export default function NotFound() {
  return (
    <section className="container-page py-24 text-center">
      <Seo title={`Page not found — ${SITE.name}`} description="This page does not exist." path="/404" noindex />
      <p className="font-hand text-4xl text-leaf-700">Oops!</p>
      <h1 className="mt-2 text-4xl font-extrabold text-navy-900">This page is not here</h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-navy-700">The link may be old. Everything we offer is on the home page.</p>
      <Link to="/" className="btn btn-wa mt-8">
        Back to home
      </Link>
    </section>
  )
}
