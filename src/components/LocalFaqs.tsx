import type { LocalBlock } from '../lib/local'
import { FaqList } from './FaqList'

/** Questions in Hinglish, Hindi and Marathi, each block marked with its language. */
export function LocalFaqs({ blocks }: { blocks: LocalBlock[] }) {
  return (
    <div className="space-y-8">
      {blocks.map((b) => (
        <div key={b.lang} lang={b.lang}>
          <p className="eyebrow !tracking-normal">{b.label}</p>
          <div className="mt-3">
            <FaqList faqs={b.faqs} />
          </div>
        </div>
      ))}
    </div>
  )
}
