import type { BadgeProfileFieldHelp, BadgeProfileInputUnit } from '@/app/features/badge-profiles/badge-profile-field-types'
import type { BeaconSettingsValues } from '@/app/features/badge-profiles/badge-profile-configuration-types'

export const BEACON_INTERVAL_MIN = 1
export const BEACON_INTERVAL_MAX = 600

export type BeaconSettingsFieldDefinition = {
  name: keyof BeaconSettingsValues
  label: string
  min: number
  max: number
  unit: BadgeProfileInputUnit
  required: boolean
  help: BadgeProfileFieldHelp
}

export const BEACON_SETTINGS_FIELDS: BeaconSettingsFieldDefinition[] = [
  {
    name: 'Alert1BeaconInterval',
    label: 'Alert 1 Beacon Interval',
    min: BEACON_INTERVAL_MIN,
    max: BEACON_INTERVAL_MAX,
    unit: 'seconds',
    required: true,
    help: {
      title: 'Alert 1 Beacon Interval',
      variable: 'Alert1BeaconInterval',
      byteLength: '2 Bytes',
      description:
        'This parameter dictates the length of time (in seconds) between location beacon messages for a badge which has been activated in mode 1.',
      allowedRange: `${BEACON_INTERVAL_MIN}–${BEACON_INTERVAL_MAX} seconds`,
    },
  },
  {
    name: 'Alert2BeaconInterval',
    label: 'Alert 2 Beacon Interval',
    min: BEACON_INTERVAL_MIN,
    max: BEACON_INTERVAL_MAX,
    unit: 'seconds',
    required: true,
    help: {
      title: 'Alert 2 Beacon Interval',
      variable: 'Alert2BeaconInterval',
      byteLength: '2 Bytes',
      description:
        'This parameter dictates the length of time (in seconds) between location beacon messages for a badge which has been activated in mode 2.',
      allowedRange: `${BEACON_INTERVAL_MIN}–${BEACON_INTERVAL_MAX} seconds`,
    },
  },
  {
    name: 'Alert3BeaconInterval',
    label: 'Alert 3 Beacon Interval',
    min: BEACON_INTERVAL_MIN,
    max: BEACON_INTERVAL_MAX,
    unit: 'seconds',
    required: true,
    help: {
      title: 'Alert 3 Beacon Interval',
      variable: 'Alert3BeaconInterval',
      byteLength: '2 Bytes',
      description:
        'This parameter dictates the length of time (in seconds) between location beacon messages for a badge which has been activated in mode 3.',
      allowedRange: `${BEACON_INTERVAL_MIN}–${BEACON_INTERVAL_MAX} seconds`,
    },
  },
  {
    name: 'SecondaryBeaconInterval',
    label: 'Secondary Beacon Interval',
    min: BEACON_INTERVAL_MIN,
    max: BEACON_INTERVAL_MAX,
    unit: 'seconds',
    required: true,
    help: {
      title: 'Secondary Beacon Interval',
      variable: 'SecondaryBeaconInterval',
      byteLength: '2 Bytes',
      description:
        'This parameter dictates the length of time (in seconds) between location beacon messages for a badge which has not been activated but has been told to report its location periodically by the service.',
      allowedRange: `${BEACON_INTERVAL_MIN}–${BEACON_INTERVAL_MAX} seconds`,
    },
  },
]
