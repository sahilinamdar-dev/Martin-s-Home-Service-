import type { ReactNode } from 'react'

const NAVY = '#0f2a4a'
const LEAF = '#2fa35f'
const LEAF_DARK = '#1f7a45'
const SUN = '#ffc93c'
const SKY = '#7cc7ee'
const WOOD = '#e2ad6b'
const STEEL = '#dfe9f2'

function Sparkle({ x, y, s = 1, fill = '#fff', delay = 0 }: { x: number; y: number; s?: number; fill?: string; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path className="twinkle" style={delay ? { animationDelay: `${delay}s` } : undefined} d="M0-10 2.600-2.600 10 0 2.600 2.600 0 10-2.600 2.600-10 0-2.600-2.600z" fill={fill} />
    </g>
  )
}

function Bubble({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#fff" fillOpacity=".5" stroke="#fff" strokeWidth="1.500" />
      <circle cx={x - r * 0.3} cy={y - r * 0.3} r={r * 0.18} fill="#fff" />
    </g>
  )
}

function Shadow({ rx = 62 }: { rx?: number }) {
  return <ellipse cx="100" cy="183" rx={rx} ry="7" fill={NAVY} opacity=".12" />
}

/** Bucket of cleaning supplies. */
function Bucket() {
  return (
    <>
      <Shadow />
      <g transform="rotate(18 150 80)">
        <rect x="143" y="34" width="11" height="80" rx="5.500" fill={WOOD} />
        <rect x="136" y="24" width="25" height="22" rx="5" fill="#fff" />
        <path d="M140 24v-8M146 24v-9M152 24v-9M158 24v-8" stroke={NAVY} strokeWidth="3" strokeLinecap="round" />
      </g>
      <rect x="60" y="62" width="32" height="70" rx="9" fill={SKY} />
      <rect x="69" y="46" width="14" height="18" fill={NAVY} />
      <path d="M58 28h34a7 7 0 0 1 7 7v11H69v-7H58z" fill={NAVY} />
      <rect x="66" y="82" width="20" height="18" rx="4" fill="#fff" opacity=".7" />
      <rect x="100" y="70" width="28" height="62" rx="9" fill="#fff" />
      <rect x="107" y="56" width="14" height="16" rx="3" fill={LEAF} />
      <rect x="105" y="88" width="18" height="16" rx="4" fill="#dcf3e4" />
      <path d="M46 100h108l-9 72a9 9 0 0 1-9 8H64a9 9 0 0 1-9-8z" fill={LEAF_DARK} />
      <rect x="40" y="94" width="120" height="15" rx="7.500" fill="#17603a" />
      <path d="M62 120l5 44" stroke="#fff" strokeOpacity=".25" strokeWidth="6" strokeLinecap="round" />
      <path d="M112 96h40c2 0 3 1 3 3l-3 40c-1 6-6 6-9 2s-6-4-9 0-8 4-10 0-6-4-8 1-6 0-6-4z" fill={SUN} />
      <Bubble x={36} y={62} r={9} />
      <Bubble x={26} y={88} r={5} />
      <Bubble x={176} y={70} r={7} />
      <Sparkle x={172} y={30} s={1.200} />
      <Sparkle x={34} y={30} s={0.800} delay={0.800} />
    </>
  )
}

