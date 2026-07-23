import { useState } from 'react'
import { CircleHelp } from 'lucide-react'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/app/components/ui/tooltip'
import type { BadgeProfileFieldHelp } from '@/app/features/badge-profiles/badge-profile-field-types'
import { BADGE_PROFILE_TOOLTIP_WIDTH_CLASSNAME } from '@/app/features/badge-profiles/badge-profile-field-types'
import { BadgeProfileFieldTooltipContent } from '@/app/features/badge-profiles/components/BadgeProfileFieldTooltipContent'
import { cn } from '@/app/utils'

type BadgeProfileFieldTooltipProps = BadgeProfileFieldHelp

/**
 * Standard help trigger and documentation tooltip for Badge Profile fields.
 * Use alongside BadgeProfileFieldLabel for every configurable field.
 */
export function BadgeProfileFieldTooltip(props: BadgeProfileFieldTooltipProps) {
  const { title } = props
  const [open, setOpen] = useState(false)

  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={`${title} field information`}
          aria-expanded={open}
          className={cn(
            'inline-flex shrink-0 cursor-pointer rounded-sm text-muted-foreground transition-colors',
            'hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20',
          )}
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            setOpen((current) => !current)
          }}
        >
          <CircleHelp className="size-4" aria-hidden="true" />
        </button>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        align="start"
        sideOffset={8}
        className={cn(
          BADGE_PROFILE_TOOLTIP_WIDTH_CLASSNAME,
          'border border-border bg-card p-0 text-card-foreground shadow-md',
          '[&>svg]:hidden',
        )}
      >
        <BadgeProfileFieldTooltipContent {...props} />
      </TooltipContent>
    </Tooltip>
  )
}
