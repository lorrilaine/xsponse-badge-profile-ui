import type { StatusUpdateSettingsValues } from '@/app/features/badge-profiles/badge-profile-configuration-types'
import {
  getVisibleValidationErrors,
  markAllFieldsTouched,
  validateIntegerRangeValue,
  type BadgeProfileValidationErrors,
} from '@/app/features/badge-profiles/badge-profile-numeric-validation'
import {
  STATUS_UPDATE_SETTINGS_FIELDS,
  STATUS_UPDATE_SETTINGS_FIELD_NAMES,
} from '@/app/features/badge-profiles/status-update-settings-fields'

export type StatusUpdateSettingsValidationErrors =
  BadgeProfileValidationErrors<keyof StatusUpdateSettingsValues>

function validateStatusUpdateSettingsFieldValue(
  field: keyof StatusUpdateSettingsValues,
  value: string,
): string | undefined {
  const fieldDefinition = STATUS_UPDATE_SETTINGS_FIELDS.find(
    (item) => item.name === field,
  )

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

export function validateStatusUpdateSettings(
  values: StatusUpdateSettingsValues,
): StatusUpdateSettingsValidationErrors {
  const errors: StatusUpdateSettingsValidationErrors = {}

  for (const field of STATUS_UPDATE_SETTINGS_FIELDS) {
    const error = validateStatusUpdateSettingsFieldValue(field.name, values[field.name])

    if (error) {
      errors[field.name] = error
    }
  }

  return errors
}

export function getVisibleStatusUpdateSettingsErrors(
  values: StatusUpdateSettingsValues,
  touchedFields: Partial<Record<keyof StatusUpdateSettingsValues, boolean>>,
): StatusUpdateSettingsValidationErrors {
  return getVisibleValidationErrors(
    values,
    touchedFields,
    STATUS_UPDATE_SETTINGS_FIELD_NAMES,
    validateStatusUpdateSettingsFieldValue,
  )
}

export function createTouchedStatusUpdateSettingsFields(): Record<
  keyof StatusUpdateSettingsValues,
  boolean
> {
  return markAllFieldsTouched(STATUS_UPDATE_SETTINGS_FIELD_NAMES)
}
