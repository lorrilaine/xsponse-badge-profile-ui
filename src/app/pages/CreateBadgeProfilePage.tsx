import { useState, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router'

import { PageHeader } from '@/app/components/layout/PageHeader'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/app/components/ui/accordion'
import { Button } from '@/app/components/ui/button'
import { Combobox } from '@/app/components/ui/combobox'
import { FormField } from '@/app/components/ui/form-field'
import {
  DEFAULT_BEACON_SETTINGS_VALUES,
  type BeaconSettingsValues,
} from '@/app/features/badge-profiles/badge-profile-configuration-types'
import {
  BADGE_CONFIGURATION_SECTIONS,
  BADGE_GROUP_SELECT_OPTIONS,
} from '@/app/features/badge-profiles/badge-profile-form-sections'
import type { BadgeProfileStatus } from '@/app/features/badge-profiles/badge-profile-mock-data'
import { BadgeProfileStatusSelect } from '@/app/features/badge-profiles/components/BadgeProfileStatusSelect'
import { BeaconSettingsSection } from '@/app/features/badge-profiles/components/BeaconSettingsSection'
import { cn } from '@/app/utils'

const INPUT_CLASS_NAME =
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20'

const TEXTAREA_CLASS_NAME =
  'flex w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20'

const READONLY_INPUT_CLASS_NAME =
  'flex h-10 w-full cursor-not-allowed rounded-md border border-input bg-muted/40 px-3 py-2 text-sm text-muted-foreground shadow-sm outline-none placeholder:text-muted-foreground/80'

function FormSectionCard({
  title,
  description,
  children,
  compact = false,
  contentClassName,
}: {
  title: string
  description: string
  children: ReactNode
  compact?: boolean
  contentClassName?: string
}) {
  return (
    <div className="rounded-md border border-border bg-card text-card-foreground shadow-sm">
      <div
        className={cn(
          'flex flex-col border-b border-border px-4',
          compact ? 'space-y-1 py-3' : 'space-y-1.5 py-4',
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
  const [profileName, setProfileName] = useState('')
  const [badgeGroupId, setBadgeGroupId] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<BadgeProfileStatus>('Draft')
  const [beaconSettings, setBeaconSettings] = useState<BeaconSettingsValues>(
    DEFAULT_BEACON_SETTINGS_VALUES,
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

  return (
    <main className="pb-28">
      <Link
        to="/badge-profiles"
        className="mb-2 inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-primary/80"
      >
        ← Back to Badge Profiles
      </Link>

      <PageHeader
        className="gap-2"
        title="Create Badge Profile"
        description="Create and configure a badge profile used by XSPONSE wearable badges. The profile settings will be serialized into the badge configuration payload after saving."
      />

      <div className="mt-3 space-y-4">
        <FormSectionCard
          compact
          title="General Information"
          description="Basic information used to identify and manage the badge profile."
        >
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <FormField label="Profile Name" htmlFor="profile-name" required>
              <input
                id="profile-name"
                type="text"
                value={profileName}
                onChange={(event) => setProfileName(event.target.value)}
                placeholder="Enter Profile Name"
                className={INPUT_CLASS_NAME}
              />
            </FormField>

            <FormField label="Badge Group" htmlFor="badge-group" required>
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

            <FormField label="Status" htmlFor="badge-profile-status">
              <BadgeProfileStatusSelect value={status} onChange={setStatus} />
            </FormField>

            <FormField label="Badge Profile ID" htmlFor="badge-profile-id">
              <input
                id="badge-profile-id"
                type="text"
                disabled
                readOnly
                value=""
                placeholder="Automatically generated after saving."
                className={READONLY_INPUT_CLASS_NAME}
              />
            </FormField>
          </div>

          <FormField label="Description" htmlFor="profile-description">
            <textarea
              id="profile-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Enter Profile Description"
              rows={3}
              className={TEXTAREA_CLASS_NAME}
            />
          </FormField>
        </FormSectionCard>

        <FormSectionCard
          compact
          contentClassName="pt-2"
          title="Badge Configuration"
          description="Configure the firmware parameters that define badge behavior."
        >
          <Accordion type="multiple" className="w-full space-y-1.5">
            {BADGE_CONFIGURATION_SECTIONS.map((section) => (
              <AccordionItem
                key={section.id}
                value={section.id}
                className="rounded-md border border-border px-4"
              >
                <AccordionTrigger className="py-3 hover:no-underline">
                  <span className="text-base font-semibold text-foreground">
                    {section.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p className="mb-4 text-sm text-muted-foreground">
                    {section.description}
                  </p>
                  {section.id === 'beacon-settings' ? (
                    <BeaconSettingsSection
                      values={beaconSettings}
                      onChange={handleBeaconSettingChange}
                    />
                  ) : (
                    <ConfigurationPlaceholder />
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FormSectionCard>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur-lg">
        <div className="shell-container flex flex-wrap items-center justify-between gap-3 py-4">
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
            >
              Save Draft
            </Button>
            <Button type="button" variant="default" className="h-10 px-4 py-[10px]">
              Save Badge Profile
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
