import type { BadgeProfileFieldHelp } from '@/app/features/badge-profiles/badge-profile-field-types'

export const TRACKING_INTERVAL_MIN = 1
export const TRACKING_INTERVAL_MAX = 600

export const TRACKING_ENABLED_FIELD = {
  id: 'TrackingStatus',
  label: 'Tracking Enabled',
  help: {
    title: 'Tracking Enabled',
    variable: 'TrackingStatus',
    byteLength: '1 Byte',
    description:
      'A flag to indicate whether or not the badge needs to always send its location.',
    allowedValues: 'OFF (0)\nON (1)',
  } satisfies BadgeProfileFieldHelp,
} as const

export const TRACKING_INTERVAL_FIELD = {
  id: 'TrackingInterval',
  label: 'Tracking Interval',
  min: TRACKING_INTERVAL_MIN,
  max: TRACKING_INTERVAL_MAX,
  unit: 'seconds' as const,
  help: {
    title: 'Tracking Interval',
    variable: 'TrackingInterval',
    byteLength: '2 Bytes',
    description:
      'This parameter dictates the length of time (in seconds) between location beacon messages for a badge which has TrackingStatus = 1.',
    allowedRange: `${TRACKING_INTERVAL_MIN}–${TRACKING_INTERVAL_MAX} seconds`,
  } satisfies BadgeProfileFieldHelp,
} as const

export const TRACKING_SETTINGS_VALIDATION_FIELD_NAMES = [
  TRACKING_INTERVAL_FIELD.id,
] as const
