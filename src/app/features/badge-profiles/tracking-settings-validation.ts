import type { TrackingSettingsValues } from '@/app/features/badge-profiles/badge-profile-configuration-types'
import {
  findFirstInvalidField,
  markAllFieldsTouched,
  validateIntegerRangeValue,
  type BadgeProfileValidationErrors,
} from '@/app/features/badge-profiles/badge-profile-numeric-validation'
import {
  TRACKING_INTERVAL_FIELD,
  TRACKING_SETTINGS_VALIDATION_FIELD_NAMES,
} from '@/app/features/badge-profiles/tracking-settings-fields'

export type TrackingSettingsValidationErrors =
  BadgeProfileValidationErrors<keyof TrackingSettingsValues>

function validateTrackingIntervalValue(
  values: TrackingSettingsValues,
): string | undefined {
  if (!values.TrackingStatus) {
    return undefined
  }

  return validateIntegerRangeValue(values.TrackingInterval, {
    label: TRACKING_INTERVAL_FIELD.label,
    min: TRACKING_INTERVAL_FIELD.min,
    max: TRACKING_INTERVAL_FIELD.max,
    required: true,
    unitLabel: TRACKING_INTERVAL_FIELD.unit,
  })
}

export function validateTrackingSettings(
  values: TrackingSettingsValues,
): TrackingSettingsValidationErrors {
  const error = validateTrackingIntervalValue(values)

  if (!error) {
    return {}
  }

  return {
    TrackingInterval: error,
  }
}

export function getVisibleTrackingSettingsErrors(
  values: TrackingSettingsValues,
  touchedFields: Partial<Record<keyof TrackingSettingsValues, boolean>>,
): TrackingSettingsValidationErrors {
  const visibleErrors: TrackingSettingsValidationErrors = {}

  if (!touchedFields.TrackingInterval) {
    return visibleErrors
  }

  const error = validateTrackingIntervalValue(values)

  if (error) {
    visibleErrors.TrackingInterval = error
  }

  return visibleErrors
}

export function createTouchedTrackingSettingsFields(): Partial<
  Record<keyof TrackingSettingsValues, boolean>
> {
  return markAllFieldsTouched(TRACKING_SETTINGS_VALIDATION_FIELD_NAMES)
}

export function findFirstInvalidTrackingSettingsField(
  errors: TrackingSettingsValidationErrors,
): keyof TrackingSettingsValues | undefined {
  return findFirstInvalidField(errors, TRACKING_SETTINGS_VALIDATION_FIELD_NAMES)
}
