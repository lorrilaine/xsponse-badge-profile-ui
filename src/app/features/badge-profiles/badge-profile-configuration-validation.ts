import { BEACON_SETTINGS_FIELD_NAMES } from '@/app/features/badge-profiles/beacon-settings-validation'
import { ALERT_MODE_1_VALIDATION_FIELD_NAMES } from '@/app/features/badge-profiles/alert-mode-1-settings-fields'
import { ALERT_MODE_2_VALIDATION_FIELD_NAMES } from '@/app/features/badge-profiles/alert-mode-2-settings-fields'
import { ALERT_MODE_3_VALIDATION_FIELD_NAMES } from '@/app/features/badge-profiles/alert-mode-3-settings-fields'
import { CLEAR_BUTTON_VALIDATION_FIELD_NAMES } from '@/app/features/badge-profiles/clear-button-settings-fields'
import { STATUS_UPDATE_SETTINGS_FIELD_NAMES } from '@/app/features/badge-profiles/status-update-settings-fields'
import { TRACKING_SETTINGS_VALIDATION_FIELD_NAMES } from '@/app/features/badge-profiles/tracking-settings-fields'
import { WAKEUP_SETTINGS_FIELD_NAMES } from '@/app/features/badge-profiles/wakeup-settings-fields'

const CONFIGURATION_FIELD_SECTIONS: Record<string, string> = {
  Alert1BeaconInterval: 'beacon-settings',
  Alert2BeaconInterval: 'beacon-settings',
  Alert3BeaconInterval: 'beacon-settings',
  SecondaryBeaconInterval: 'beacon-settings',
  TrackingInterval: 'tracking-settings',
  StatusUpdateInterval: 'status-update-settings',
  BatteryChargingStatusInterval: 'status-update-settings',
  WakeupTimeInterval: 'wakeup-settings',
  WakeupTime: 'wakeup-settings',
  Alert1ButtonSettingButtonPress: 'alert-mode-1',
  Alert1ButtonSettingLED: 'alert-mode-1',
  Alert1ButtonSettingHaptic: 'alert-mode-1',
  Alert1ButtonSettingDuration: 'alert-mode-1',
  Alert2ButtonSettingButtonPress: 'alert-mode-2',
  Alert2ButtonSettingLED: 'alert-mode-2',
  Alert2ButtonSettingHaptic: 'alert-mode-2',
  Alert2ButtonSettingDuration: 'alert-mode-2',
  Alert3ButtonSettingButtonPress: 'alert-mode-3',
  Alert3ButtonSettingLED: 'alert-mode-3',
  Alert3ButtonSettingHaptic: 'alert-mode-3',
  Alert3ButtonSettingDuration: 'alert-mode-3',
  ClearButtonSettingButtonPress: 'clear-button',
  ClearButtonSettingLED: 'clear-button',
  ClearButtonSettingHaptic: 'clear-button',
}

export function getConfigurationNavigationSection(fieldId: string): string {
  return CONFIGURATION_FIELD_SECTIONS[fieldId] ?? 'beacon-settings'
}

/** @deprecated Use getConfigurationNavigationSection */
export function getConfigurationAccordionSection(fieldId: string): string {
  return getConfigurationNavigationSection(fieldId)
}

export const CONFIGURATION_FIELD_FOCUS_ORDER = [
  ...BEACON_SETTINGS_FIELD_NAMES,
  ...TRACKING_SETTINGS_VALIDATION_FIELD_NAMES,
  ...STATUS_UPDATE_SETTINGS_FIELD_NAMES,
  ...WAKEUP_SETTINGS_FIELD_NAMES,
  ...ALERT_MODE_1_VALIDATION_FIELD_NAMES,
  ...ALERT_MODE_2_VALIDATION_FIELD_NAMES,
  ...ALERT_MODE_3_VALIDATION_FIELD_NAMES,
  ...CLEAR_BUTTON_VALIDATION_FIELD_NAMES,
] as const

export function findFirstInvalidConfigurationField(
  ...errorMaps: Array<Partial<Record<string, string>>>
): string | undefined {
  for (const fieldId of CONFIGURATION_FIELD_FOCUS_ORDER) {
    for (const errors of errorMaps) {
      if (errors[fieldId]) {
        return fieldId
      }
    }
  }

  return undefined
}
