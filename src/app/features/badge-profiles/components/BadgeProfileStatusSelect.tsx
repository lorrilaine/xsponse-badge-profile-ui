import { ChevronsUpDown } from 'lucide-react'

import type { BadgeProfileStatus } from '@/app/features/badge-profiles/badge-profile-mock-data'
import { BADGE_PROFILE_STATUS_FILTER_OPTIONS } from '@/app/features/badge-profiles/badge-profile-mock-data'
import { cn } from '@/app/utils'

const STATUS_OPTIONS = BADGE_PROFILE_STATUS_FILTER_OPTIONS.filter(
  (option) => option !== 'All Statuses',
) as BadgeProfileStatus[]

type BadgeProfileStatusSelectProps = {
  id?: string
  value: BadgeProfileStatus
  onChange?: (value: BadgeProfileStatus) => void
  className?: string
}

export function BadgeProfileStatusSelect({
  id = 'badge-profile-status',
  value,
  onChange,
  className,
}: BadgeProfileStatusSelectProps) {
  return (
    <div className={cn('relative', className)}>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange?.(event.target.value as BadgeProfileStatus)}
        className="flex h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm shadow-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20"
      >
        {STATUS_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronsUpDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  )
}
