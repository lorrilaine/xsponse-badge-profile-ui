import type { BadgeProfileFieldHelp, BadgeProfileInputUnit } from '@/app/features/badge-profiles/badge-profile-field-types'
import type { AlertMode1SettingsValues } from '@/app/features/badge-profiles/badge-profile-configuration-types'

export const ALERT_MODE_1_BUTTON_PRESS_MIN = 1
export const ALERT_MODE_1_BUTTON_PRESS_MAX = 10

export const ALERT_MODE_1_LED_MIN = 0
export const ALERT_MODE_1_LED_MAX = 10

export const ALERT_MODE_1_HAPTIC_MIN = 0
export const ALERT_MODE_1_HAPTIC_MAX = 10

export const ALERT_MODE_1_DURATION_MIN = 0
export const ALERT_MODE_1_DURATION_MAX = 65535

export type AlertMode1SelectOption = {
  value: string
  label: string
}

export type AlertMode1NumericFieldDefinition = {
  name:
    | 'Alert1ButtonSettingButtonPress'
    | 'Alert1ButtonSettingLED'
    | 'Alert1ButtonSettingHaptic'
    | 'Alert1ButtonSettingDuration'
  label: string
  min: number
  max: number
  unit: BadgeProfileInputUnit
  required: boolean
  help: BadgeProfileFieldHelp
}

export const ALERT_MODE_1_ENABLED_FIELD = {
  id: 'Alert1ButtonSettingEnabled',
  label: 'Enabled',
  help: {
    title: 'Enabled',
    variable: 'Alert1ButtonSetting.Enabled',
    byteLength: '1 Byte',
    description: 'Indicates if the alert mode is enabled. 0 if no, 1 if yes.',
    allowedValues: 'OFF (0)\nON (1)',
  } satisfies BadgeProfileFieldHelp,
} as const

export const ALERT_MODE_1_ACTIVATION_TYPE_FIELD = {
  id: 'Alert1ButtonSettingType',
  label: 'Activation Type',
  options: [
    { value: '0', label: 'Hold Down (0)' },
    { value: '1', label: 'Successive Button Presses (1)' },
  ] satisfies AlertMode1SelectOption[],
  help: {
    title: 'Activation Type',
    variable: 'Alert1ButtonSetting.Type',
    byteLength: '1 Byte',
    description:
      'Indicates if the initiation is by presses or holding down. 0 is holding down, 1 if number of successive presses.',
    allowedValues: 'Hold Down (0)\nSuccessive Button Presses (1)',
  } satisfies BadgeProfileFieldHelp,
} as const

export const ALERT_MODE_1_NUMERIC_FIELDS: AlertMode1NumericFieldDefinition[] = [
  {
    name: 'Alert1ButtonSettingButtonPress',
    label: 'Button Press Count',
    min: ALERT_MODE_1_BUTTON_PRESS_MIN,
    max: ALERT_MODE_1_BUTTON_PRESS_MAX,
    unit: 'presses',
    required: true,
    help: {
      title: 'Button Press Count',
      variable: 'Alert1ButtonSetting.ButtonPress',
      byteLength: '1 Byte',
      description:
        'Indicates the number of times the button needs to be pressed to activate Alert Mode 1. The number of presses must be at least X where X is the parameter value and less than Y which is the value of Alert2ButtonSetting.ButtonPress. Integer between 1 and 10.',
      allowedRange: `${ALERT_MODE_1_BUTTON_PRESS_MIN}–${ALERT_MODE_1_BUTTON_PRESS_MAX} presses`,
    },
  },
  {
    name: 'Alert1ButtonSettingLED',
    label: 'LED Flash Count',
    min: ALERT_MODE_1_LED_MIN,
    max: ALERT_MODE_1_LED_MAX,
    unit: 'flashes',
    required: true,
    help: {
      title: 'LED Flash Count',
      variable: 'Alert1ButtonSetting.LED',
      byteLength: '1 Byte',
      description:
        'If 0, the LED will not flash on activation. If greater than 0, the LED will flash that number of times. Integer between 1 and 10.',
      allowedRange: `${ALERT_MODE_1_LED_MIN}–${ALERT_MODE_1_LED_MAX} flashes`,
    },
  },
  {
    name: 'Alert1ButtonSettingHaptic',
    label: 'Haptic Count',
    min: ALERT_MODE_1_HAPTIC_MIN,
    max: ALERT_MODE_1_HAPTIC_MAX,
    unit: 'activations',
    required: true,
    help: {
      title: 'Haptic Count',
      variable: 'Alert1ButtonSetting.Haptic',
      byteLength: '1 Byte',
      description:
        'If 0, the haptic does not activate. If greater than 0, the haptic motor will activate briefly that number of times. Integer between 1 and 10.',
      allowedRange: `${ALERT_MODE_1_HAPTIC_MIN}–${ALERT_MODE_1_HAPTIC_MAX} activations`,
    },
  },
  {
    name: 'Alert1ButtonSettingDuration',
    label: 'Duration',
    min: ALERT_MODE_1_DURATION_MIN,
    max: ALERT_MODE_1_DURATION_MAX,
    unit: 'seconds',
    required: true,
    help: {
      title: 'Duration',
      variable: 'Alert1ButtonSetting.Duration',
      byteLength: '2 Bytes',
      description:
        'If 0, stays active until cleared. Up to 65,535 seconds (1,092 minutes).',
      allowedRange: `${ALERT_MODE_1_DURATION_MIN}–${ALERT_MODE_1_DURATION_MAX} seconds`,
    },
  },
]

export const ALERT_MODE_1_VALIDATION_FIELD_NAMES = ALERT_MODE_1_NUMERIC_FIELDS.map(
  (field) => field.name,
) satisfies ReadonlyArray<keyof AlertMode1SettingsValues>
