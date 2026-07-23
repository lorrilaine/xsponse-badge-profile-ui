import type { BadgeProfileFieldHelp, BadgeProfileInputUnit } from '@/app/features/badge-profiles/badge-profile-field-types'
import type { BeaconSettingsValues } from '@/app/features/badge-profiles/badge-profile-configuration-types'

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
    min: 1,
    max: 600,
    unit: 'seconds',
    required: true,
    help: {
      title: 'Alert 1 Beacon Interval',
      variable: 'Alert1BeaconInterval',
      byteLength: '2 Bytes',
      description:
        'Defines the interval (in seconds) between location beacon messages when Alert Mode 1 is active.',
      allowedRange: '1–600 seconds',
    },
  },
  {
    name: 'Alert2BeaconInterval',
    label: 'Alert 2 Beacon Interval',
    min: 1,
    max: 600,
    unit: 'seconds',
    required: true,
    help: {
      title: 'Alert 2 Beacon Interval',
      variable: 'Alert2BeaconInterval',
      byteLength: '2 Bytes',
      description:
        'Defines the interval (in seconds) between location beacon messages when Alert Mode 2 is active.',
      allowedRange: '1–600 seconds',
    },
  },
  {
    name: 'Alert3BeaconInterval',
    label: 'Alert 3 Beacon Interval',
    min: 1,
    max: 600,
    unit: 'seconds',
    required: true,
    help: {
      title: 'Alert 3 Beacon Interval',
      variable: 'Alert3BeaconInterval',
      byteLength: '2 Bytes',
      description:
        'Defines the interval (in seconds) between location beacon messages when Alert Mode 3 is active.',
      allowedRange: '1–600 seconds',
    },
  },
  {
    name: 'SecondaryBeaconInterval',
    label: 'Secondary Beacon Interval',
    min: 1,
    max: 600,
    unit: 'seconds',
    required: true,
    help: {
      title: 'Secondary Beacon Interval',
      variable: 'SecondaryBeaconInterval',
      byteLength: '2 Bytes',
      description:
        'Defines the interval (in seconds) between periodic location beacon messages when the badge is not in an alert state but has been instructed to report its location.',
      allowedRange: '1–600 seconds',
    },
  },
]
