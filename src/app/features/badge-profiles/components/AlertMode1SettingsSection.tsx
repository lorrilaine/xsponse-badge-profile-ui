import type { AlertMode1SettingsValues } from '@/app/features/badge-profiles/badge-profile-configuration-types'
import {
  ALERT_MODE_1_ACTIVATION_TYPE_FIELD,
  ALERT_MODE_1_ENABLED_FIELD,
  ALERT_MODE_1_NUMERIC_FIELDS,
} from '@/app/features/badge-profiles/alert-mode-1-settings-fields'
import { BadgeProfileConfigFieldGrid } from '@/app/features/badge-profiles/components/BadgeProfileConfigFieldGrid'
import { BadgeProfileNumericField } from '@/app/features/badge-profiles/components/BadgeProfileNumericField'
import { BadgeProfileSelectField } from '@/app/features/badge-profiles/components/BadgeProfileSelectField'
import { BadgeProfileSwitchField } from '@/app/features/badge-profiles/components/BadgeProfileSwitchField'

type AlertMode1SettingsSectionProps = {
  values: AlertMode1SettingsValues
  onEnabledChange: (enabled: boolean) => void
  onTypeChange: (value: string) => void
  onNumericChange: (
    field:
      | 'Alert1ButtonSettingButtonPress'
      | 'Alert1ButtonSettingLED'
      | 'Alert1ButtonSettingHaptic'
      | 'Alert1ButtonSettingDuration',
    value: string,
  ) => void
  onFieldBlur?: (field: keyof AlertMode1SettingsValues) => void
  errors?: Partial<Record<keyof AlertMode1SettingsValues, string>>
}

export function AlertMode1SettingsSection({
  values,
  onEnabledChange,
  onTypeChange,
  onNumericChange,
  onFieldBlur,
  errors,
}: AlertMode1SettingsSectionProps) {
  const alertModeEnabled = values.Alert1ButtonSettingEnabled

  return (
    <BadgeProfileConfigFieldGrid layout="two-column">
      <BadgeProfileSwitchField
        id={ALERT_MODE_1_ENABLED_FIELD.id}
        name={ALERT_MODE_1_ENABLED_FIELD.id}
        label={ALERT_MODE_1_ENABLED_FIELD.label}
        help={ALERT_MODE_1_ENABLED_FIELD.help}
        checked={alertModeEnabled}
        onCheckedChange={onEnabledChange}
      />

      <BadgeProfileSelectField
        id={ALERT_MODE_1_ACTIVATION_TYPE_FIELD.id}
        name={ALERT_MODE_1_ACTIVATION_TYPE_FIELD.id}
        label={ALERT_MODE_1_ACTIVATION_TYPE_FIELD.label}
        help={ALERT_MODE_1_ACTIVATION_TYPE_FIELD.help}
        value={values.Alert1ButtonSettingType}
        options={[...ALERT_MODE_1_ACTIVATION_TYPE_FIELD.options]}
        onChange={onTypeChange}
        disabled={!alertModeEnabled}
      />

      {ALERT_MODE_1_NUMERIC_FIELDS.map((field) => (
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
  )
}
