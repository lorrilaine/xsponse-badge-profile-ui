import type { WakeupSettingsValues } from '@/app/features/badge-profiles/badge-profile-configuration-types'
import {
  getVisibleValidationErrors,
  markAllFieldsTouched,
  validateIntegerRangeValue,
  type BadgeProfileValidationErrors,
} from '@/app/features/badge-profiles/badge-profile-numeric-validation'
import {
  WAKEUP_SETTINGS_FIELDS,
  WAKEUP_SETTINGS_FIELD_NAMES,
} from '@/app/features/badge-profiles/wakeup-settings-fields'

export type WakeupSettingsValidationErrors =
  BadgeProfileValidationErrors<keyof WakeupSettingsValues>

function validateWakeupSettingsFieldValue(
  field: keyof WakeupSettingsValues,
  value: string,
): string | undefined {
  const fieldDefinition = WAKEUP_SETTINGS_FIELDS.find((item) => item.name === field)

  if (!fieldDefinition) {
    return undefined
  }

  return validateIntegerRangeValue(value, {
    label: fieldDefinition.label,
    min: fieldDefinition.min,
    max: fieldDefinition.max,
    required: fieldDefinition.required,
    unitLabel: fieldDefinition.unit,
  })
}

export function validateWakeupSettings(
  values: WakeupSettingsValues,
): WakeupSettingsValidationErrors {
  const errors: WakeupSettingsValidationErrors = {}

  for (const field of WAKEUP_SETTINGS_FIELDS) {
    const error = validateWakeupSettingsFieldValue(field.name, values[field.name])

    if (error) {
      errors[field.name] = error
    }
  }

  return errors
}

export function getVisibleWakeupSettingsErrors(
  values: WakeupSettingsValues,
  touchedFields: Partial<Record<keyof WakeupSettingsValues, boolean>>,
): WakeupSettingsValidationErrors {
  return getVisibleValidationErrors(
    values,
    touchedFields,
    WAKEUP_SETTINGS_FIELD_NAMES,
    validateWakeupSettingsFieldValue,
  )
}

export function createTouchedWakeupSettingsFields(): Record<
  keyof WakeupSettingsValues,
  boolean
> {
  return markAllFieldsTouched(WAKEUP_SETTINGS_FIELD_NAMES)
}
