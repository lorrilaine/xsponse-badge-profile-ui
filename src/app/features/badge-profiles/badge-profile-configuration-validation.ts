import { BEACON_SETTINGS_FIELD_NAMES } from '@/app/features/badge-profiles/beacon-settings-validation'
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
