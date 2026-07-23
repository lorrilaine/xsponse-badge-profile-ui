import type { ClearButtonSettingsValues } from '@/app/features/badge-profiles/badge-profile-configuration-types'
import {
  CLEAR_BUTTON_NUMERIC_FIELDS,
  CLEAR_BUTTON_VALIDATION_FIELD_NAMES,
} from '@/app/features/badge-profiles/clear-button-settings-fields'
import {
  getVisibleValidationErrors,
  markAllFieldsTouched,
  validateIntegerRangeValue,
  type BadgeProfileValidationErrors,
} from '@/app/features/badge-profiles/badge-profile-numeric-validation'

export type ClearButtonSettingsValidationErrors =
  BadgeProfileValidationErrors<keyof ClearButtonSettingsValues>

function validateClearButtonNumericFieldValue(
  field: (typeof CLEAR_BUTTON_VALIDATION_FIELD_NAMES)[number],
  value: string,
): string | undefined {
  const fieldDefinition = CLEAR_BUTTON_NUMERIC_FIELDS.find((item) => item.name === field)

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

function validateClearButtonSettingsFieldValue(
  field: keyof ClearButtonSettingsValues,
  values: ClearButtonSettingsValues,
): string | undefined {
  if (!values.ClearButtonSettingEnabled) {
    return undefined
  }

  if (
    field === 'ClearButtonSettingButtonPress' ||
    field === 'ClearButtonSettingLED' ||
    field === 'ClearButtonSettingHaptic'
  ) {
    return validateClearButtonNumericFieldValue(field, values[field])
  }

  return undefined
}

export function validateClearButtonSettings(
  values: ClearButtonSettingsValues,
): ClearButtonSettingsValidationErrors {
  const errors: ClearButtonSettingsValidationErrors = {}

  if (!values.ClearButtonSettingEnabled) {
    return errors
  }

  for (const field of CLEAR_BUTTON_VALIDATION_FIELD_NAMES) {
    const error = validateClearButtonNumericFieldValue(field, values[field])

    if (error) {
      errors[field] = error
    }
  }

  return errors
}

export function getVisibleClearButtonSettingsErrors(
  values: ClearButtonSettingsValues,
  touchedFields: Partial<Record<keyof ClearButtonSettingsValues, boolean>>,
): ClearButtonSettingsValidationErrors {
  return getVisibleValidationErrors(
    values,
    touchedFields,
    CLEAR_BUTTON_VALIDATION_FIELD_NAMES,
    (field) => validateClearButtonSettingsFieldValue(field, values),
  )
}

export function createTouchedClearButtonSettingsFields(): Partial<
  Record<keyof ClearButtonSettingsValues, boolean>
> {
  return markAllFieldsTouched(CLEAR_BUTTON_VALIDATION_FIELD_NAMES)
}
