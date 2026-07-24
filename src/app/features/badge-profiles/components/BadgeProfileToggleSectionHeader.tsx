import { Label } from '@/app/components/ui/label'
import { Switch } from '@/app/components/ui/switch'
import type { BadgeProfileFieldHelp } from '@/app/features/badge-profiles/badge-profile-field-types'
import { BadgeProfileFeatureDisabledBanner } from '@/app/features/badge-profiles/components/BadgeProfileFeatureDisabledBanner'
import { BadgeProfileFieldTooltip } from '@/app/features/badge-profiles/components/BadgeProfileFieldTooltip'

type BadgeProfileToggleSectionHeaderProps = {
  title: string
  description: string
  enabledField: {
    id: string
    label: string
    help: BadgeProfileFieldHelp
  }
  enabled: boolean
  onEnabledChange: (enabled: boolean) => void
}

export function BadgeProfileToggleSectionHeader({
  title,
  description,
  enabledField,
  enabled,
  onEnabledChange,
}: BadgeProfileToggleSectionHeaderProps) {
  return (
    <div className="mb-4 space-y-3 border-b border-border pb-3">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          {description ? (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-2 pt-0.5">
          <div className="flex items-center gap-1.5">
            <Label htmlFor={enabledField.id}>{enabledField.label}</Label>
            <BadgeProfileFieldTooltip {...enabledField.help} />
          </div>
          <Switch
            id={enabledField.id}
            name={enabledField.id}
            checked={enabled}
            onCheckedChange={onEnabledChange}
            aria-label={enabledField.label}
          />
        </div>
      </div>

      {!enabled ? <BadgeProfileFeatureDisabledBanner /> : null}
    </div>
  )
}
