import { useMemo, useState, type ReactNode } from 'react'
import { Link, useNavigate, useParams } from 'react-router'

import { PageHeader } from '@/app/components/layout/PageHeader'
import { Button } from '@/app/components/ui/button'
import { Combobox } from '@/app/components/ui/combobox'
import { FormField } from '@/app/components/ui/form-field'
import {
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
  findFirstInvalidConfigurationField,
  getConfigurationNavigationSection,
} from '@/app/features/badge-profiles/badge-profile-configuration-validation'
import {
  BADGE_GROUP_SELECT_OPTIONS,
  DEFAULT_BADGE_CONFIGURATION_SECTION_ID,
  type BadgeConfigurationSectionId,
} from '@/app/features/badge-profiles/badge-profile-form-sections'
import type { BadgeProfileStatus } from '@/app/features/badge-profiles/badge-profile-mock-data'
import {
  createDefaultBadgeProfileFormValues,
  getBadgeProfileFormValuesFromDetail,
  type BadgeProfileDetail,
} from '@/app/features/badge-profiles/badge-profile-store-data'
import { useBadgeProfiles } from '@/app/features/badge-profiles/BadgeProfileProvider'
import { buildBadgeProfileReviewSummary } from '@/app/features/badge-profiles/badge-profile-review-summary'
import { BadgeProfileConfigurationConsole } from '@/app/features/badge-profiles/components/BadgeProfileConfigurationConsole'
import { BadgeProfileReviewSummaryDialog } from '@/app/features/badge-profiles/components/BadgeProfileReviewSummaryDialog'
import { BadgeProfileStatusSelect } from '@/app/features/badge-profiles/components/BadgeProfileStatusSelect'
import { AlertMode1SettingsSection } from '@/app/features/badge-profiles/components/AlertMode1SettingsSection'
import { AlertMode2SettingsSection } from '@/app/features/badge-profiles/components/AlertMode2SettingsSection'
import { AlertMode3SettingsSection } from '@/app/features/badge-profiles/components/AlertMode3SettingsSection'
import { BeaconSettingsSection } from '@/app/features/badge-profiles/components/BeaconSettingsSection'
import { ClearButtonSettingsSection } from '@/app/features/badge-profiles/components/ClearButtonSettingsSection'
import { StatusUpdateSettingsSection } from '@/app/features/badge-profiles/components/StatusUpdateSettingsSection'
import { TrackingSettingsSection } from '@/app/features/badge-profiles/components/TrackingSettingsSection'
import {
  createTouchedAlertMode1SettingsFields,
  getVisibleAlertMode1SettingsErrors,
  validateAlertMode1Settings,
} from '@/app/features/badge-profiles/alert-mode-1-settings-validation'
import {
  createTouchedAlertMode2SettingsFields,
  getVisibleAlertMode2SettingsErrors,
  validateAlertMode2Settings,
} from '@/app/features/badge-profiles/alert-mode-2-settings-validation'
import {
  createTouchedAlertMode3SettingsFields,
  getVisibleAlertMode3SettingsErrors,
  validateAlertMode3Settings,
} from '@/app/features/badge-profiles/alert-mode-3-settings-validation'
import {
  createTouchedClearButtonSettingsFields,
  getVisibleClearButtonSettingsErrors,
  validateClearButtonSettings,
} from '@/app/features/badge-profiles/clear-button-settings-validation'
import {
  createTouchedBeaconSettingsFields,
  getVisibleBeaconSettingsErrors,
  validateBeaconSettings,
} from '@/app/features/badge-profiles/beacon-settings-validation'
import {
  createTouchedStatusUpdateSettingsFields,
  getVisibleStatusUpdateSettingsErrors,
  validateStatusUpdateSettings,
} from '@/app/features/badge-profiles/status-update-settings-validation'
import { WakeupSettingsSection } from '@/app/features/badge-profiles/components/WakeupSettingsSection'
import {
  createTouchedWakeupSettingsFields,
  getVisibleWakeupSettingsErrors,
  validateWakeupSettings,
} from '@/app/features/badge-profiles/wakeup-settings-validation'
import {
  createTouchedTrackingSettingsFields,
  getVisibleTrackingSettingsErrors,
  validateTrackingSettings,
} from '@/app/features/badge-profiles/tracking-settings-validation'
import { focusConfigurationField } from '@/app/features/badge-profiles/badge-profile-numeric-validation'
import { cn } from '@/app/utils'

