import type { WakeupSettingsValues } from '@/app/features/badge-profiles/badge-profile-configuration-types'
import { WAKEUP_SETTINGS_FIELDS } from '@/app/features/badge-profiles/wakeup-settings-fields'
import { BadgeProfileConfigFieldGrid } from '@/app/features/badge-profiles/components/BadgeProfileConfigFieldGrid'
import { BadgeProfileNumericField } from '@/app/features/badge-profiles/components/BadgeProfileNumericField'

type WakeupSettingsSectionProps = {
  values: WakeupSettingsValues
  onChange: (field: keyof WakeupSettingsValues, value: string) => void
  onFieldBlur?: (field: keyof WakeupSettingsValues) => void
  errors?: Partial<Record<keyof WakeupSettingsValues, string>>
}

export function WakeupSettingsSection({
  values,
  onChange,
  onFieldBlur,
  errors,
}: WakeupSettingsSectionProps) {
  return (
    <BadgeProfileConfigFieldGrid layout="single-column">
      {WAKEUP_SETTINGS_FIELDS.map((field) => (
        <BadgeProfileNumericField
          key={field.name}
          id={field.name}
          name={field.name}
          label={field.label}
          help={field.help}
          value={values[field.name]}
          onChange={(value) => onChange(field.name, value)}
          onBlur={() => onFieldBlur?.(field.name)}
          unit={field.unit}
          required={field.required}
          error={errors?.[field.name]}
        />
      ))}
    </BadgeProfileConfigFieldGrid>
  )
}
