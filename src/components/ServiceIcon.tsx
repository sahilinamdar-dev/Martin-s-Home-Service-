import { Bath, CookingPot, Grid3x3, House, Sofa, Sparkles, Wind, type LucideIcon } from 'lucide-react'

const ICONS: Record<string, LucideIcon> = {
  'home-flat-office-cleaning': House,
  'bathroom-deep-cleaning': Bath,
  'kitchen-deep-cleaning': CookingPot,
  'sofa-cleaning': Sofa,
  'floor-cleaning': Grid3x3,
  'dust-dirt-removal': Wind,
  'complete-deep-cleaning': Sparkles,
}

export function ServiceIcon({ slug, className }: { slug: string; className?: string }) {
  const Icon = ICONS[slug] ?? Sparkles
  return <Icon className={className} aria-hidden="true" />
}
