import type { BadgeProfileFieldHelp, BadgeProfileInputUnit } from '@/app/features/badge-profiles/badge-profile-field-types'
import type { AlertMode2SettingsValues } from '@/app/features/badge-profiles/badge-profile-configuration-types'

export const ALERT_MODE_2_BUTTON_PRESS_MIN = 1
export const ALERT_MODE_2_BUTTON_PRESS_MAX = 10

export const ALERT_MODE_2_LED_MIN = 0
export const ALERT_MODE_2_LED_MAX = 10

export const ALERT_MODE_2_HAPTIC_MIN = 0
export const ALERT_MODE_2_HAPTIC_MAX = 10

export const ALERT_MODE_2_DURATION_MIN = 0
export const ALERT_MODE_2_DURATION_MAX = 65535

export type AlertMode2SelectOption = {
  value: string
  label: string
}

export type AlertMode2NumericFieldDefinition = {
  name:
    | 'Alert2ButtonSettingButtonPress'
    | 'Alert2ButtonSettingLED'
    | 'Alert2ButtonSettingHaptic'
    | 'Alert2ButtonSettingDuration'
  label: string
  min: number
  max: number
  unit: BadgeProfileInputUnit
  required: boolean
  help: BadgeProfileFieldHelp
}

export const ALERT_MODE_2_ENABLED_FIELD = {
  id: 'Alert2ButtonSettingEnabled',
  label: 'Enabled',
  help: {
    title: 'Enabled',
    variable: 'Alert2ButtonSetting.Enabled',
    byteLength: '1 Byte',
    description: 'Indicates if the alert mode is enabled. 0 if no, 1 if yes.',
    allowedValues: 'OFF (0)\nON (1)',
  } satisfies BadgeProfileFieldHelp,
} as const

export const ALERT_MODE_2_ACTIVATION_TYPE_FIELD = {
  id: 'Alert2ButtonSettingType',
  label: 'Activation Type',
  options: [
    { value: '0', label: 'Hold Down (0)' },
    { value: '1', label: 'Successive Button Presses (1)' },
  ] satisfies AlertMode2SelectOption[],
  help: {
    title: 'Activation Type',
    variable: 'Alert2ButtonSetting.Type',
    byteLength: '1 Byte',
    description:
      'Indicates if the initiation is by presses or holding down. 0 is holding down, 1 if number of successive presses.',
    allowedValues: 'Hold Down (0)\nSuccessive Button Presses (1)',
  } satisfies BadgeProfileFieldHelp,
} as const

export const ALERT_MODE_2_NUMERIC_FIELDS: AlertMode2NumericFieldDefinition[] = [
  {
    name: 'Alert2ButtonSettingButtonPress',
    label: 'Button Press Count',
    min: ALERT_MODE_2_BUTTON_PRESS_MIN,
    max: ALERT_MODE_2_BUTTON_PRESS_MAX,
    unit: 'presses',
    required: true,
    help: {
      title: 'Button Press Count',
      variable: 'Alert2ButtonSetting.ButtonPress',
      byteLength: '1 Byte',
      description:
        'Indicates the number of times the button needs to be pressed to activate Alert Mode 2. The number of presses must be at least X where X is the parameter value or more. Integer between 1 and 10.',
      allowedRange: `${ALERT_MODE_2_BUTTON_PRESS_MIN}–${ALERT_MODE_2_BUTTON_PRESS_MAX} presses`,
    },
  },
  {
    name: 'Alert2ButtonSettingLED',
    label: 'LED Flash Count',
    min: ALERT_MODE_2_LED_MIN,
    max: ALERT_MODE_2_LED_MAX,
    unit: 'flashes',
    required: true,
    help: {
      title: 'LED Flash Count',
      variable: 'Alert2ButtonSetting.LED',
      byteLength: '1 Byte',
      description:
        'If 0, the LED will not flash on activation. If greater than 0, the LED will flash that number of times. Integer between 1 and 10.',
      allowedRange: `${ALERT_MODE_2_LED_MIN}–${ALERT_MODE_2_LED_MAX} flashes`,
    },
  },
  {
    name: 'Alert2ButtonSettingHaptic',
    label: 'Haptic Count',
    min: ALERT_MODE_2_HAPTIC_MIN,
    max: ALERT_MODE_2_HAPTIC_MAX,
    unit: 'activations',
    required: true,
    help: {
      title: 'Haptic Count',
      variable: 'Alert2ButtonSetting.Haptic',
      byteLength: '1 Byte',
      description:
        'If 0, the haptic does not activate. If greater than 0, the haptic motor will activate briefly that number of times. Integer between 1 and 10.',
      allowedRange: `${ALERT_MODE_2_HAPTIC_MIN}–${ALERT_MODE_2_HAPTIC_MAX} activations`,
    },
  },
  {
    name: 'Alert2ButtonSettingDuration',
    label: 'Duration',
    min: ALERT_MODE_2_DURATION_MIN,
    max: ALERT_MODE_2_DURATION_MAX,
    unit: 'seconds',
    required: true,
    help: {
      title: 'Duration',
      variable: 'Alert2ButtonSetting.Duration',
      byteLength: '2 Bytes',
      description:
        'If 0, stays active until cleared. Up to 65,535 seconds (1,092 minutes).',
      allowedRange: `${ALERT_MODE_2_DURATION_MIN}–${ALERT_MODE_2_DURATION_MAX} seconds`,
    },
  },
]

export const ALERT_MODE_2_VALIDATION_FIELD_NAMES = ALERT_MODE_2_NUMERIC_FIELDS.map(
  (field) => field.name,
) satisfies ReadonlyArray<keyof AlertMode2SettingsValues>
