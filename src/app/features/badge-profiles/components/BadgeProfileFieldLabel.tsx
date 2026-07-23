import { Label } from '@/app/components/ui/label'
import type { BadgeProfileFieldHelp } from '@/app/features/badge-profiles/badge-profile-field-types'
import { BadgeProfileFieldTooltip } from '@/app/features/badge-profiles/components/BadgeProfileFieldTooltip'
import { cn } from '@/app/utils'

type BadgeProfileFieldLabelProps = {
  htmlFor: string
  label: string
  required?: boolean
  help: BadgeProfileFieldHelp
  className?: string
}

/**
 * Standard field label row for Badge Profile configuration fields.
 * Displays the label, required indicator, and contextual help icon only.
 */
export function BadgeProfileFieldLabel({
  htmlFor,
  label,
  required = false,
  help,
  className,
}: BadgeProfileFieldLabelProps) {
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <Label htmlFor={htmlFor} required={required}>
        {label}
      </Label>
      <BadgeProfileFieldTooltip {...help} />
    </div>
  )
}
