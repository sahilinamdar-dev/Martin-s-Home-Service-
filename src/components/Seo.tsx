import { SITE, absoluteUrl } from '../lib/site'

type Props = {
  title: string
  description: string
  path: string
  jsonLd?: object[]
  noindex?: boolean
}

/** Safe to inline: escapes `<` so a value like `</script>` inside JSON can't break out of the tag. */
function toInlineJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

/** Per-page head tags. React 19 moves <title>/<meta>/<link> into <head> by
 *  itself; the JSON-LD blocks stay in the body, which search engines accept. */
export function Seo({ title, description, path, jsonLd = [], noindex = false }: Props) {
  const url = absoluteUrl(path)
  const image = `${SITE.url}/og.jpg`
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex ? <meta name="robots" content="noindex" /> : <link rel="canonical" href={url} />}
      {!noindex && <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="686" />
      <meta property="og:image:alt" content={`${SITE.name} — ${SITE.tagline}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="geo.region" content="IN-MH" />
      <meta name="geo.placename" content={`${SITE.base}, ${SITE.city}`} />
      {jsonLd.map((block, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: toInlineJson(block) }} />
      ))}
    </>
  )
}
