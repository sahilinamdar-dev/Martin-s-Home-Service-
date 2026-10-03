import { Seo } from '../components/Seo'
import { PHONE_DISPLAY, SITE, TEL_LINK } from '../lib/site'

export default function Privacy() {
  return (
    <section className="container-page max-w-3xl py-12 sm:py-16">
      <Seo title={`Privacy — ${SITE.name}`} description={`How ${SITE.name} handles the details you share when asking for a cleaning quote.`} path="/privacy" />
      <h1 className="text-4xl font-extrabold tracking-tight text-navy-900">Privacy</h1>

      <div className="mt-8 space-y-6 text-lg leading-relaxed text-navy-700">
        <div>
          <h2 className="text-xl font-extrabold text-navy-900">This website stores nothing about you</h2>
          <p className="mt-2">This site has no accounts, no database and no tracking cookies. The quote form does not send your details to us through the website — it only opens WhatsApp on your phone with your message typed out. Nothing is shared until you press send in WhatsApp.</p>
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-navy-900">What we do with your message</h2>
          <p className="mt-2">When you call or message us, we use your name, phone number, address and the details of the job only to give you a quote and to carry out the cleaning you book. We do not sell or pass your details to anyone else.</p>
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-navy-900">Other services</h2>
          <p className="mt-2">Messages are sent through WhatsApp, which has its own privacy policy. The fonts on this site are loaded from Google Fonts, and the company hosting the site may keep standard technical logs such as IP addresses.</p>
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-navy-900">Questions</h2>
          <p className="mt-2">
            Call or WhatsApp us on{' '}
            <a href={TEL_LINK} className="font-bold text-leaf-700 underline">
              {PHONE_DISPLAY}
            </a>{' '}
            and we will help, including if you want us to delete your details from our chat history.
          </p>
        </div>
      </div>
    </section>
  )
}
