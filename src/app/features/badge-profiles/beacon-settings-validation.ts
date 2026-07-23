import type { BeaconSettingsValues } from '@/app/features/badge-profiles/badge-profile-configuration-types'
import {
  BEACON_INTERVAL_MAX,
  BEACON_INTERVAL_MIN,
  BEACON_SETTINGS_FIELDS,
} from '@/app/features/badge-profiles/beacon-settings-fields'
import {
  findFirstInvalidField,
  getVisibleValidationErrors,
  markAllFieldsTouched,
  validateIntegerRangeValue,
  type BadgeProfileValidationErrors,
} from '@/app/features/badge-profiles/badge-profile-numeric-validation'

export { BEACON_INTERVAL_MAX, BEACON_INTERVAL_MIN }

export const BEACON_SETTINGS_FIELD_NAMES = BEACON_SETTINGS_FIELDS.map(
  (field) => field.name,
)

export type BeaconSettingsValidationErrors =
  BadgeProfileValidationErrors<keyof BeaconSettingsValues>

function validateBeaconSettingsFieldValue(
  field: keyof BeaconSettingsValues,
  value: string,
): string | undefined {
  const fieldDefinition = BEACON_SETTINGS_FIELDS.find((item) => item.name === field)

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

export function validateBeaconSettings(
  values: BeaconSettingsValues,
): BeaconSettingsValidationErrors {
  const errors: BeaconSettingsValidationErrors = {}

  for (const field of BEACON_SETTINGS_FIELDS) {
    const error = validateBeaconSettingsFieldValue(field.name, values[field.name])

    if (error) {
      errors[field.name] = error
    }
  }

  return errors
}

export function getVisibleBeaconSettingsErrors(
  values: BeaconSettingsValues,
  touchedFields: Partial<Record<keyof BeaconSettingsValues, boolean>>,
): BeaconSettingsValidationErrors {
  return getVisibleValidationErrors(
    values,
    touchedFields,
    BEACON_SETTINGS_FIELD_NAMES,
    validateBeaconSettingsFieldValue,
  )
}

export function createTouchedBeaconSettingsFields(): Record<
  keyof BeaconSettingsValues,
  boolean
> {
  return markAllFieldsTouched(BEACON_SETTINGS_FIELD_NAMES)
}

export function findFirstInvalidBeaconSettingsField(
  errors: BeaconSettingsValidationErrors,
): keyof BeaconSettingsValues | undefined {
  return findFirstInvalidField(errors, BEACON_SETTINGS_FIELD_NAMES)
}
