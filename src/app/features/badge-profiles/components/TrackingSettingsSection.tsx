import type { TrackingSettingsValues } from '@/app/features/badge-profiles/badge-profile-configuration-types'
import { BadgeProfileConfigFieldGrid } from '@/app/features/badge-profiles/components/BadgeProfileConfigFieldGrid'
import { BadgeProfileNumericField } from '@/app/features/badge-profiles/components/BadgeProfileNumericField'
import { BadgeProfileSwitchField } from '@/app/features/badge-profiles/components/BadgeProfileSwitchField'
import {
  TRACKING_ENABLED_FIELD,
  TRACKING_INTERVAL_FIELD,
} from '@/app/features/badge-profiles/tracking-settings-fields'

type TrackingSettingsSectionProps = {
  values: TrackingSettingsValues
  onTrackingStatusChange: (enabled: boolean) => void
  onTrackingIntervalChange: (value: string) => void
  onTrackingIntervalBlur?: () => void
  errors?: Partial<Record<keyof TrackingSettingsValues, string>>
}

export function TrackingSettingsSection({
  values,
  onTrackingStatusChange,
  onTrackingIntervalChange,
  onTrackingIntervalBlur,
  errors,
}: TrackingSettingsSectionProps) {
  const trackingEnabled = values.TrackingStatus

  return (
    <BadgeProfileConfigFieldGrid layout="single-column">
      <BadgeProfileSwitchField
        id={TRACKING_ENABLED_FIELD.id}
        name={TRACKING_ENABLED_FIELD.id}
        label={TRACKING_ENABLED_FIELD.label}
        help={TRACKING_ENABLED_FIELD.help}
        checked={trackingEnabled}
        onCheckedChange={onTrackingStatusChange}
      />

      <BadgeProfileNumericField
        id={TRACKING_INTERVAL_FIELD.id}
        name={TRACKING_INTERVAL_FIELD.id}
        label={TRACKING_INTERVAL_FIELD.label}
        help={TRACKING_INTERVAL_FIELD.help}
        value={values.TrackingInterval}
        onChange={onTrackingIntervalChange}
        onBlur={onTrackingIntervalBlur}
        unit={TRACKING_INTERVAL_FIELD.unit}
        required={trackingEnabled}
        disabled={!trackingEnabled}
        error={errors?.TrackingInterval}
      />
    </BadgeProfileConfigFieldGrid>
  )
}
