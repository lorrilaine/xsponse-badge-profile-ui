import type { BeaconSettingsValues } from '@/app/features/badge-profiles/badge-profile-configuration-types'
import { BEACON_SETTINGS_FIELDS } from '@/app/features/badge-profiles/beacon-settings-fields'
import { BadgeProfileConfigFieldGrid } from '@/app/features/badge-profiles/components/BadgeProfileConfigFieldGrid'
import { BadgeProfileNumericField } from '@/app/features/badge-profiles/components/BadgeProfileNumericField'

type BeaconSettingsSectionProps = {
  values: BeaconSettingsValues
  onChange: (field: keyof BeaconSettingsValues, value: string) => void
  onFieldBlur?: (field: keyof BeaconSettingsValues) => void
  errors?: Partial<Record<keyof BeaconSettingsValues, string>>
}

export function BeaconSettingsSection({
  values,
  onChange,
  onFieldBlur,
  errors,
}: BeaconSettingsSectionProps) {
  return (
    <BadgeProfileConfigFieldGrid layout="two-column">
      {BEACON_SETTINGS_FIELDS.map((field) => (
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
