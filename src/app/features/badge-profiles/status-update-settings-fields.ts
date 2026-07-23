import type { BadgeProfileFieldHelp, BadgeProfileInputUnit } from '@/app/features/badge-profiles/badge-profile-field-types'
import type { StatusUpdateSettingsValues } from '@/app/features/badge-profiles/badge-profile-configuration-types'

export const STATUS_UPDATE_INTERVAL_MIN = 1
export const STATUS_UPDATE_INTERVAL_MAX = 604800

export const BATTERY_CHARGING_STATUS_INTERVAL_MIN = 1
export const BATTERY_CHARGING_STATUS_INTERVAL_MAX = 600

export type StatusUpdateSettingsFieldDefinition = {
  name: keyof StatusUpdateSettingsValues
  label: string
  min: number
  max: number
  unit: BadgeProfileInputUnit
  required: boolean
  help: BadgeProfileFieldHelp
}

export const STATUS_UPDATE_SETTINGS_FIELDS: StatusUpdateSettingsFieldDefinition[] = [
  {
    name: 'StatusUpdateInterval',
    label: 'Status Update Interval',
    min: STATUS_UPDATE_INTERVAL_MIN,
    max: STATUS_UPDATE_INTERVAL_MAX,
    unit: 'seconds',
    required: true,
    help: {
      title: 'Status Update Interval',
      variable: 'StatusUpdateInterval',
      byteLength: '3 Bytes',
      description:
        'Defines the interval (in seconds) between badge status update messages.',
      allowedRange: `${STATUS_UPDATE_INTERVAL_MIN}–${STATUS_UPDATE_INTERVAL_MAX} seconds`,
    },
  },
  {
    name: 'BatteryChargingStatusInterval',
    label: 'Battery Charging Status Interval',
    min: BATTERY_CHARGING_STATUS_INTERVAL_MIN,
    max: BATTERY_CHARGING_STATUS_INTERVAL_MAX,
    unit: 'seconds',
    required: true,
    help: {
      title: 'Battery Charging Status Interval',
      variable: 'BatteryChargingStatusInterval',
      byteLength: '2 Bytes',
      description:
        'Defines the interval (in seconds) between badge status update messages while the badge is charging.',
      allowedRange: `${BATTERY_CHARGING_STATUS_INTERVAL_MIN}–${BATTERY_CHARGING_STATUS_INTERVAL_MAX} seconds`,
    },
  },
]

export const STATUS_UPDATE_SETTINGS_FIELD_NAMES = STATUS_UPDATE_SETTINGS_FIELDS.map(
  (field) => field.name,
)
