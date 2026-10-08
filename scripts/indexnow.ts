import { readFileSync } from 'node:fs'
import { join } from 'node:path'

// Tells Bing (and through it ChatGPT search, Copilot and DuckDuckGo) which
// pages exist or have changed. Run after a deploy: npm run indexnow
// The key must match the file public/<key>.txt, which proves we own the site.
const KEY = '50c6889345c69fae2b8617ef8313dc68'

const sitemap = readFileSync(join(process.cwd(), 'dist', 'sitemap.xml'), 'utf-8')
const urlList = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1])
if (urlList.length === 0) throw new Error('No URLs in dist/sitemap.xml — run the build first.')

const { origin, host } = new URL(urlList[0])

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key: KEY, keyLocation: `${origin}/${KEY}.txt`, urlList }),
})

console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URLs`)
if (!res.ok) process.exitCode = 1