function Bathtub() {
  return (
    <>
      <Shadow rx={74} />
      <path d="M152 104V62a16 16 0 0 0-32 0v8" fill="none" stroke={NAVY} strokeWidth="7" strokeLinecap="round" />
      <rect x="112" y="68" width="16" height="9" rx="3" fill={NAVY} />
      <path d="M115 84v6M120 82v9M125 84v6" stroke={SKY} strokeWidth="3" strokeLinecap="round" />
      <circle cx="44" cy="104" r="9" fill="#fff" />
      <circle cx="58" cy="99" r="14" fill="#fff" />
      <circle cx="79" cy="94" r="17" fill="#fff" />
      <circle cx="101" cy="99" r="14" fill="#fff" />
      <circle cx="120" cy="102" r="10" fill="#fff" />
      <path d="M28 112h144v14a36 36 0 0 1-36 36H64a36 36 0 0 1-36-36z" fill="#fff" />
      <rect x="20" y="104" width="160" height="13" rx="6.500" fill={STEEL} />
      <path d="M44 128a22 22 0 0 0 20 22" fill="none" stroke={STEEL} strokeWidth="5" strokeLinecap="round" />
      <rect x="58" y="160" width="10" height="18" rx="4" fill={NAVY} />
      <rect x="132" y="160" width="10" height="18" rx="4" fill={NAVY} />
      <Bubble x={40} y={62} r={8} />
      <Bubble x={72} y={50} r={11} />
      <Bubble x={98} y={68} r={6} />
      <Bubble x={172} y={86} r={6} />
      <Sparkle x={170} y={40} s={1.100} fill={SUN} />
      <Sparkle x={28} y={34} s={0.700} delay={1} />
    </>
  )
}

function Stove() {
  return (
    <>
      <Shadow rx={70} />
      <rect x="86" y="6" width="28" height="26" fill="#17385f" />
      <path d="M62 30h76l16 30H46z" fill={NAVY} />
      <rect x="46" y="58" width="108" height="8" rx="4" fill="#214a7a" />
      <path d="M88 92c-4-6 4-8 0-14M100 92c-4-6 4-8 0-14M112 92c-4-6 4-8 0-14" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
      <rect x="62" y="110" width="12" height="6" rx="3" fill={NAVY} />
      <rect x="126" y="110" width="12" height="6" rx="3" fill={NAVY} />
      <rect x="72" y="104" width="56" height="26" rx="6" fill={SUN} />
      <rect x="68" y="100" width="64" height="8" rx="4" fill="#f5b81f" />
      <circle cx="100" cy="97" r="4" fill={NAVY} />
      <rect x="30" y="128" width="140" height="12" rx="6" fill={NAVY} />
      <rect x="36" y="138" width="128" height="42" rx="8" fill="#fff" />
      <rect x="58" y="154" width="84" height="20" rx="5" fill={STEEL} />
      <circle cx="50" cy="147" r="3.500" fill={LEAF} />
      <circle cx="150" cy="147" r="3.500" fill={LEAF} />
      <Sparkle x={172} y={92} s={1.100} />
      <Sparkle x={28} y={96} s={0.800} delay={0.700} />
      <Sparkle x={166} y={24} s={0.600} delay={1.300} />
    </>
  )
}

function SofaArt() {
  return (
    <>
      <Shadow rx={78} />
      <rect x="42" y="72" width="116" height="62" rx="20" fill="#3d6491" />
      <rect x="80" y="86" width="38" height="34" rx="9" fill={SUN} transform="rotate(-8 99 103)" />
      <rect x="48" y="118" width="104" height="38" rx="10" fill="#5c86b8" />
      <path d="M100 121v32" stroke="#3d6491" strokeWidth="3" strokeLinecap="round" />
      <rect x="24" y="100" width="32" height="62" rx="15" fill="#214a7a" />
      <rect x="144" y="100" width="32" height="62" rx="15" fill="#214a7a" />
      <rect x="38" y="160" width="8" height="18" rx="3" fill={NAVY} />
      <rect x="154" y="160" width="8" height="18" rx="3" fill={NAVY} />
      <Sparkle x={162} y={52} s={1.300} />
      <Sparkle x={34} y={66} s={0.800} delay={0.600} />
      <Sparkle x={126} y={48} s={0.600} fill={SUN} delay={1.200} />
      <Bubble x={64} y={48} r={7} />
      <Bubble x={182} y={84} r={5} />
    </>
  )
}

