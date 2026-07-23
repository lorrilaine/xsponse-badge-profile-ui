import type { StatusUpdateSettingsValues } from '@/app/features/badge-profiles/badge-profile-configuration-types'
import { STATUS_UPDATE_SETTINGS_FIELDS } from '@/app/features/badge-profiles/status-update-settings-fields'
import { BadgeProfileConfigFieldGrid } from '@/app/features/badge-profiles/components/BadgeProfileConfigFieldGrid'
import { BadgeProfileNumericField } from '@/app/features/badge-profiles/components/BadgeProfileNumericField'

type StatusUpdateSettingsSectionProps = {
  values: StatusUpdateSettingsValues
  onChange: (field: keyof StatusUpdateSettingsValues, value: string) => void
  onFieldBlur?: (field: keyof StatusUpdateSettingsValues) => void
  errors?: Partial<Record<keyof StatusUpdateSettingsValues, string>>
}

export function StatusUpdateSettingsSection({
  values,
  onChange,
  onFieldBlur,
  errors,
}: StatusUpdateSettingsSectionProps) {
  return (
    <BadgeProfileConfigFieldGrid layout="single-column">
      {STATUS_UPDATE_SETTINGS_FIELDS.map((field) => (
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
