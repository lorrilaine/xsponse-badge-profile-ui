import { Switch } from '@/app/components/ui/switch'
import type { BadgeProfileFieldHelp } from '@/app/features/badge-profiles/badge-profile-field-types'
import { BadgeProfileFieldLabel } from '@/app/features/badge-profiles/components/BadgeProfileFieldLabel'
import { cn } from '@/app/utils'

type BadgeProfileSwitchFieldProps = {
  id: string
  name: string
  label: string
  help: BadgeProfileFieldHelp
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  className?: string
}

export function BadgeProfileSwitchField({
  id,
  name,
  label,
  help,
  checked,
  onCheckedChange,
  className,
}: BadgeProfileSwitchFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <BadgeProfileFieldLabel htmlFor={id} label={label} help={help} />

      <div className="flex h-10 items-center">
        <Switch
          id={id}
          name={name}
          checked={checked}
          onCheckedChange={onCheckedChange}
          aria-label={label}
        />
      </div>
    </div>
  )
}
