export type BeaconSettingsValues = {
  Alert1BeaconInterval: string
  Alert2BeaconInterval: string
  Alert3BeaconInterval: string
  SecondaryBeaconInterval: string
}

export const DEFAULT_BEACON_SETTINGS_VALUES: BeaconSettingsValues = {
  Alert1BeaconInterval: '',
  Alert2BeaconInterval: '',
  Alert3BeaconInterval: '',
  SecondaryBeaconInterval: '',
}

export type TrackingSettingsValues = {
  TrackingStatus: boolean
  TrackingInterval: string
}

export const DEFAULT_TRACKING_SETTINGS_VALUES: TrackingSettingsValues = {
  TrackingStatus: false,
  TrackingInterval: '',
}

export type StatusUpdateSettingsValues = {
  StatusUpdateInterval: string
  BatteryChargingStatusInterval: string
}

export const DEFAULT_STATUS_UPDATE_SETTINGS_VALUES: StatusUpdateSettingsValues = {
  StatusUpdateInterval: '',
  BatteryChargingStatusInterval: '',
}

export type WakeupSettingsValues = {
  WakeupTimeInterval: string
  WakeupTime: string
}

export const DEFAULT_WAKEUP_SETTINGS_VALUES: WakeupSettingsValues = {
  WakeupTimeInterval: '',
  WakeupTime: '',
}

export type AlertMode1SettingsValues = {
  Alert1ButtonSettingEnabled: boolean
  Alert1ButtonSettingType: string
  Alert1ButtonSettingButtonPress: string
  Alert1ButtonSettingLED: string
  Alert1ButtonSettingHaptic: string
  Alert1ButtonSettingDuration: string
}

export const DEFAULT_ALERT_MODE_1_SETTINGS_VALUES: AlertMode1SettingsValues = {
  Alert1ButtonSettingEnabled: false,
  Alert1ButtonSettingType: '0',
  Alert1ButtonSettingButtonPress: '',
  Alert1ButtonSettingLED: '',
  Alert1ButtonSettingHaptic: '',
  Alert1ButtonSettingDuration: '',
}

export type AlertMode2SettingsValues = {
  Alert2ButtonSettingEnabled: boolean
  Alert2ButtonSettingType: string
  Alert2ButtonSettingButtonPress: string
  Alert2ButtonSettingLED: string
  Alert2ButtonSettingHaptic: string
  Alert2ButtonSettingDuration: string
}

export const DEFAULT_ALERT_MODE_2_SETTINGS_VALUES: AlertMode2SettingsValues = {
  Alert2ButtonSettingEnabled: false,
  Alert2ButtonSettingType: '0',
  Alert2ButtonSettingButtonPress: '',
  Alert2ButtonSettingLED: '',
  Alert2ButtonSettingHaptic: '',
  Alert2ButtonSettingDuration: '',
}

export type AlertMode3SettingsValues = {
  Alert3ButtonSettingEnabled: boolean
  Alert3ButtonSettingType: string
  Alert3ButtonSettingButtonPress: string
  Alert3ButtonSettingLED: string
  Alert3ButtonSettingHaptic: string
  Alert3ButtonSettingDuration: string
}

export const DEFAULT_ALERT_MODE_3_SETTINGS_VALUES: AlertMode3SettingsValues = {
  Alert3ButtonSettingEnabled: false,
  Alert3ButtonSettingType: '0',
  Alert3ButtonSettingButtonPress: '',
  Alert3ButtonSettingLED: '',
  Alert3ButtonSettingHaptic: '',
  Alert3ButtonSettingDuration: '',
}

export type ClearButtonSettingsValues = {
  ClearButtonSettingEnabled: boolean
  ClearButtonSettingType: string
  ClearButtonSettingButtonPress: string
  ClearButtonSettingLED: string
  ClearButtonSettingHaptic: string
}

export const DEFAULT_CLEAR_BUTTON_SETTINGS_VALUES: ClearButtonSettingsValues = {
  ClearButtonSettingEnabled: false,
  ClearButtonSettingType: '0',
  ClearButtonSettingButtonPress: '',
  ClearButtonSettingLED: '',
  ClearButtonSettingHaptic: '',
}
