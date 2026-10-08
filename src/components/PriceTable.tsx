import { PRICES, PRICE_NOTE, priceLabel } from '../lib/prices'

/** The price list as a real table, so search engines and AI assistants can read rows and columns. */
export function PriceTable() {
  return (
    <div>
      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-navy-900/10">
        <table className="w-full text-left">
          <caption className="sr-only">Home deep cleaning charges by size of home</caption>
          <thead>
            <tr className="bg-navy-900 text-sm text-white">
              <th scope="col" className="px-5 py-3 font-bold sm:px-6">
                Home
              </th>
              <th scope="col" className="px-5 py-3 text-right font-bold sm:px-6">
                Deep cleaning charges
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-900/10">
            {PRICES.map((p) => (
              <tr key={p.id}>
                <th scope="row" className="px-5 py-4 font-bold text-navy-900 sm:px-6 sm:text-lg">
                  {p.home}
                  {p.kind && <span className="block text-sm font-semibold text-navy-600">{p.kind}</span>}
                </th>
                <td className="whitespace-nowrap px-5 py-4 text-right text-lg font-extrabold text-leaf-700 sm:px-6 sm:text-xl">{priceLabel(p)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-navy-600">{PRICE_NOTE}</p>
    </div>
  )
}
