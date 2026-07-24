import type { ClearButtonSettingsValues } from '@/app/features/badge-profiles/badge-profile-configuration-types'
import {
  CLEAR_BUTTON_ACTIVATION_TYPE_FIELD,
  CLEAR_BUTTON_ENABLED_FIELD,
  CLEAR_BUTTON_NUMERIC_FIELDS,
} from '@/app/features/badge-profiles/clear-button-settings-fields'
import { getBadgeConfigurationSection } from '@/app/features/badge-profiles/badge-profile-form-sections'
import { BadgeProfileConfigFieldGrid } from '@/app/features/badge-profiles/components/BadgeProfileConfigFieldGrid'
import { BadgeProfileNumericField } from '@/app/features/badge-profiles/components/BadgeProfileNumericField'
import { BadgeProfileSelectField } from '@/app/features/badge-profiles/components/BadgeProfileSelectField'
import { BadgeProfileToggleSectionHeader } from '@/app/features/badge-profiles/components/BadgeProfileToggleSectionHeader'

type ClearButtonSettingsSectionProps = {
  values: ClearButtonSettingsValues
  onEnabledChange: (enabled: boolean) => void
  onTypeChange: (value: string) => void
  onNumericChange: (
    field:
      | 'ClearButtonSettingButtonPress'
      | 'ClearButtonSettingLED'
      | 'ClearButtonSettingHaptic',
    value: string,
  ) => void
  onFieldBlur?: (field: keyof ClearButtonSettingsValues) => void
  errors?: Partial<Record<keyof ClearButtonSettingsValues, string>>
}

export function ClearButtonSettingsSection({
  values,
  onEnabledChange,
  onTypeChange,
  onNumericChange,
  onFieldBlur,
  errors,
}: ClearButtonSettingsSectionProps) {
  const clearButtonEnabled = values.ClearButtonSettingEnabled
  const section = getBadgeConfigurationSection('clear-button')

  return (
    <>
      <BadgeProfileToggleSectionHeader
        title={section?.title ?? 'Clear Button Settings'}
        description={section?.description ?? ''}
        enabledField={CLEAR_BUTTON_ENABLED_FIELD}
        enabled={clearButtonEnabled}
        onEnabledChange={onEnabledChange}
      />

      <BadgeProfileConfigFieldGrid layout="two-column">
        <BadgeProfileSelectField
          id={CLEAR_BUTTON_ACTIVATION_TYPE_FIELD.id}
          name={CLEAR_BUTTON_ACTIVATION_TYPE_FIELD.id}
          label={CLEAR_BUTTON_ACTIVATION_TYPE_FIELD.label}
          help={CLEAR_BUTTON_ACTIVATION_TYPE_FIELD.help}
          value={values.ClearButtonSettingType}
          options={[...CLEAR_BUTTON_ACTIVATION_TYPE_FIELD.options]}
          onChange={onTypeChange}
          disabled={!clearButtonEnabled}
        />

        {CLEAR_BUTTON_NUMERIC_FIELDS.map((field) => (
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
            required={clearButtonEnabled}
            disabled={!clearButtonEnabled}
            error={errors?.[field.name]}
          />
        ))}
      </BadgeProfileConfigFieldGrid>
    </>
  )
}
