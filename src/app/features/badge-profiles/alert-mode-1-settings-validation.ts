import type { AlertMode1SettingsValues } from '@/app/features/badge-profiles/badge-profile-configuration-types'
import {
  ALERT_MODE_1_NUMERIC_FIELDS,
  ALERT_MODE_1_VALIDATION_FIELD_NAMES,
} from '@/app/features/badge-profiles/alert-mode-1-settings-fields'
import {
  getVisibleValidationErrors,
  markAllFieldsTouched,
  validateIntegerRangeValue,
  type BadgeProfileValidationErrors,
} from '@/app/features/badge-profiles/badge-profile-numeric-validation'

export type AlertMode1SettingsValidationErrors =
  BadgeProfileValidationErrors<keyof AlertMode1SettingsValues>

function validateAlertMode1NumericFieldValue(
  field: (typeof ALERT_MODE_1_VALIDATION_FIELD_NAMES)[number],
  value: string,
): string | undefined {
  const fieldDefinition = ALERT_MODE_1_NUMERIC_FIELDS.find((item) => item.name === field)

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

function validateAlertMode1SettingsFieldValue(
  field: keyof AlertMode1SettingsValues,
  values: AlertMode1SettingsValues,
): string | undefined {
  if (!values.Alert1ButtonSettingEnabled) {
    return undefined
  }

  if (
    field === 'Alert1ButtonSettingButtonPress' ||
    field === 'Alert1ButtonSettingLED' ||
    field === 'Alert1ButtonSettingHaptic' ||
    field === 'Alert1ButtonSettingDuration'
  ) {
    return validateAlertMode1NumericFieldValue(field, values[field])
  }

  return undefined
}

export function validateAlertMode1Settings(
  values: AlertMode1SettingsValues,
): AlertMode1SettingsValidationErrors {
  const errors: AlertMode1SettingsValidationErrors = {}

  if (!values.Alert1ButtonSettingEnabled) {
    return errors
  }

  for (const field of ALERT_MODE_1_VALIDATION_FIELD_NAMES) {
    const error = validateAlertMode1NumericFieldValue(field, values[field])

    if (error) {
      errors[field] = error
    }
  }

  return errors
}

export function getVisibleAlertMode1SettingsErrors(
  values: AlertMode1SettingsValues,
  touchedFields: Partial<Record<keyof AlertMode1SettingsValues, boolean>>,
): AlertMode1SettingsValidationErrors {
  return getVisibleValidationErrors(
    values,
    touchedFields,
    ALERT_MODE_1_VALIDATION_FIELD_NAMES,
    (field) => validateAlertMode1SettingsFieldValue(field, values),
  )
}

export function createTouchedAlertMode1SettingsFields(): Partial<
  Record<keyof AlertMode1SettingsValues, boolean>
> {
  return markAllFieldsTouched(ALERT_MODE_1_VALIDATION_FIELD_NAMES)
}
