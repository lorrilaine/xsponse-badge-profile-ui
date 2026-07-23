import {
  DEFAULT_ALERT_MODE_1_SETTINGS_VALUES,
  DEFAULT_ALERT_MODE_2_SETTINGS_VALUES,
  DEFAULT_ALERT_MODE_3_SETTINGS_VALUES,
  DEFAULT_BEACON_SETTINGS_VALUES,
  DEFAULT_CLEAR_BUTTON_SETTINGS_VALUES,
  DEFAULT_STATUS_UPDATE_SETTINGS_VALUES,
  DEFAULT_TRACKING_SETTINGS_VALUES,
  DEFAULT_WAKEUP_SETTINGS_VALUES,
  type AlertMode1SettingsValues,
  type AlertMode2SettingsValues,
  type AlertMode3SettingsValues,
  type BeaconSettingsValues,
  type ClearButtonSettingsValues,
  type StatusUpdateSettingsValues,
  type TrackingSettingsValues,
  type WakeupSettingsValues,
} from '@/app/features/badge-profiles/badge-profile-configuration-types'
import {
  BADGE_GROUP_NAME_BY_ID,
  MOCK_BADGE_PROFILES,
  type BadgeProfileRecord,
  type BadgeProfileStatus,
} from '@/app/features/badge-profiles/badge-profile-mock-data'

export type BadgeProfileDetail = BadgeProfileRecord & {
  description: string
  beaconSettings: BeaconSettingsValues
  trackingSettings: TrackingSettingsValues
  statusUpdateSettings: StatusUpdateSettingsValues
  wakeupSettings: WakeupSettingsValues
  alertMode1Settings: AlertMode1SettingsValues
  alertMode2Settings: AlertMode2SettingsValues
  alertMode3Settings: AlertMode3SettingsValues
  clearButtonSettings: ClearButtonSettingsValues
}

export type SaveBadgeProfileInput = {
  id?: string
  profileName: string
  badgeGroupId: string
  description: string
  status: BadgeProfileStatus
  beaconSettings: BeaconSettingsValues
  trackingSettings: TrackingSettingsValues
  statusUpdateSettings: StatusUpdateSettingsValues
  wakeupSettings: WakeupSettingsValues
  alertMode1Settings: AlertMode1SettingsValues
  alertMode2Settings: AlertMode2SettingsValues
  alertMode3Settings: AlertMode3SettingsValues
  clearButtonSettings: ClearButtonSettingsValues
}

const PROFILE_DESCRIPTIONS: Record<string, string> = {
  bp_001: 'Full access profile for executive staff badges with elevated alert response settings.',
  bp_002: 'Standard visitor badge profile with limited tracking and periodic status updates.',
  bp_003: 'Restricted contractor access profile with draft configuration defaults.',
  bp_004: 'Emergency response profile with aggressive beacon intervals and alert modes enabled.',
  bp_005: 'After-hours access profile with extended wakeup intervals and reduced tracking.',
  bp_006: 'Temporary event profile tuned for high-density badge deployments.',
  bp_007: 'Maintenance staff profile prepared for assignment once finalized.',
  bp_008: 'Security supervisor profile with enhanced clear-button feedback settings.',
}

function createMockConfigurationValues(index: number): Pick<
  BadgeProfileDetail,
  | 'beaconSettings'
  | 'trackingSettings'
  | 'statusUpdateSettings'
  | 'wakeupSettings'
  | 'alertMode1Settings'
  | 'alertMode2Settings'
  | 'alertMode3Settings'
  | 'clearButtonSettings'
> {
  const seed = index + 1
  const trackingEnabled = index % 2 === 0
  const alertMode1Enabled = index % 3 === 0
  const alertMode2Enabled = index % 4 === 0
  const alertMode3Enabled = index % 5 === 0
  const clearButtonEnabled = index % 2 === 1

  return {
    beaconSettings: {
      Alert1BeaconInterval: String(10 + seed * 2),
      Alert2BeaconInterval: String(15 + seed * 2),
      Alert3BeaconInterval: String(20 + seed * 2),
      SecondaryBeaconInterval: String(45 + seed * 3),
    },
    trackingSettings: {
      TrackingStatus: trackingEnabled,
      TrackingInterval: trackingEnabled ? String(90 + seed * 5) : '',
    },
    statusUpdateSettings: {
      StatusUpdateInterval: String(300 + seed * 30),
      BatteryChargingStatusInterval: String(30 + seed),
    },
    wakeupSettings: {
      WakeupTimeInterval: String(500 + seed * 25),
      WakeupTime: String(50 + seed),
    },
    alertMode1Settings: alertMode1Enabled
      ? {
          Alert1ButtonSettingEnabled: true,
          Alert1ButtonSettingType: '1',
          Alert1ButtonSettingButtonPress: '2',
          Alert1ButtonSettingLED: '3',
          Alert1ButtonSettingHaptic: '1',
          Alert1ButtonSettingDuration: '30',
        }
      : DEFAULT_ALERT_MODE_1_SETTINGS_VALUES,
    alertMode2Settings: alertMode2Enabled
      ? {
          Alert2ButtonSettingEnabled: true,
          Alert2ButtonSettingType: '2',
          Alert2ButtonSettingButtonPress: '3',
          Alert2ButtonSettingLED: '2',
          Alert2ButtonSettingHaptic: '2',
          Alert2ButtonSettingDuration: '45',
        }
      : DEFAULT_ALERT_MODE_2_SETTINGS_VALUES,
    alertMode3Settings: alertMode3Enabled
      ? {
          Alert3ButtonSettingEnabled: true,
          Alert3ButtonSettingType: '1',
          Alert3ButtonSettingButtonPress: '1',
          Alert3ButtonSettingLED: '4',
          Alert3ButtonSettingHaptic: '3',
          Alert3ButtonSettingDuration: '60',
        }
      : DEFAULT_ALERT_MODE_3_SETTINGS_VALUES,
    clearButtonSettings: clearButtonEnabled
      ? {
          ClearButtonSettingEnabled: true,
          ClearButtonSettingType: '1',
          ClearButtonSettingButtonPress: '2',
          ClearButtonSettingLED: '2',
          ClearButtonSettingHaptic: '1',
        }
      : DEFAULT_CLEAR_BUTTON_SETTINGS_VALUES,
  }
}

