import type { ReactNode } from 'react'

import { cn } from '@/app/utils'

type BadgeProfileConfigFieldGridProps = {
  children: ReactNode
  className?: string
}

export function BadgeProfileConfigFieldGrid({
  children,
  className,
}: BadgeProfileConfigFieldGridProps) {
  return (
    <div className={cn('grid grid-cols-1 gap-8 xl:grid-cols-2', className)}>
      {children}
    </div>
  )
}
