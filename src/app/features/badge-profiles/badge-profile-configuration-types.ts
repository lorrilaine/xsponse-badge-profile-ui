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
