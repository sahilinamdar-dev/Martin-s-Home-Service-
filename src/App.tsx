import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { FestivalBar, FestivalScrollOffer } from './components/Festival'
import { SiteFooter } from './components/SiteFooter'
import { SiteNav } from './components/SiteNav'
import { StickyCta } from './components/StickyCta'
import { FESTIVAL_PATH } from './lib/festival'
import About from './pages/About'
import AreaPage from './pages/AreaPage'
import Contact from './pages/Contact'
import FestivalPage from './pages/FestivalPage'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Privacy from './pages/Privacy'
import ServiceAreas from './pages/ServiceAreas'
import ServicePage from './pages/ServicePage'

/** New page → top of the page; link with a #hash → that section. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-full focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <FestivalBar />
      <SiteNav />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/cleaning-services/:slug" element={<AreaPage />} />
          <Route path={FESTIVAL_PATH} element={<FestivalPage />} />
          <Route path="/service-areas" element={<ServiceAreas />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <SiteFooter />
      <StickyCta />
      <FestivalScrollOffer />
    </>
  )
}
