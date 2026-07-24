import type { AlertMode2SettingsValues } from '@/app/features/badge-profiles/badge-profile-configuration-types'
import {
  ALERT_MODE_2_ACTIVATION_TYPE_FIELD,
  ALERT_MODE_2_ENABLED_FIELD,
  ALERT_MODE_2_NUMERIC_FIELDS,
} from '@/app/features/badge-profiles/alert-mode-2-settings-fields'
import { getBadgeConfigurationSection } from '@/app/features/badge-profiles/badge-profile-form-sections'
import { BadgeProfileConfigFieldGrid } from '@/app/features/badge-profiles/components/BadgeProfileConfigFieldGrid'
import { BadgeProfileNumericField } from '@/app/features/badge-profiles/components/BadgeProfileNumericField'
import { BadgeProfileSelectField } from '@/app/features/badge-profiles/components/BadgeProfileSelectField'
import { BadgeProfileToggleSectionHeader } from '@/app/features/badge-profiles/components/BadgeProfileToggleSectionHeader'

type AlertMode2SettingsSectionProps = {
  values: AlertMode2SettingsValues
  onEnabledChange: (enabled: boolean) => void
  onTypeChange: (value: string) => void
  onNumericChange: (
    field:
      | 'Alert2ButtonSettingButtonPress'
      | 'Alert2ButtonSettingLED'
      | 'Alert2ButtonSettingHaptic'
      | 'Alert2ButtonSettingDuration',
    value: string,
  ) => void
  onFieldBlur?: (field: keyof AlertMode2SettingsValues) => void
  errors?: Partial<Record<keyof AlertMode2SettingsValues, string>>
}

export function AlertMode2SettingsSection({
  values,
  onEnabledChange,
  onTypeChange,
  onNumericChange,
  onFieldBlur,
  errors,
}: AlertMode2SettingsSectionProps) {
  const alertModeEnabled = values.Alert2ButtonSettingEnabled
  const section = getBadgeConfigurationSection('alert-mode-2')

  return (
    <>
      <BadgeProfileToggleSectionHeader
        title={section?.title ?? 'Alert Mode 2'}
        description={section?.description ?? ''}
        enabledField={ALERT_MODE_2_ENABLED_FIELD}
        enabled={alertModeEnabled}
        onEnabledChange={onEnabledChange}
      />

      <BadgeProfileConfigFieldGrid layout="two-column">
        <BadgeProfileSelectField
          id={ALERT_MODE_2_ACTIVATION_TYPE_FIELD.id}
          name={ALERT_MODE_2_ACTIVATION_TYPE_FIELD.id}
          label={ALERT_MODE_2_ACTIVATION_TYPE_FIELD.label}
          help={ALERT_MODE_2_ACTIVATION_TYPE_FIELD.help}
          value={values.Alert2ButtonSettingType}
          options={[...ALERT_MODE_2_ACTIVATION_TYPE_FIELD.options]}
          onChange={onTypeChange}
          disabled={!alertModeEnabled}
        />

        {ALERT_MODE_2_NUMERIC_FIELDS.map((field) => (
          <BadgeProfileNumericField
            key={field.name}
            id={field.name}
            name={field.name}
            label={field.label}
            help={field.help}
            value={values[field.name]}
            onChange={(value) => onNumericChange(field.name, value)}
            onBlur={() => onFieldBlur?.(field.name)}
            unit={field.unit}
            required={alertModeEnabled}
            disabled={!alertModeEnabled}
            error={errors?.[field.name]}
          />
        ))}
      </BadgeProfileConfigFieldGrid>
    </>
  )
}