function Mop() {
  return (
    <>
      <path d="M14 178 54 118h92l40 60z" fill="#fff" />
      <path d="M84.700 118 71.300 178M115.300 118 128.700 178M40.700 138h118.600M27.300 158h145.400" stroke="#cfe0ee" strokeWidth="2" fill="none" />
      <path d="M158 18 106 122" stroke={WOOD} strokeWidth="8" strokeLinecap="round" />
      <path d="M78 118h52l10 26H68z" fill={LEAF} />
      <path d="M74 144v9M85 144v11M96 144v9M107 144v11M118 144v9M129 144v11" stroke={LEAF_DARK} strokeWidth="6" strokeLinecap="round" />
      <Sparkle x={40} y={164} s={0.700} fill={SKY} />
      <Sparkle x={164} y={160} s={0.900} fill={SKY} delay={0.800} />
      <Bubble x={40} y={94} r={9} />
      <Bubble x={62} y={76} r={5} />
      <Bubble x={176} y={104} r={7} />
      <Sparkle x={52} y={36} s={1.100} />
    </>
  )
}

function Duster() {
  const feathers = [
    { a: -82, fill: '#f5b81f' },
    { a: -56, fill: SUN },
    { a: -30, fill: '#ffd766' },
    { a: -4, fill: SUN },
    { a: 20, fill: '#f5b81f' },
  ]
  return (
    <>
      <Shadow rx={52} />
      <path d="M152 174 110 104" stroke={NAVY} strokeWidth="9" strokeLinecap="round" />
      {feathers.map((f) => (
        <g key={f.a} transform={`rotate(${f.a} 108 100)`}>
          <ellipse cx="108" cy="58" rx="15" ry="44" fill={f.fill} />
          <path d="M108 96V24" stroke="#fff" strokeOpacity=".45" strokeWidth="2" />
        </g>
      ))}
      <circle cx="109" cy="102" r="10" fill={NAVY} />
      <circle cx="40" cy="152" r="10" fill="#fff" opacity=".8" />
      <circle cx="55" cy="160" r="8" fill="#fff" opacity=".8" />
      <circle cx="29" cy="165" r="7" fill="#fff" opacity=".8" />
      <circle cx="68" cy="148" r="3" fill="#fff" />
      <circle cx="22" cy="144" r="2.500" fill="#fff" />
      <Sparkle x={168} y={56} s={1.200} />
      <Sparkle x={150} y={104} s={0.700} delay={0.900} />
    </>
  )
}

function HouseArt() {
  return (
    <>
      <Shadow rx={66} />
      <path d="M52 100v70a8 8 0 0 0 8 8h80a8 8 0 0 0 8-8v-70l-48-42z" fill="#fff" />
      <path d="M36 104 100 48l64 56" fill="none" stroke={NAVY} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="89" y="134" width="22" height="44" rx="5" fill={LEAF} />
      <circle cx="105" cy="157" r="2" fill="#fff" />
      <rect x="62" y="112" width="20" height="20" rx="4" fill={SKY} />
      <rect x="118" y="112" width="20" height="20" rx="4" fill={SKY} />
      <path d="M18 182c4-16 16-22 30-18-2 14-14 22-30 18z" fill={LEAF} />
      <Sparkle x={164} y={38} s={1.500} fill={SUN} />
      <Sparkle x={34} y={52} s={0.900} delay={0.700} />
      <Sparkle x={176} y={124} s={0.700} delay={1.300} />
      <Bubble x={170} y={160} r={7} />
      <Bubble x={30} y={126} r={5} />
    </>
  )
}

const ART: Record<string, () => ReactNode> = {
  'home-flat-office-cleaning': Bucket,
  'bathroom-deep-cleaning': Bathtub,
  'kitchen-deep-cleaning': Stove,
  'sofa-cleaning': SofaArt,
  'floor-cleaning': Mop,
  'dust-dirt-removal': Duster,
  'complete-deep-cleaning': HouseArt,
}

/** Decorative drawing for a service — always paired with real text, so hidden from screen readers. */
export function Illustration({ slug, className }: { slug: string; className?: string }) {
  const Art = ART[slug] ?? Bucket
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <Art />
    </svg>
  )
}
