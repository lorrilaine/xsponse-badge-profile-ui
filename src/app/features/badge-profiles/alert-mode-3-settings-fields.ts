import type { BadgeProfileFieldHelp, BadgeProfileInputUnit } from '@/app/features/badge-profiles/badge-profile-field-types'
import type { AlertMode3SettingsValues } from '@/app/features/badge-profiles/badge-profile-configuration-types'

export const ALERT_MODE_3_BUTTON_PRESS_MIN = 1
export const ALERT_MODE_3_BUTTON_PRESS_MAX = 10

export const ALERT_MODE_3_LED_MIN = 0
export const ALERT_MODE_3_LED_MAX = 10

export const ALERT_MODE_3_HAPTIC_MIN = 0
export const ALERT_MODE_3_HAPTIC_MAX = 10

export const ALERT_MODE_3_DURATION_MIN = 0
export const ALERT_MODE_3_DURATION_MAX = 65535

export type AlertMode3SelectOption = {
  value: string
  label: string
}

export type AlertMode3NumericFieldDefinition = {
  name:
    | 'Alert3ButtonSettingButtonPress'
    | 'Alert3ButtonSettingLED'
    | 'Alert3ButtonSettingHaptic'
    | 'Alert3ButtonSettingDuration'
  label: string
  min: number
  max: number
  unit: BadgeProfileInputUnit
  required: boolean
  help: BadgeProfileFieldHelp
}

export const ALERT_MODE_3_ENABLED_FIELD = {
  id: 'Alert3ButtonSettingEnabled',
  label: 'Enabled',
  help: {
    title: 'Enabled',
    variable: 'Alert3ButtonSetting.Enabled',
    byteLength: '1 Byte',
    description: 'Indicates if the alert mode is enabled. 0 if no, 1 if yes.',
    allowedValues: 'OFF (0)\nON (1)',
  } satisfies BadgeProfileFieldHelp,
} as const

export const ALERT_MODE_3_ACTIVATION_TYPE_FIELD = {
  id: 'Alert3ButtonSettingType',
  label: 'Activation Type',
  options: [
    { value: '0', label: 'Hold Down (0)' },
    { value: '1', label: 'Successive Button Presses (1)' },
  ] satisfies AlertMode3SelectOption[],
  help: {
    title: 'Activation Type',
    variable: 'Alert3ButtonSetting.Type',
    byteLength: '1 Byte',
    description:
      'Indicates if the initiation is by presses or holding down. 0 is holding down, 1 if number of successive presses.',
    allowedValues: 'Hold Down (0)\nSuccessive Button Presses (1)',
  } satisfies BadgeProfileFieldHelp,
} as const

export const ALERT_MODE_3_NUMERIC_FIELDS: AlertMode3NumericFieldDefinition[] = [
  {
    name: 'Alert3ButtonSettingButtonPress',
    label: 'Button Press Count',
    min: ALERT_MODE_3_BUTTON_PRESS_MIN,
    max: ALERT_MODE_3_BUTTON_PRESS_MAX,
    unit: 'presses',
    required: true,
    help: {
      title: 'Button Press Count',
      variable: 'Alert3ButtonSetting.ButtonPress',
      byteLength: '1 Byte',
      description:
        'Indicates the number of times the button needs to be pressed to activate Alert Mode 3. The number of presses must be at least X where X is the parameter value or more. Integer between 1 and 10.',
      allowedRange: `${ALERT_MODE_3_BUTTON_PRESS_MIN}–${ALERT_MODE_3_BUTTON_PRESS_MAX} presses`,
    },
  },
  {
    name: 'Alert3ButtonSettingLED',
    label: 'LED Flash Count',
    min: ALERT_MODE_3_LED_MIN,
    max: ALERT_MODE_3_LED_MAX,
    unit: 'flashes',
    required: true,
    help: {
      title: 'LED Flash Count',
      variable: 'Alert3ButtonSetting.LED',
      byteLength: '1 Byte',
      description:
        'If 0, the LED will not flash on activation. If greater than 0, the LED will flash that number of times. Integer between 1 and 10.',
      allowedRange: `${ALERT_MODE_3_LED_MIN}–${ALERT_MODE_3_LED_MAX} flashes`,
    },
  },
  {
    name: 'Alert3ButtonSettingHaptic',
    label: 'Haptic Count',
    min: ALERT_MODE_3_HAPTIC_MIN,
    max: ALERT_MODE_3_HAPTIC_MAX,
    unit: 'activations',
    required: true,
    help: {
      title: 'Haptic Count',
      variable: 'Alert3ButtonSetting.Haptic',
      byteLength: '1 Byte',
      description:
        'If 0, the haptic does not activate. If greater than 0, the haptic motor will activate briefly that number of times. Integer between 1 and 10.',
      allowedRange: `${ALERT_MODE_3_HAPTIC_MIN}–${ALERT_MODE_3_HAPTIC_MAX} activations`,
    },
  },
  {
    name: 'Alert3ButtonSettingDuration',
    label: 'Duration',
    min: ALERT_MODE_3_DURATION_MIN,
    max: ALERT_MODE_3_DURATION_MAX,
    unit: 'seconds',
    required: true,
    help: {
      title: 'Duration',
      variable: 'Alert3ButtonSetting.Duration',
      byteLength: '2 Bytes',
      description:
        'If 0, stays active until cleared. Up to 65,535 seconds (1,092 minutes).',
      allowedRange: `${ALERT_MODE_3_DURATION_MIN}–${ALERT_MODE_3_DURATION_MAX} seconds`,
    },
  },
]

export const ALERT_MODE_3_VALIDATION_FIELD_NAMES = ALERT_MODE_3_NUMERIC_FIELDS.map(
  (field) => field.name,
) satisfies ReadonlyArray<keyof AlertMode3SettingsValues>
