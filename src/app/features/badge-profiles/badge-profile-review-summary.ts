import type {
  AlertMode1SettingsValues,
  AlertMode2SettingsValues,
  AlertMode3SettingsValues,
  BeaconSettingsValues,
  ClearButtonSettingsValues,
  StatusUpdateSettingsValues,
  TrackingSettingsValues,
  WakeupSettingsValues,
} from '@/app/features/badge-profiles/badge-profile-configuration-types'
import {
  ALERT_MODE_1_ACTIVATION_TYPE_FIELD,
  ALERT_MODE_1_NUMERIC_FIELDS,
} from '@/app/features/badge-profiles/alert-mode-1-settings-fields'
import {
  ALERT_MODE_2_ACTIVATION_TYPE_FIELD,
  ALERT_MODE_2_NUMERIC_FIELDS,
} from '@/app/features/badge-profiles/alert-mode-2-settings-fields'
import {
  ALERT_MODE_3_ACTIVATION_TYPE_FIELD,
  ALERT_MODE_3_NUMERIC_FIELDS,
} from '@/app/features/badge-profiles/alert-mode-3-settings-fields'
import { BEACON_SETTINGS_FIELDS } from '@/app/features/badge-profiles/beacon-settings-fields'
import {
  CLEAR_BUTTON_ACTIVATION_TYPE_FIELD,
  CLEAR_BUTTON_NUMERIC_FIELDS,
} from '@/app/features/badge-profiles/clear-button-settings-fields'
import { BADGE_GROUP_SELECT_OPTIONS } from '@/app/features/badge-profiles/badge-profile-form-sections'
import type { BadgeProfileInputUnit } from '@/app/features/badge-profiles/badge-profile-field-types'
import type { BadgeProfileStatus } from '@/app/features/badge-profiles/badge-profile-mock-data'
import { STATUS_UPDATE_SETTINGS_FIELDS } from '@/app/features/badge-profiles/status-update-settings-fields'
import {
  TRACKING_ENABLED_FIELD,
  TRACKING_INTERVAL_FIELD,
} from '@/app/features/badge-profiles/tracking-settings-fields'
import { WAKEUP_SETTINGS_FIELDS } from '@/app/features/badge-profiles/wakeup-settings-fields'
import { validateAlertMode1Settings } from '@/app/features/badge-profiles/alert-mode-1-settings-validation'
import { validateAlertMode2Settings } from '@/app/features/badge-profiles/alert-mode-2-settings-validation'
import { validateAlertMode3Settings } from '@/app/features/badge-profiles/alert-mode-3-settings-validation'
import { validateBeaconSettings } from '@/app/features/badge-profiles/beacon-settings-validation'
import { validateClearButtonSettings } from '@/app/features/badge-profiles/clear-button-settings-validation'
import { validateStatusUpdateSettings } from '@/app/features/badge-profiles/status-update-settings-validation'
import { validateTrackingSettings } from '@/app/features/badge-profiles/tracking-settings-validation'
import { validateWakeupSettings } from '@/app/features/badge-profiles/wakeup-settings-validation'

export type BadgeProfileReviewSummarySectionStatus =
  | 'configured'
  | 'partially-configured'
  | 'disabled'
  | 'not-configured'

export type BadgeProfileReviewSummaryField = {
  label: string
  value: string
}

export type BadgeProfileReviewSummarySection = {
  title: string
  status: BadgeProfileReviewSummarySectionStatus
  disabled?: boolean
  fields?: BadgeProfileReviewSummaryField[]
}

export type BadgeProfileReviewSummaryInput = {
  profileName: string
  badgeGroupId: string
  description: string
  status: BadgeProfileStatus
  badgeProfileId: string
  beaconSettings: BeaconSettingsValues
  trackingSettings: TrackingSettingsValues
  statusUpdateSettings: StatusUpdateSettingsValues
  wakeupSettings: WakeupSettingsValues
  alertMode1Settings: AlertMode1SettingsValues
  alertMode2Settings: AlertMode2SettingsValues
  alertMode3Settings: AlertMode3SettingsValues
  clearButtonSettings: ClearButtonSettingsValues
}

