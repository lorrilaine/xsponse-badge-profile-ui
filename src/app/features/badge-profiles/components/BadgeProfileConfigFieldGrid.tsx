import type { ReactNode } from 'react'

import { cn } from '@/app/utils'

export type BadgeProfileConfigFieldLayout = 'two-column' | 'single-column'

type BadgeProfileConfigFieldGridProps = {
  children: ReactNode
  layout?: BadgeProfileConfigFieldLayout
  className?: string
}

const LAYOUT_CLASS_NAMES: Record<BadgeProfileConfigFieldLayout, string> = {
  'two-column': 'grid grid-cols-1 gap-6 xl:grid-cols-2 xl:gap-8',
  'single-column': 'flex max-w-xl flex-col gap-4',
}

/**
 * Layout container for Badge Profile configuration fields.
 * Use two-column for sections with several related fields.
 * Use single-column for small sections where stacked fields read more naturally.
 */
export function BadgeProfileConfigFieldGrid({
  children,
  layout = 'two-column',
  className,
}: BadgeProfileConfigFieldGridProps) {
  return (
    <div className={cn(LAYOUT_CLASS_NAMES[layout], className)}>{children}</div>
  )
}
