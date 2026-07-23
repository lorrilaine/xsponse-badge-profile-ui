import {
  BADGE_CONFIGURATION_SECTIONS,
  type BadgeConfigurationSectionId,
} from '@/app/features/badge-profiles/badge-profile-form-sections'
import { cn } from '@/app/utils'

type BadgeProfileConfigurationNavigatorProps = {
  activeSectionId: BadgeConfigurationSectionId
  onSectionChange: (sectionId: BadgeConfigurationSectionId) => void
  className?: string
}

export function BadgeProfileConfigurationNavigator({
  activeSectionId,
  onSectionChange,
  className,
}: BadgeProfileConfigurationNavigatorProps) {
  return (
    <nav
      aria-label="Badge configuration sections"
      className={cn('w-full', className)}
    >
      <ul className="flex list-none flex-col gap-0.5">
        {BADGE_CONFIGURATION_SECTIONS.map((section) => {
          const isActive = section.id === activeSectionId

          return (
            <li key={section.id}>
              <button
                type="button"
                aria-current={isActive ? 'page' : undefined}
                onClick={() => onSectionChange(section.id)}
                className={cn(
                  'w-full rounded-md border-l-2 px-3 py-2 text-left text-sm font-medium transition-colors',
                  isActive
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-transparent text-foreground hover:bg-muted/60 hover:text-primary',
                )}
              >
                {section.navigationLabel}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
