import type { ReactNode } from 'react'

import type { BadgeConfigurationSectionId } from '@/app/features/badge-profiles/badge-profile-form-sections'
import { getBadgeConfigurationSection } from '@/app/features/badge-profiles/badge-profile-form-sections'
import { BadgeProfileConfigurationNavigator } from '@/app/features/badge-profiles/components/BadgeProfileConfigurationNavigator'
import { cn } from '@/app/utils'

type BadgeProfileConfigurationConsoleProps = {
  activeSectionId: BadgeConfigurationSectionId
  onSectionChange: (sectionId: BadgeConfigurationSectionId) => void
  children: ReactNode
  className?: string
}

export function BadgeProfileConfigurationConsole({
  activeSectionId,
  onSectionChange,
  children,
  className,
}: BadgeProfileConfigurationConsoleProps) {
  const activeSection = getBadgeConfigurationSection(activeSectionId)

  return (
    <div className={cn('flex flex-col gap-4 md:gap-5 lg:flex-row lg:gap-0', className)}>
      <aside className="lg:w-[24%] lg:shrink-0 lg:border-r lg:border-border lg:pr-4 xl:w-[22%]">
        <BadgeProfileConfigurationNavigator
          activeSectionId={activeSectionId}
          onSectionChange={onSectionChange}
        />
      </aside>

      <div className="min-w-0 flex-1 lg:pl-5 xl:pl-6">
        {activeSection ? (
          <div className="mb-4 border-b border-border pb-3">
            <h3 className="text-base font-semibold text-foreground">
              {activeSection.title}
            </h3>
            {activeSection.description ? (
              <p className="mt-1 text-sm text-muted-foreground">
                {activeSection.description}
              </p>
            ) : null}
          </div>
        ) : null}

        {children}
      </div>
    </div>
  )
}