const INPUT_CLASS_NAME =
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20'

const TEXTAREA_CLASS_NAME =
  'flex w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20'

const READONLY_INPUT_CLASS_NAME =
  'flex h-10 w-full cursor-not-allowed rounded-md border border-input bg-muted/40 px-3 py-2 text-sm text-muted-foreground shadow-sm outline-none placeholder:text-muted-foreground/80'

const MOCK_SAVE_DELAY_MS = 800

function getInitialFormState(profile?: BadgeProfileDetail) {
  if (!profile) {
    return createDefaultBadgeProfileFormValues()
  }

  return getBadgeProfileFormValuesFromDetail(profile)
}

function FormSectionCard({
  title,
  description,
  children,
  compact = false,
  contentClassName,
  headerClassName,
}: {
  title: string
  description: string
  children: ReactNode
  compact?: boolean
  contentClassName?: string
  headerClassName?: string
}) {
  return (
    <div className="rounded-md border border-border bg-card text-card-foreground shadow-sm">
      <div
        className={cn(
          'flex flex-col border-b border-border px-4',
          compact ? 'space-y-1 py-3' : 'space-y-1.5 py-4',
          headerClassName,
        )}
      >
        <p className="text-xl font-semibold text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div
        className={cn(
          compact ? 'space-y-3 p-4' : 'space-y-4 p-6 pt-0',
          contentClassName,
        )}
      >
        {children}
      </div>
    </div>
  )
}

function ConfigurationPlaceholder() {
  return (
    <div className="rounded-md border border-dashed border-border bg-zinc-50 px-4 py-8 text-center text-sm text-muted-foreground">
      Configuration fields will be added here.
    </div>
  )
}

