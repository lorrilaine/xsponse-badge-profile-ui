import { Info } from 'lucide-react'

const DISABLED_FEATURE_MESSAGE =
  'When this feature is disabled, all related settings below are disabled. Existing values are preserved.'

export function BadgeProfileFeatureDisabledBanner() {
  return (
    <div className="flex gap-2 rounded-md border border-info/20 bg-info/10 px-3 py-2.5">
      <Info className="mt-0.5 size-4 shrink-0 text-info" aria-hidden="true" />
      <p className="text-sm leading-snug text-muted-foreground">{DISABLED_FEATURE_MESSAGE}</p>
    </div>
  )
}
