import type { AlertMode3SettingsValues } from '@/app/features/badge-profiles/badge-profile-configuration-types'
import {
  ALERT_MODE_3_NUMERIC_FIELDS,
  ALERT_MODE_3_VALIDATION_FIELD_NAMES,
} from '@/app/features/badge-profiles/alert-mode-3-settings-fields'
import {
  getVisibleValidationErrors,
  markAllFieldsTouched,
  validateIntegerRangeValue,
  type BadgeProfileValidationErrors,
} from '@/app/features/badge-profiles/badge-profile-numeric-validation'

export type AlertMode3SettingsValidationErrors =
  BadgeProfileValidationErrors<keyof AlertMode3SettingsValues>

function validateAlertMode3NumericFieldValue(
  field: (typeof ALERT_MODE_3_VALIDATION_FIELD_NAMES)[number],
  value: string,
): string | undefined {
  const fieldDefinition = ALERT_MODE_3_NUMERIC_FIELDS.find((item) => item.name === field)

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

function validateAlertMode3SettingsFieldValue(
  field: keyof AlertMode3SettingsValues,
  values: AlertMode3SettingsValues,
): string | undefined {
  if (!values.Alert3ButtonSettingEnabled) {
    return undefined
  }

  if (
    field === 'Alert3ButtonSettingButtonPress' ||
    field === 'Alert3ButtonSettingLED' ||
    field === 'Alert3ButtonSettingHaptic' ||
    field === 'Alert3ButtonSettingDuration'
  ) {
    return validateAlertMode3NumericFieldValue(field, values[field])
  }

  return undefined
}

export function validateAlertMode3Settings(
  values: AlertMode3SettingsValues,
): AlertMode3SettingsValidationErrors {
  const errors: AlertMode3SettingsValidationErrors = {}

  if (!values.Alert3ButtonSettingEnabled) {
    return errors
  }

  for (const field of ALERT_MODE_3_VALIDATION_FIELD_NAMES) {
    const error = validateAlertMode3NumericFieldValue(field, values[field])

    if (error) {
      errors[field] = error
    }
  }

  return errors
}

export function getVisibleAlertMode3SettingsErrors(
  values: AlertMode3SettingsValues,
  touchedFields: Partial<Record<keyof AlertMode3SettingsValues, boolean>>,
): AlertMode3SettingsValidationErrors {
  return getVisibleValidationErrors(
    values,
    touchedFields,
    ALERT_MODE_3_VALIDATION_FIELD_NAMES,
    (field) => validateAlertMode3SettingsFieldValue(field, values),
  )
}

export function createTouchedAlertMode3SettingsFields(): Partial<
  Record<keyof AlertMode3SettingsValues, boolean>
> {
  return markAllFieldsTouched(ALERT_MODE_3_VALIDATION_FIELD_NAMES)
}
