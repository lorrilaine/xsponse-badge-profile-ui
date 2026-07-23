import type { BadgeProfileFieldHelp, BadgeProfileInputUnit } from '@/app/features/badge-profiles/badge-profile-field-types'
import type { ClearButtonSettingsValues } from '@/app/features/badge-profiles/badge-profile-configuration-types'

export const CLEAR_BUTTON_HOLD_DURATION_MIN = 1
export const CLEAR_BUTTON_HOLD_DURATION_MAX = 30

export const CLEAR_BUTTON_LED_MIN = 0
export const CLEAR_BUTTON_LED_MAX = 10

export const CLEAR_BUTTON_HAPTIC_MIN = 0
export const CLEAR_BUTTON_HAPTIC_MAX = 10

export type ClearButtonSelectOption = {
  value: string
  label: string
}

export type ClearButtonNumericFieldDefinition = {
  name:
    | 'ClearButtonSettingButtonPress'
    | 'ClearButtonSettingLED'
    | 'ClearButtonSettingHaptic'
  label: string
  min: number
  max: number
  unit: BadgeProfileInputUnit
  required: boolean
  help: BadgeProfileFieldHelp
}

export const CLEAR_BUTTON_ENABLED_FIELD = {
  id: 'ClearButtonSettingEnabled',
  label: 'Enabled',
  help: {
    title: 'Enabled',
    variable: 'ClearButtonSetting.Enabled',
    byteLength: '1 Byte',
    description: 'Indicates if the clear mode is enabled. 0 if no, 1 if yes.',
    allowedValues: 'OFF (0)\nON (1)',
  } satisfies BadgeProfileFieldHelp,
} as const

export const CLEAR_BUTTON_ACTIVATION_TYPE_FIELD = {
  id: 'ClearButtonSettingType',
  label: 'Activation Type',
  options: [
    { value: '0', label: 'Hold Down (0)' },
    { value: '1', label: 'Successive Button Presses (1)' },
  ] satisfies ClearButtonSelectOption[],
  help: {
    title: 'Activation Type',
    variable: 'ClearButtonSetting.Type',
    byteLength: '1 Byte',
    description:
      'Indicates if the initiation is by presses or holding down. 0 is holding down, 1 if number of successive presses.',
    allowedValues: 'Hold Down (0)\nSuccessive Button Presses (1)',
  } satisfies BadgeProfileFieldHelp,
} as const

export const CLEAR_BUTTON_NUMERIC_FIELDS: ClearButtonNumericFieldDefinition[] = [
  {
    name: 'ClearButtonSettingButtonPress',
    label: 'Button Hold Duration',
    min: CLEAR_BUTTON_HOLD_DURATION_MIN,
    max: CLEAR_BUTTON_HOLD_DURATION_MAX,
    unit: 'seconds',
    required: true,
    help: {
      title: 'Button Hold Duration',
      variable: 'ClearButtonSetting.ButtonPress',
      byteLength: '1 Byte',
      description:
        'Indicates the number of seconds the button needs to be held down to clear the badge alert. Integer between 1 and 30.',
      allowedRange: `${CLEAR_BUTTON_HOLD_DURATION_MIN}–${CLEAR_BUTTON_HOLD_DURATION_MAX} seconds`,
    },
  },
  {
    name: 'ClearButtonSettingLED',
    label: 'LED Flash Count',
    min: CLEAR_BUTTON_LED_MIN,
    max: CLEAR_BUTTON_LED_MAX,
    unit: 'flashes',
    required: true,
    help: {
      title: 'LED Flash Count',
      variable: 'ClearButtonSetting.LED',
      byteLength: '1 Byte',
      description:
        'If 0, the LED will not flash on activation. If greater than 0, the LED will flash that number of times. Integer between 1 and 10.',
      allowedRange: `${CLEAR_BUTTON_LED_MIN}–${CLEAR_BUTTON_LED_MAX} flashes`,
    },
  },
  {
    name: 'ClearButtonSettingHaptic',
    label: 'Haptic Count',
    min: CLEAR_BUTTON_HAPTIC_MIN,
    max: CLEAR_BUTTON_HAPTIC_MAX,
    unit: 'activations',
    required: true,
    help: {
      title: 'Haptic Count',
      variable: 'ClearButtonSetting.Haptic',
      byteLength: '1 Byte',
      description:
        'If 0, the haptic does not activate. If greater than 0, the haptic motor will activate briefly that number of times. Integer between 1 and 10.',
      allowedRange: `${CLEAR_BUTTON_HAPTIC_MIN}–${CLEAR_BUTTON_HAPTIC_MAX} activations`,
    },
  },
]

export const CLEAR_BUTTON_VALIDATION_FIELD_NAMES = CLEAR_BUTTON_NUMERIC_FIELDS.map(
  (field) => field.name,
) satisfies ReadonlyArray<keyof ClearButtonSettingsValues>