const EMPTY_VALUE = '—'

function hasAnyNonEmptyStringValue(values: Record<string, string>): boolean {
  return Object.values(values).some((value) => value.trim().length > 0)
}

function areAllStringFieldsFilled(
  values: Record<string, string>,
  fieldNames: readonly string[],
): boolean {
  return fieldNames.every((fieldName) => values[fieldName]?.trim().length > 0)
}

function hasValidationErrors(errors: Record<string, string | undefined>): boolean {
  return Object.values(errors).some(Boolean)
}

function resolveGeneralInformationStatus(
  input: BadgeProfileReviewSummaryInput,
): BadgeProfileReviewSummarySectionStatus {
  const hasProfileName = input.profileName.trim().length > 0
  const hasBadgeGroup = input.badgeGroupId.trim().length > 0
  const hasDescription = input.description.trim().length > 0

  if (!hasProfileName && !hasBadgeGroup && !hasDescription) {
    return 'not-configured'
  }

  if (hasProfileName && hasBadgeGroup) {
    return 'configured'
  }

  return 'partially-configured'
}

function resolveNumericSectionStatus<T extends Record<string, string>>(
  values: T,
  fieldNames: readonly (keyof T & string)[],
  validate: (values: T) => Record<string, string | undefined>,
): BadgeProfileReviewSummarySectionStatus {
  const stringValues = Object.fromEntries(
    fieldNames.map((fieldName) => [fieldName, values[fieldName]]),
  ) as Record<string, string>

  if (!hasAnyNonEmptyStringValue(stringValues)) {
    return 'not-configured'
  }

  const errors = validate(values)

  if (!hasValidationErrors(errors) && areAllStringFieldsFilled(stringValues, fieldNames)) {
    return 'configured'
  }

  return 'partially-configured'
}

function resolveTrackingSectionStatus(
  trackingSettings: TrackingSettingsValues,
): BadgeProfileReviewSummarySectionStatus {
  if (!trackingSettings.TrackingStatus) {
    return 'disabled'
  }

  const intervalValues = {
    TrackingInterval: trackingSettings.TrackingInterval,
  }

  if (!hasAnyNonEmptyStringValue(intervalValues)) {
    return 'partially-configured'
  }

  const errors = validateTrackingSettings(trackingSettings)

  if (!hasValidationErrors(errors) && areAllStringFieldsFilled(intervalValues, ['TrackingInterval'])) {
    return 'configured'
  }

  return 'partially-configured'
}

function resolveToggleSectionStatus<T extends Record<string, string | boolean>>(
  enabled: boolean,
  values: T,
  fieldNames: readonly (keyof T & string)[],
  validate: (values: T) => Record<string, string | undefined>,
): BadgeProfileReviewSummarySectionStatus {
  if (!enabled) {
    return 'disabled'
  }

  const stringValues = Object.fromEntries(
    fieldNames.map((fieldName) => [fieldName, String(values[fieldName] ?? '')]),
  ) as Record<string, string>

  const errors = validate(values)
  const hasValues = hasAnyNonEmptyStringValue(stringValues)

  if (!hasValues) {
    return 'partially-configured'
  }

  if (!hasValidationErrors(errors) && areAllStringFieldsFilled(stringValues, fieldNames)) {
    return 'configured'
  }

  return 'partially-configured'
}

function formatDisplayValue(value: string, unit?: BadgeProfileInputUnit): string {
  const trimmedValue = value.trim()

  if (trimmedValue.length === 0) {
    return EMPTY_VALUE
  }

  if (!unit) {
    return trimmedValue
  }

  return `${trimmedValue} ${unit}`
}

function formatSelectValue(
  value: string,
  options: ReadonlyArray<{ value: string; label: string }>,
): string {
  const option = options.find((item) => item.value === value)

  return option?.label ?? (value.trim().length > 0 ? value : EMPTY_VALUE)
}