export function CreateBadgeProfilePage() {
  const navigate = useNavigate()
  const { profileId } = useParams()
  const isEditMode = Boolean(profileId)
  const { getProfileById, saveProfile } = useBadgeProfiles()
  const existingProfile = profileId ? getProfileById(profileId) : undefined
  const initialFormState = useMemo(
    () => getInitialFormState(existingProfile),
    [existingProfile],
  )

  const [profileName, setProfileName] = useState(initialFormState.profileName)
  const [badgeGroupId, setBadgeGroupId] = useState(initialFormState.badgeGroupId)
  const [description, setDescription] = useState(initialFormState.description)
  const [status, setStatus] = useState<BadgeProfileStatus>(initialFormState.status)
  const [isSaving, setIsSaving] = useState(false)
  const [reviewSummaryOpen, setReviewSummaryOpen] = useState(false)
  const [beaconSettings, setBeaconSettings] = useState<BeaconSettingsValues>(
    initialFormState.beaconSettings,
  )
  const [beaconSettingsTouched, setBeaconSettingsTouched] = useState<
    Partial<Record<keyof BeaconSettingsValues, boolean>>
  >({})
  const [trackingSettings, setTrackingSettings] = useState<TrackingSettingsValues>(
    initialFormState.trackingSettings,
  )
  const [trackingSettingsTouched, setTrackingSettingsTouched] = useState<
    Partial<Record<keyof TrackingSettingsValues, boolean>>
  >({})
  const [statusUpdateSettings, setStatusUpdateSettings] =
    useState<StatusUpdateSettingsValues>(initialFormState.statusUpdateSettings)
  const [statusUpdateSettingsTouched, setStatusUpdateSettingsTouched] = useState<
    Partial<Record<keyof StatusUpdateSettingsValues, boolean>>
  >({})
  const [wakeupSettings, setWakeupSettings] = useState<WakeupSettingsValues>(
    initialFormState.wakeupSettings,
  )
  const [wakeupSettingsTouched, setWakeupSettingsTouched] = useState<
    Partial<Record<keyof WakeupSettingsValues, boolean>>
  >({})
  const [alertMode1Settings, setAlertMode1Settings] = useState<AlertMode1SettingsValues>(
    initialFormState.alertMode1Settings,
  )
  const [alertMode1SettingsTouched, setAlertMode1SettingsTouched] = useState<
    Partial<Record<keyof AlertMode1SettingsValues, boolean>>
  >({})
  const [alertMode2Settings, setAlertMode2Settings] = useState<AlertMode2SettingsValues>(
    initialFormState.alertMode2Settings,
  )
  const [alertMode2SettingsTouched, setAlertMode2SettingsTouched] = useState<
    Partial<Record<keyof AlertMode2SettingsValues, boolean>>
  >({})
  const [alertMode3Settings, setAlertMode3Settings] = useState<AlertMode3SettingsValues>(
    initialFormState.alertMode3Settings,
  )
  const [alertMode3SettingsTouched, setAlertMode3SettingsTouched] = useState<
    Partial<Record<keyof AlertMode3SettingsValues, boolean>>
  >({})
  const [clearButtonSettings, setClearButtonSettings] = useState<ClearButtonSettingsValues>(
    initialFormState.clearButtonSettings,
  )
  const [clearButtonSettingsTouched, setClearButtonSettingsTouched] = useState<
    Partial<Record<keyof ClearButtonSettingsValues, boolean>>
  >({})
  const [activeConfigurationSection, setActiveConfigurationSection] =
    useState<BadgeConfigurationSectionId>(DEFAULT_BADGE_CONFIGURATION_SECTION_ID)

  const beaconSettingsErrors = useMemo(
    () => getVisibleBeaconSettingsErrors(beaconSettings, beaconSettingsTouched),
    [beaconSettings, beaconSettingsTouched],
  )

  const trackingSettingsErrors = useMemo(
    () => getVisibleTrackingSettingsErrors(trackingSettings, trackingSettingsTouched),
    [trackingSettings, trackingSettingsTouched],
  )

  const statusUpdateSettingsErrors = useMemo(
    () =>
      getVisibleStatusUpdateSettingsErrors(
        statusUpdateSettings,
        statusUpdateSettingsTouched,
      ),
    [statusUpdateSettings, statusUpdateSettingsTouched],
  )

  const wakeupSettingsErrors = useMemo(
    () => getVisibleWakeupSettingsErrors(wakeupSettings, wakeupSettingsTouched),
    [wakeupSettings, wakeupSettingsTouched],
  )

  const alertMode1SettingsErrors = useMemo(
    () => getVisibleAlertMode1SettingsErrors(alertMode1Settings, alertMode1SettingsTouched),
    [alertMode1Settings, alertMode1SettingsTouched],
  )

  const alertMode2SettingsErrors = useMemo(
    () => getVisibleAlertMode2SettingsErrors(alertMode2Settings, alertMode2SettingsTouched),
    [alertMode2Settings, alertMode2SettingsTouched],
  )

  const alertMode3SettingsErrors = useMemo(
    () => getVisibleAlertMode3SettingsErrors(alertMode3Settings, alertMode3SettingsTouched),
    [alertMode3Settings, alertMode3SettingsTouched],
  )

  const clearButtonSettingsErrors = useMemo(
    () =>
      getVisibleClearButtonSettingsErrors(clearButtonSettings, clearButtonSettingsTouched),
    [clearButtonSettings, clearButtonSettingsTouched],
  )

  function handleBeaconSettingChange(
    field: keyof BeaconSettingsValues,
    value: string,
  ) {
    setBeaconSettings((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function handleBeaconSettingBlur(field: keyof BeaconSettingsValues) {
    setBeaconSettingsTouched((current) => ({
      ...current,
      [field]: true,
    }))
  }

  function handleTrackingStatusChange(enabled: boolean) {
    setTrackingSettings((current) => ({
      ...current,
      TrackingStatus: enabled,
    }))
  }

  function handleTrackingIntervalChange(value: string) {
    setTrackingSettings((current) => ({
      ...current,
      TrackingInterval: value,
    }))
  }

  function handleTrackingIntervalBlur() {
    setTrackingSettingsTouched((current) => ({
      ...current,
      TrackingInterval: true,
    }))
  }

  function handleStatusUpdateSettingChange(
    field: keyof StatusUpdateSettingsValues,
    value: string,
  ) {
    setStatusUpdateSettings((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function handleStatusUpdateSettingBlur(field: keyof StatusUpdateSettingsValues) {
    setStatusUpdateSettingsTouched((current) => ({
      ...current,
      [field]: true,
    }))
  }

  function handleWakeupSettingChange(field: keyof WakeupSettingsValues, value: string) {
    setWakeupSettings((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function handleWakeupSettingBlur(field: keyof WakeupSettingsValues) {
    setWakeupSettingsTouched((current) => ({
      ...current,
      [field]: true,
    }))
  }

  function handleAlertMode1EnabledChange(enabled: boolean) {
    setAlertMode1Settings((current) => ({
      ...current,
      Alert1ButtonSettingEnabled: enabled,
    }))
  }

  function handleAlertMode1TypeChange(value: string) {
    setAlertMode1Settings((current) => ({
      ...current,
      Alert1ButtonSettingType: value,
    }))
  }

  function handleAlertMode1NumericChange(
    field:
      | 'Alert1ButtonSettingButtonPress'
      | 'Alert1ButtonSettingLED'
      | 'Alert1ButtonSettingHaptic'
      | 'Alert1ButtonSettingDuration',
    value: string,
  ) {
    setAlertMode1Settings((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function handleAlertMode1FieldBlur(field: keyof AlertMode1SettingsValues) {
    setAlertMode1SettingsTouched((current) => ({
      ...current,
      [field]: true,
    }))
  }

  function handleAlertMode2EnabledChange(enabled: boolean) {
    setAlertMode2Settings((current) => ({
      ...current,
      Alert2ButtonSettingEnabled: enabled,
    }))
  }

  function handleAlertMode2TypeChange(value: string) {
    setAlertMode2Settings((current) => ({
      ...current,
      Alert2ButtonSettingType: value,
    }))
  }

  function handleAlertMode2NumericChange(
    field:
      | 'Alert2ButtonSettingButtonPress'
      | 'Alert2ButtonSettingLED'
      | 'Alert2ButtonSettingHaptic'
      | 'Alert2ButtonSettingDuration',
    value: string,
  ) {
    setAlertMode2Settings((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function handleAlertMode2FieldBlur(field: keyof AlertMode2SettingsValues) {
    setAlertMode2SettingsTouched((current) => ({
      ...current,
      [field]: true,
    }))
  }

  function handleAlertMode3EnabledChange(enabled: boolean) {
    setAlertMode3Settings((current) => ({
      ...current,
      Alert3ButtonSettingEnabled: enabled,
    }))
  }

  function handleAlertMode3TypeChange(value: string) {
    setAlertMode3Settings((current) => ({
      ...current,
      Alert3ButtonSettingType: value,
    }))
  }

  function handleAlertMode3NumericChange(
    field:
      | 'Alert3ButtonSettingButtonPress'
      | 'Alert3ButtonSettingLED'
      | 'Alert3ButtonSettingHaptic'
      | 'Alert3ButtonSettingDuration',
    value: string,
  ) {
    setAlertMode3Settings((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function handleAlertMode3FieldBlur(field: keyof AlertMode3SettingsValues) {
    setAlertMode3SettingsTouched((current) => ({
      ...current,
      [field]: true,
    }))
  }

  function handleClearButtonEnabledChange(enabled: boolean) {
    setClearButtonSettings((current) => ({
      ...current,
      ClearButtonSettingEnabled: enabled,
    }))
  }

  function handleClearButtonTypeChange(value: string) {
    setClearButtonSettings((current) => ({
      ...current,
      ClearButtonSettingType: value,
    }))
  }

  function handleClearButtonNumericChange(
    field:
      | 'ClearButtonSettingButtonPress'
      | 'ClearButtonSettingLED'
      | 'ClearButtonSettingHaptic',
    value: string,
  ) {
    setClearButtonSettings((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function handleClearButtonFieldBlur(field: keyof ClearButtonSettingsValues) {
    setClearButtonSettingsTouched((current) => ({
      ...current,
      [field]: true,
    }))
  }

  function renderConfigurationSectionContent() {
    switch (activeConfigurationSection) {
      case 'beacon-settings':
        return (
          <BeaconSettingsSection
            values={beaconSettings}
            onChange={handleBeaconSettingChange}
            onFieldBlur={handleBeaconSettingBlur}
            errors={beaconSettingsErrors}
          />
        )
      case 'tracking-settings':
        return (
          <TrackingSettingsSection
            values={trackingSettings}
            onTrackingStatusChange={handleTrackingStatusChange}
            onTrackingIntervalChange={handleTrackingIntervalChange}
            onTrackingIntervalBlur={handleTrackingIntervalBlur}
            errors={trackingSettingsErrors}
          />
        )
      case 'status-update-settings':
        return (
          <StatusUpdateSettingsSection
            values={statusUpdateSettings}
            onChange={handleStatusUpdateSettingChange}
            onFieldBlur={handleStatusUpdateSettingBlur}
            errors={statusUpdateSettingsErrors}
          />
        )
      case 'wakeup-settings':
        return (
          <WakeupSettingsSection
            values={wakeupSettings}
            onChange={handleWakeupSettingChange}
            onFieldBlur={handleWakeupSettingBlur}
            errors={wakeupSettingsErrors}
          />
        )
      case 'alert-mode-1':
        return (
          <AlertMode1SettingsSection
            values={alertMode1Settings}
            onEnabledChange={handleAlertMode1EnabledChange}
            onTypeChange={handleAlertMode1TypeChange}
            onNumericChange={handleAlertMode1NumericChange}
            onFieldBlur={handleAlertMode1FieldBlur}
            errors={alertMode1SettingsErrors}
          />
        )
      case 'alert-mode-2':
        return (
          <AlertMode2SettingsSection
            values={alertMode2Settings}
            onEnabledChange={handleAlertMode2EnabledChange}
            onTypeChange={handleAlertMode2TypeChange}
            onNumericChange={handleAlertMode2NumericChange}
            onFieldBlur={handleAlertMode2FieldBlur}
            errors={alertMode2SettingsErrors}
          />
        )
      case 'alert-mode-3':
        return (
          <AlertMode3SettingsSection
            values={alertMode3Settings}
            onEnabledChange={handleAlertMode3EnabledChange}
            onTypeChange={handleAlertMode3TypeChange}
            onNumericChange={handleAlertMode3NumericChange}
            onFieldBlur={handleAlertMode3FieldBlur}
            errors={alertMode3SettingsErrors}
          />
        )
      case 'clear-button':
        return (
          <ClearButtonSettingsSection
            values={clearButtonSettings}
            onEnabledChange={handleClearButtonEnabledChange}
            onTypeChange={handleClearButtonTypeChange}
            onNumericChange={handleClearButtonNumericChange}
            onFieldBlur={handleClearButtonFieldBlur}
            errors={clearButtonSettingsErrors}
          />
        )
      default:
        return <ConfigurationPlaceholder />
    }
  }

  function handleConfigurationSaveAttempt(): boolean {
    setBeaconSettingsTouched((current) => ({
      ...current,
      ...createTouchedBeaconSettingsFields(),
    }))
    setTrackingSettingsTouched((current) => ({
      ...current,
      ...createTouchedTrackingSettingsFields(),
    }))
    setStatusUpdateSettingsTouched((current) => ({
      ...current,
      ...createTouchedStatusUpdateSettingsFields(),
    }))
    setWakeupSettingsTouched((current) => ({
      ...current,
      ...createTouchedWakeupSettingsFields(),
    }))
    setAlertMode1SettingsTouched((current) => ({
      ...current,
      ...createTouchedAlertMode1SettingsFields(),
    }))
    setAlertMode2SettingsTouched((current) => ({
      ...current,
      ...createTouchedAlertMode2SettingsFields(),
    }))
    setAlertMode3SettingsTouched((current) => ({
      ...current,
      ...createTouchedAlertMode3SettingsFields(),
    }))
    setClearButtonSettingsTouched((current) => ({
      ...current,
      ...createTouchedClearButtonSettingsFields(),
    }))

    const beaconErrors = validateBeaconSettings(beaconSettings)
    const trackingErrors = validateTrackingSettings(trackingSettings)
    const statusUpdateErrors = validateStatusUpdateSettings(statusUpdateSettings)
    const wakeupErrors = validateWakeupSettings(wakeupSettings)
    const alertMode1Errors = validateAlertMode1Settings(alertMode1Settings)
    const alertMode2Errors = validateAlertMode2Settings(alertMode2Settings)
    const alertMode3Errors = validateAlertMode3Settings(alertMode3Settings)
    const clearButtonErrors = validateClearButtonSettings(clearButtonSettings)
    const firstInvalidField = findFirstInvalidConfigurationField(
      beaconErrors,
      trackingErrors,
      statusUpdateErrors,
      wakeupErrors,
      alertMode1Errors,
      alertMode2Errors,
      alertMode3Errors,
      clearButtonErrors,
    )

    if (!firstInvalidField) {
      return true
    }

    const navigationSection = getConfigurationNavigationSection(
      firstInvalidField,
    ) as BadgeConfigurationSectionId

    setActiveConfigurationSection(navigationSection)

    requestAnimationFrame(() => {
      focusConfigurationField(firstInvalidField)
    })

    return false
  }

  function persistBadgeProfile() {
    if (isSaving) {
      return
    }

    setIsSaving(true)

    // TODO: Replace mock persistence with Badge Profile API integration.
    saveProfile({
      id: isEditMode ? profileId : undefined,
      profileName,
      badgeGroupId,
      description,
      status,
      beaconSettings,
      trackingSettings,
      statusUpdateSettings,
      wakeupSettings,
      alertMode1Settings,
      alertMode2Settings,
      alertMode3Settings,
      clearButtonSettings,
    })

    window.setTimeout(() => {
      navigate('/badge-profiles', {
        state: isEditMode
          ? { showBadgeProfileUpdatedToast: true }
          : { showBadgeProfileSavedToast: true },
      })
    }, MOCK_SAVE_DELAY_MS)
  }

  function handleSaveDraft() {
    if (!handleConfigurationSaveAttempt()) {
      return
    }

    persistBadgeProfile()
  }

  function handleSaveBadgeProfile() {
    if (!handleConfigurationSaveAttempt()) {
      return
    }

    persistBadgeProfile()
  }

  const saveButtonLabel = isEditMode ? 'Update Badge Profile' : 'Save Badge Profile'
  const savingButtonLabel = isEditMode ? 'Updating...' : 'Saving...'
  const badgeProfileId = initialFormState.badgeProfileId
  const reviewSummarySections = useMemo(
    () =>
      buildBadgeProfileReviewSummary({
        profileName,
        badgeGroupId,
        description,
        status,
        badgeProfileId,
        beaconSettings,
        trackingSettings,
        statusUpdateSettings,
        wakeupSettings,
        alertMode1Settings,
        alertMode2Settings,
        alertMode3Settings,
        clearButtonSettings,
      }),
    [
      alertMode1Settings,
      alertMode2Settings,
      alertMode3Settings,
      badgeGroupId,
      badgeProfileId,
      beaconSettings,
      clearButtonSettings,
      description,
      profileName,
      status,
      statusUpdateSettings,
      trackingSettings,
      wakeupSettings,
    ],
  )
  const reviewSummaryProfileTitle =
    profileName.trim().length > 0 ? profileName.trim() : 'this badge profile'

  if (isEditMode && !existingProfile) {
    return (
      <main>
        <Link
          to="/badge-profiles"
          className="mb-2 inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          ← Back to Badge Profiles
        </Link>

        <PageHeader
          className="gap-2"
          title="Edit Badge Profile"
          description="Create and configure a badge profile used by XSPONSE wearable badges. The profile settings will be serialized into the badge configuration payload after saving."
        />

        <div className="mt-3 rounded-md border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Badge profile not found.</p>
          <Button
            type="button"
            variant="outline"
            className="mt-4"
            onClick={() => navigate('/badge-profiles')}
          >
            Back to Badge Profiles
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-[calc(100dvh-11rem)] flex-col">
      <div className="shrink-0">
        <Link
          to="/badge-profiles"
          className="mb-2 inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          ← Back to Badge Profiles
        </Link>

        <PageHeader
          className="gap-2"
          title={isEditMode ? 'Edit Badge Profile' : 'Create Badge Profile'}
          description="Create and configure a badge profile used by XSPONSE wearable badges. The profile settings will be serialized into the badge configuration payload after saving."
        />
      </div>

      <div className="mt-3 grid flex-1 grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,35fr)_minmax(0,65fr)] lg:gap-5">
        <div className="h-fit lg:sticky lg:top-8 lg:max-h-[calc(100dvh-7rem)] lg:self-start lg:overflow-y-auto">
          <FormSectionCard
            compact
            headerClassName="space-y-0.5 py-2.5"
            contentClassName="space-y-2.5 p-3 pt-0"
            title="General Information"
            description="Basic information used to identify and manage the badge profile."
          >
            <div className="grid grid-cols-1 gap-2.5">
              <FormField
                label="Profile Name"
                htmlFor="profile-name"
                required
                className="space-y-1.5"
              >
                <input
                  id="profile-name"
                  type="text"
                  value={profileName}
                  onChange={(event) => setProfileName(event.target.value)}
                  placeholder="Enter Profile Name"
                  className={INPUT_CLASS_NAME}
                />
              </FormField>

              <FormField
                label="Badge Group"
                htmlFor="badge-group"
                required
                className="space-y-1.5"
              >
                <Combobox
                  options={[...BADGE_GROUP_SELECT_OPTIONS]}
                  value={badgeGroupId}
                  onValueChange={setBadgeGroupId}
                  placeholder="Select Badge Group"
                  searchPlaceholder="Search badge groups..."
                  emptyMessage="No badge groups found."
                  className="h-10 w-full"
                />
              </FormField>

              <FormField
                label="Status"
                htmlFor="badge-profile-status"
                className="space-y-1.5"
              >
                <BadgeProfileStatusSelect value={status} onChange={setStatus} />
              </FormField>

              <FormField
                label="Badge Profile ID"
                htmlFor="badge-profile-id"
                className="space-y-1.5"
              >
                <input
                  id="badge-profile-id"
                  type="text"
                  disabled
                  readOnly
                  value={badgeProfileId}
                  placeholder="Automatically generated after saving."
                  className={READONLY_INPUT_CLASS_NAME}
                />
              </FormField>

              <FormField
                label="Description"
                htmlFor="profile-description"
                className="space-y-1.5"
              >
                <textarea
                  id="profile-description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Enter Profile Description"
                  rows={3}
                  className={cn(
                    TEXTAREA_CLASS_NAME,
                    'min-h-[4.5rem] max-h-36 resize-y py-1.5 leading-snug',
                  )}
                />
              </FormField>
            </div>
          </FormSectionCard>
        </div>

        <FormSectionCard
          compact
          contentClassName="pt-3"
          title="Badge Configuration"
          description="Firmware parameters that define badge behavior."
        >
          <BadgeProfileConfigurationConsole
            activeSectionId={activeConfigurationSection}
            onSectionChange={setActiveConfigurationSection}
          >
            {renderConfigurationSectionContent()}
          </BadgeProfileConfigurationConsole>
        </FormSectionCard>
      </div>

      <div className="mt-6 shrink-0 border-t border-border bg-card pt-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button
            type="button"
            variant="secondary"
            className="h-10 px-4 py-[10px]"
            onClick={() => navigate('/badge-profiles')}
          >
            Cancel
          </Button>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              variant="outline"
              className="h-10 px-4 py-[10px]"
              onClick={() => setReviewSummaryOpen(true)}
            >
              Review Summary
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-10 px-4 py-[10px]"
              disabled={isSaving}
              onClick={handleSaveDraft}
            >
              Save Draft
            </Button>
            <Button
              type="button"
              variant="default"
              className="h-10 px-4 py-[10px]"
              disabled={isSaving}
              onClick={handleSaveBadgeProfile}
            >
              {isSaving ? savingButtonLabel : saveButtonLabel}
            </Button>
          </div>
        </div>
      </div>

      <BadgeProfileReviewSummaryDialog
        open={reviewSummaryOpen}
        onOpenChange={setReviewSummaryOpen}
        sections={reviewSummarySections}
        profileTitle={reviewSummaryProfileTitle}
      />
    </main>
  )
}
