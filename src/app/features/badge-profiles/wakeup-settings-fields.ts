import type { BadgeProfileFieldHelp, BadgeProfileInputUnit } from '@/app/features/badge-profiles/badge-profile-field-types'
import type { WakeupSettingsValues } from '@/app/features/badge-profiles/badge-profile-configuration-types'

export const WAKEUP_TIME_INTERVAL_MIN = 1
export const WAKEUP_TIME_INTERVAL_MAX = 60000

export const WAKEUP_TIME_MIN = 1
export const WAKEUP_TIME_MAX = 1000

export type WakeupSettingsFieldDefinition = {
  name: keyof WakeupSettingsValues
  label: string
  min: number
  max: number
  unit: BadgeProfileInputUnit
  required: boolean
  help: BadgeProfileFieldHelp
}

export const WAKEUP_SETTINGS_FIELDS: WakeupSettingsFieldDefinition[] = [
  {
    name: 'WakeupTimeInterval',
    label: 'Wakeup Time Interval',
    min: WAKEUP_TIME_INTERVAL_MIN,
    max: WAKEUP_TIME_INTERVAL_MAX,
    unit: 'milliseconds',
    required: true,
    help: {
      title: 'Wakeup Time Interval',
      variable: 'WakeupTimeInterval',
      byteLength: '3 Bytes',
      description:
        'This parameter dictates the length of time (in milliseconds) between when the badge checks to see if the X-Pulse network is sending it a message.',
      allowedRange: `${WAKEUP_TIME_INTERVAL_MIN}–${WAKEUP_TIME_INTERVAL_MAX} milliseconds`,
    },
  },
  {
    name: 'WakeupTime',
    label: 'Wakeup Time',
    min: WAKEUP_TIME_MIN,
    max: WAKEUP_TIME_MAX,
    unit: 'milliseconds',
    required: true,
    help: {
      title: 'Wakeup Time',
      variable: 'WakeupTime',
      byteLength: '2 Bytes',
      description:
        'This parameter dictates the amount of time (in milliseconds) that the badge remains awake while listening for a response from the X-Pulse network.',
      allowedRange: `${WAKEUP_TIME_MIN}–${WAKEUP_TIME_MAX} milliseconds`,
    },
  },
]

export const WAKEUP_SETTINGS_FIELD_NAMES = WAKEUP_SETTINGS_FIELDS.map(
  (field) => field.name,
)