function getBadgeGroupLabel(badgeGroupId: string): string {
  if (badgeGroupId.trim().length === 0) {
    return EMPTY_VALUE
  }

  const option = BADGE_GROUP_SELECT_OPTIONS.find((item) => item.value === badgeGroupId)

  return option?.label ?? badgeGroupId
}

function buildNumericSectionFields<
  T extends Record<string, string>,
  K extends keyof T & string,
>(
  values: T,
  fields: ReadonlyArray<{ name: K; label: string; unit: BadgeProfileInputUnit }>,
): BadgeProfileReviewSummaryField[] {
  return fields.map((field) => ({
    label: field.label,
    value: formatDisplayValue(values[field.name], field.unit),
  }))
}

function buildAlertModeSectionFields(
  enabled: boolean,
  activationTypeField: {
    label: string
    options: ReadonlyArray<{ value: string; label: string }>
  },
  activationTypeValue: string,
  numericFields: ReadonlyArray<{
    name: string
    label: string
    unit: BadgeProfileInputUnit
  }>,
  getNumericValue: (name: string) => string,
): Pick<BadgeProfileReviewSummarySection, 'title' | 'disabled' | 'fields'> {
  if (!enabled) {
    return {
      title: '',
      disabled: true,
      fields: undefined,
    }
  }

  return {
    title: '',
    fields: [
      {
        label: 'Enabled',
        value: 'Enabled',
      },
      {
        label: activationTypeField.label,
        value: formatSelectValue(activationTypeValue, activationTypeField.options),
      },
      ...numericFields.map((field) => ({
        label: field.label,
        value: formatDisplayValue(getNumericValue(field.name), field.unit),
      })),
    ],
  }
}

