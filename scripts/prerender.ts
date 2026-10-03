import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { createServer, loadEnv } from 'vite'

const root = process.cwd()
const distDir = join(root, 'dist')
const env = loadEnv('production', root, '')

// import.meta.env only resolves through Vite's own module graph, not plain
// Node/tsx — load the app via a Vite SSR dev server so env vars, JSX, and TS
// all transform exactly like the real build.
const viteServer = await createServer({ root, server: { middlewareMode: true }, appType: 'custom' })
const { render } = (await viteServer.ssrLoadModule('/src/entry-server.tsx')) as typeof import('../src/entry-server')
const { SITE, PHONE_DISPLAY, absoluteUrl } = (await viteServer.ssrLoadModule('/src/lib/site.ts')) as typeof import('../src/lib/site')
const { SERVICES, HOME_FAQS, servicePath } = (await viteServer.ssrLoadModule('/src/lib/services.ts')) as typeof import('../src/lib/services')

let template = readFileSync(join(distDir, 'index.html'), 'utf-8')

// Google Search Console ownership tag, once the code is known.
if (env.VITE_GSC_VERIFICATION) {
  template = template.replace('</head>', `<meta name="google-site-verification" content="${env.VITE_GSC_VERIFICATION}" />\n</head>`)
}

function stripStaticHead(html: string): string {
  return html.replace(/<title>[\s\S]*?<\/title>\s*/, '').replace(/<meta name="description"[^>]*>\s*/, '')
}

// React 19's <title>/<meta>/<link> hoisting only fires on the streaming SSR
// APIs, not the synchronous renderToString we use here — so those tags render
// literally as the leading run of appHtml instead of moving to <head>. Pull
// that leading run out by hand and splice it into <head>; whatever's left is
// the real visible page markup.
const LEADING_HEAD_TAG = /^(?:<link[^>]*\/?>|<title>[\s\S]*?<\/title>|<meta[^>]*\/?>)/

function splitLeakedHead(appHtml: string): { headTags: string; bodyHtml: string } {
  let rest = appHtml
  let headTags = ''
  while (true) {
    const match = rest.match(LEADING_HEAD_TAG)
    if (!match) break
    headTags += match[0]
    rest = rest.slice(match[0].length)
  }
  return { headTags, bodyHtml: rest }
}

function writeRoute(urlPath: string, outFile?: string) {
  const { headTags, bodyHtml } = splitLeakedHead(render(urlPath).appHtml)

  let html = stripStaticHead(template)
  if (headTags) html = html.replace('</head>', `${headTags}\n</head>`)
  html = html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`)

  const outPath = outFile ? join(distDir, outFile) : urlPath === '/' ? join(distDir, 'index.html') : join(distDir, urlPath.replace(/^\//, ''), 'index.html')
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, html)
  console.log(`  prerendered ${urlPath}${headTags ? '' : '  (no head tags found — check Seo output)'}`)
}

function writeSeoFiles(paths: string[]) {
  const today = new Date().toISOString().slice(0, 10)
  const urls = paths.map((p) => `  <url><loc>${absoluteUrl(p)}</loc><lastmod>${today}</lastmod></url>`).join('\n')
  writeFileSync(join(distDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)

  writeFileSync(join(distDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`)

  // llms.txt — a plain-text summary of the business for AI assistants.
  const where = SITE.city ? `Service area: ${[SITE.city, ...SITE.areas].join(', ')}` : 'Service area: confirmed by phone or WhatsApp'
  const llms = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.name} is a cleaning service for homes, flats and offices. ${SITE.tagline}.`,
    '',
    `- Phone and WhatsApp: ${PHONE_DISPLAY} (+${SITE.countryCode} ${SITE.phone})`,
    `- ${where}`,
    '- Pricing: depends on the work; free quote by phone or WhatsApp',
    ...(SITE.hoursLabel ? [`- Hours: ${SITE.hoursLabel}`] : []),
    '',
    '## Services',
    '',
    ...SERVICES.map((s) => `- [${s.name}](${absoluteUrl(servicePath(s))}): ${s.short}`),
    '',
    '## Common questions',
    '',
    ...HOME_FAQS.flatMap((f) => [`### ${f.q}`, f.a, '']),
    '## Pages',
    '',
    `- [Home](${absoluteUrl('/')})`,
    `- [About](${absoluteUrl('/about')})`,
    `- [Contact](${absoluteUrl('/contact')})`,
    '',
  ].join('\n')
  writeFileSync(join(distDir, 'llms.txt'), llms)
}

function main() {
  const paths = ['/', ...SERVICES.map(servicePath), '/about', '/contact', '/privacy']
  for (const path of paths) writeRoute(path)

  // Served by the host for any address that has no page.
  writeRoute('/404', '404.html')

  writeSeoFiles(paths)
  console.log(`Prerendered ${paths.length} routes + 404, sitemap.xml, robots.txt, llms.txt.`)
}

try {
  main()
} catch (err) {
  console.error('Prerender failed:', err)
  process.exitCode = 1
} finally {
  await viteServer.close()
}
