import type { BadgeProfileFieldHelp } from '@/app/features/badge-profiles/badge-profile-field-types'
import { cn } from '@/app/utils'

type BadgeProfileFieldTooltipSectionProps = {
  label: string
  value: string
  valueClassName?: string
}

function BadgeProfileFieldTooltipSection({
  label,
  value,
  valueClassName,
}: BadgeProfileFieldTooltipSectionProps) {
  return (
    <div className="space-y-1">
      <p className="text-[11px] font-semibold tracking-wide text-foreground uppercase">
        {label}
      </p>
      <p className={cn('text-xs leading-relaxed text-muted-foreground', valueClassName)}>
        {value}
      </p>
    </div>
  )
}

type BadgeProfileFieldTooltipContentProps = BadgeProfileFieldHelp

/**
 * Standard tooltip body for Badge Profile configuration fields.
 * Renders Variable, Byte Length, Description, Allowed Range, and optional Notes.
 */
export function BadgeProfileFieldTooltipContent({
  title,
  variable,
  byteLength,
  description,
  allowedRange,
  notes,
}: BadgeProfileFieldTooltipContentProps) {
  return (
    <div className="space-y-4 p-4">
      <p className="text-sm font-semibold text-foreground">{title}</p>

      <div className="space-y-3">
        <BadgeProfileFieldTooltipSection
          label="Variable"
          value={variable}
          valueClassName="font-mono"
        />
        <BadgeProfileFieldTooltipSection label="Byte Length" value={byteLength} />
        <BadgeProfileFieldTooltipSection label="Description" value={description} />
        <BadgeProfileFieldTooltipSection label="Allowed Range" value={allowedRange} />
        {notes ? <BadgeProfileFieldTooltipSection label="Notes" value={notes} /> : null}
      </div>
    </div>
  )
}