export function buildBadgeProfileReviewSummary(
  input: BadgeProfileReviewSummaryInput,
): BadgeProfileReviewSummarySection[] {
  const trackingEnabled = input.trackingSettings.TrackingStatus
  const alertMode1Enabled = input.alertMode1Settings.Alert1ButtonSettingEnabled
  const alertMode2Enabled = input.alertMode2Settings.Alert2ButtonSettingEnabled
  const alertMode3Enabled = input.alertMode3Settings.Alert3ButtonSettingEnabled
  const clearButtonEnabled = input.clearButtonSettings.ClearButtonSettingEnabled

  const alertMode1Section = buildAlertModeSectionFields(
    alertMode1Enabled,
    ALERT_MODE_1_ACTIVATION_TYPE_FIELD,
    input.alertMode1Settings.Alert1ButtonSettingType,
    ALERT_MODE_1_NUMERIC_FIELDS,
    (name) => input.alertMode1Settings[name as keyof AlertMode1SettingsValues] as string,
  )

  const alertMode2Section = buildAlertModeSectionFields(
    alertMode2Enabled,
    ALERT_MODE_2_ACTIVATION_TYPE_FIELD,
    input.alertMode2Settings.Alert2ButtonSettingType,
    ALERT_MODE_2_NUMERIC_FIELDS,
    (name) => input.alertMode2Settings[name as keyof AlertMode2SettingsValues] as string,
  )

  const alertMode3Section = buildAlertModeSectionFields(
    alertMode3Enabled,
    ALERT_MODE_3_ACTIVATION_TYPE_FIELD,
    input.alertMode3Settings.Alert3ButtonSettingType,
    ALERT_MODE_3_NUMERIC_FIELDS,
    (name) => input.alertMode3Settings[name as keyof AlertMode3SettingsValues] as string,
  )

  return [
    {
      title: 'General Information',
      status: resolveGeneralInformationStatus(input),
      fields: [
        {
          label: 'Profile Name',
          value: formatDisplayValue(input.profileName),
        },
        {
          label: 'Badge Group',
          value: getBadgeGroupLabel(input.badgeGroupId),
        },
        {
          label: 'Status',
          value: input.status,
        },
        {
          label: 'Badge Profile ID',
          value:
            input.badgeProfileId.trim().length > 0
              ? input.badgeProfileId
              : 'Automatically generated after saving',
        },
        {
          label: 'Description',
          value: formatDisplayValue(input.description),
        },
      ],
    },
    {
      title: 'Beacon Settings',
      status: resolveNumericSectionStatus(
        input.beaconSettings,
        BEACON_SETTINGS_FIELDS.map((field) => field.name),
        validateBeaconSettings,
      ),
      fields: buildNumericSectionFields(input.beaconSettings, BEACON_SETTINGS_FIELDS),
    },
    {
      title: 'Tracking Settings',
      status: resolveTrackingSectionStatus(input.trackingSettings),
      disabled: !trackingEnabled,
      fields: trackingEnabled
        ? [
            {
              label: TRACKING_ENABLED_FIELD.label,
              value: 'Enabled',
            },
            {
              label: TRACKING_INTERVAL_FIELD.label,
              value: formatDisplayValue(
                input.trackingSettings.TrackingInterval,
                TRACKING_INTERVAL_FIELD.unit,
              ),
            },
          ]
        : undefined,
    },
    {
      title: 'Status Update Settings',
      status: resolveNumericSectionStatus(
        input.statusUpdateSettings,
        STATUS_UPDATE_SETTINGS_FIELDS.map((field) => field.name),
        validateStatusUpdateSettings,
      ),
      fields: buildNumericSectionFields(
        input.statusUpdateSettings,
        STATUS_UPDATE_SETTINGS_FIELDS,
      ),
    },
    {
      title: 'Wakeup Settings',
      status: resolveNumericSectionStatus(
        input.wakeupSettings,
        WAKEUP_SETTINGS_FIELDS.map((field) => field.name),
        validateWakeupSettings,
      ),
      fields: buildNumericSectionFields(input.wakeupSettings, WAKEUP_SETTINGS_FIELDS),
    },
    {
      title: 'Alert Mode 1',
      status: resolveToggleSectionStatus(
        alertMode1Enabled,
        input.alertMode1Settings,
        ALERT_MODE_1_NUMERIC_FIELDS.map((field) => field.name),
        validateAlertMode1Settings,
      ),
      disabled: alertMode1Section.disabled,
      fields: alertMode1Section.fields,
    },
    {
      title: 'Alert Mode 2',
      status: resolveToggleSectionStatus(
        alertMode2Enabled,
        input.alertMode2Settings,
        ALERT_MODE_2_NUMERIC_FIELDS.map((field) => field.name),
        validateAlertMode2Settings,
      ),
      disabled: alertMode2Section.disabled,
      fields: alertMode2Section.fields,
    },
    {
      title: 'Alert Mode 3',
      status: resolveToggleSectionStatus(
        alertMode3Enabled,
        input.alertMode3Settings,
        ALERT_MODE_3_NUMERIC_FIELDS.map((field) => field.name),
        validateAlertMode3Settings,
      ),
      disabled: alertMode3Section.disabled,
      fields: alertMode3Section.fields,
    },
    {
      title: 'Clear Button Settings',
      status: resolveToggleSectionStatus(
        clearButtonEnabled,
        input.clearButtonSettings,
        CLEAR_BUTTON_NUMERIC_FIELDS.map((field) => field.name),
        validateClearButtonSettings,
      ),
      disabled: !clearButtonEnabled,
      fields: clearButtonEnabled
        ? [
            {
              label: 'Enabled',
              value: 'Enabled',
            },
            {
              label: CLEAR_BUTTON_ACTIVATION_TYPE_FIELD.label,
              value: formatSelectValue(
                input.clearButtonSettings.ClearButtonSettingType,
                CLEAR_BUTTON_ACTIVATION_TYPE_FIELD.options,
              ),
            },
            ...CLEAR_BUTTON_NUMERIC_FIELDS.map((field) => ({
              label: field.label,
              value: formatDisplayValue(
                input.clearButtonSettings[field.name],
                field.unit,
              ),
            })),
          ]
        : undefined,
    },
  ]
}
