import type { AlertMode2SettingsValues } from '@/app/features/badge-profiles/badge-profile-configuration-types'
import {
  ALERT_MODE_2_NUMERIC_FIELDS,
  ALERT_MODE_2_VALIDATION_FIELD_NAMES,
} from '@/app/features/badge-profiles/alert-mode-2-settings-fields'
import {
  getVisibleValidationErrors,
  markAllFieldsTouched,
  validateIntegerRangeValue,
  type BadgeProfileValidationErrors,
} from '@/app/features/badge-profiles/badge-profile-numeric-validation'

export type AlertMode2SettingsValidationErrors =
  BadgeProfileValidationErrors<keyof AlertMode2SettingsValues>

function validateAlertMode2NumericFieldValue(
  field: (typeof ALERT_MODE_2_VALIDATION_FIELD_NAMES)[number],
  value: string,
): string | undefined {
  const fieldDefinition = ALERT_MODE_2_NUMERIC_FIELDS.find((item) => item.name === field)

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

function validateAlertMode2SettingsFieldValue(
  field: keyof AlertMode2SettingsValues,
  values: AlertMode2SettingsValues,
): string | undefined {
  if (!values.Alert2ButtonSettingEnabled) {
    return undefined
  }

  if (
    field === 'Alert2ButtonSettingButtonPress' ||
    field === 'Alert2ButtonSettingLED' ||
    field === 'Alert2ButtonSettingHaptic' ||
    field === 'Alert2ButtonSettingDuration'
  ) {
    return validateAlertMode2NumericFieldValue(field, values[field])
  }

  return undefined
}

export function validateAlertMode2Settings(
  values: AlertMode2SettingsValues,
): AlertMode2SettingsValidationErrors {
  const errors: AlertMode2SettingsValidationErrors = {}

  if (!values.Alert2ButtonSettingEnabled) {
    return errors
  }

  for (const field of ALERT_MODE_2_VALIDATION_FIELD_NAMES) {
    const error = validateAlertMode2NumericFieldValue(field, values[field])

    if (error) {
      errors[field] = error
    }
  }

  return errors
}

export function getVisibleAlertMode2SettingsErrors(
  values: AlertMode2SettingsValues,
  touchedFields: Partial<Record<keyof AlertMode2SettingsValues, boolean>>,
): AlertMode2SettingsValidationErrors {
  return getVisibleValidationErrors(
    values,
    touchedFields,
    ALERT_MODE_2_VALIDATION_FIELD_NAMES,
    (field) => validateAlertMode2SettingsFieldValue(field, values),
  )
}

export function createTouchedAlertMode2SettingsFields(): Partial<
  Record<keyof AlertMode2SettingsValues, boolean>
> {
  return markAllFieldsTouched(ALERT_MODE_2_VALIDATION_FIELD_NAMES)
}