function buildMockBadgeProfileDetails(): BadgeProfileDetail[] {
  return MOCK_BADGE_PROFILES.map((record, index) => ({
    ...record,
    description:
      PROFILE_DESCRIPTIONS[record.id] ??
      `Configuration settings for the ${record.profileName} badge profile.`,
    ...createMockConfigurationValues(index),
  }))
}

export const MOCK_BADGE_PROFILE_DETAILS = buildMockBadgeProfileDetails()

export function createDefaultBadgeProfileFormValues(): Omit<
  BadgeProfileDetail,
  keyof BadgeProfileRecord
> & {
  profileName: string
  badgeGroupId: string
  status: BadgeProfileStatus
  badgeProfileId: string
} {
  return {
    profileName: '',
    badgeGroupId: '',
    description: '',
    status: 'Draft',
    badgeProfileId: '',
    beaconSettings: DEFAULT_BEACON_SETTINGS_VALUES,
    trackingSettings: DEFAULT_TRACKING_SETTINGS_VALUES,
    statusUpdateSettings: DEFAULT_STATUS_UPDATE_SETTINGS_VALUES,
    wakeupSettings: DEFAULT_WAKEUP_SETTINGS_VALUES,
    alertMode1Settings: DEFAULT_ALERT_MODE_1_SETTINGS_VALUES,
    alertMode2Settings: DEFAULT_ALERT_MODE_2_SETTINGS_VALUES,
    alertMode3Settings: DEFAULT_ALERT_MODE_3_SETTINGS_VALUES,
    clearButtonSettings: DEFAULT_CLEAR_BUTTON_SETTINGS_VALUES,
  }
}

export function getBadgeProfileFormValuesFromDetail(
  profile: BadgeProfileDetail,
): SaveBadgeProfileInput & { badgeProfileId: string } {
  return {
    id: profile.id,
    profileName: profile.profileName,
    badgeGroupId: profile.badgeGroupId,
    description: profile.description,
    status: profile.status,
    badgeProfileId: profile.badgeProfileId,
    beaconSettings: profile.beaconSettings,
    trackingSettings: profile.trackingSettings,
    statusUpdateSettings: profile.statusUpdateSettings,
    wakeupSettings: profile.wakeupSettings,
    alertMode1Settings: profile.alertMode1Settings,
    alertMode2Settings: profile.alertMode2Settings,
    alertMode3Settings: profile.alertMode3Settings,
    clearButtonSettings: profile.clearButtonSettings,
  }
}

function formatLastModified(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date)
}

function formatLastModifiedDetails(date: Date) {
  const formatted = formatLastModified(date)
  const [month, day, year, time, meridiem] = formatted.replace(',', '').split(' ')

  return {
    modifiedBy: 'System Administrator',
    date: [month, day, year].filter(Boolean).join(' '),
    time: [time, meridiem].filter(Boolean).join(' '),
  }
}

let nextBadgeProfileBusinessId = 24009

export function createBadgeProfileBusinessId() {
  nextBadgeProfileBusinessId += 1
  return `BP-${nextBadgeProfileBusinessId}`
}

export function createBadgeProfileId(profileName: string) {
  const slug = profileName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  return slug ? `${slug}-${Date.now()}` : `badge-profile-${Date.now()}`
}

export function buildBadgeProfileDetail(
  input: SaveBadgeProfileInput,
  existing?: BadgeProfileDetail,
): BadgeProfileDetail {
  const now = new Date()
  const id = input.id ?? createBadgeProfileId(input.profileName)

  return {
    id,
    profileName: input.profileName.trim(),
    badgeGroupId: input.badgeGroupId,
    badgeGroupName: BADGE_GROUP_NAME_BY_ID[input.badgeGroupId],
    badgeProfileId: existing?.badgeProfileId ?? createBadgeProfileBusinessId(),
    assignedBadges: existing?.assignedBadges ?? 0,
    assignedBadgeLabels: existing?.assignedBadgeLabels ?? [],
    lastModified: formatLastModified(now),
    lastModifiedDetails: formatLastModifiedDetails(now),
    status: input.status,
    description: input.description.trim(),
    beaconSettings: input.beaconSettings,
    trackingSettings: input.trackingSettings,
    statusUpdateSettings: input.statusUpdateSettings,
    wakeupSettings: input.wakeupSettings,
    alertMode1Settings: input.alertMode1Settings,
    alertMode2Settings: input.alertMode2Settings,
    alertMode3Settings: input.alertMode3Settings,
    clearButtonSettings: input.clearButtonSettings,
  }
}
