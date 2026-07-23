import { Link, useLocation, useNavigate } from 'react-router'
import { useEffect, useMemo, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  Plus,
  Search,
} from 'lucide-react'

import { PageHeader } from '@/app/components/layout/PageHeader'
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import { EmptyState } from '@/app/components/ui/empty-state'
import { useToast } from '@/app/components/ui/toast'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/app/components/ui/tooltip'
import {
  formatAssignedBadgesLabel,
  formatBadgeProfileVersionLabel,
  getBadgeGroupName,
  getLastModifiedDetails,
} from '@/app/features/badge-profiles/badge-profile-list-formatters'
import {
  BADGE_GROUP_FILTER_OPTIONS,
  BADGE_PROFILE_STATUS_FILTER_OPTIONS,
  filterBadgeProfiles,
  type BadgeProfileRecord,
  type BadgeProfileStatus,
} from '@/app/features/badge-profiles/badge-profile-mock-data'
import { useBadgeProfiles } from '@/app/features/badge-profiles/BadgeProfileProvider'
import { DEFAULT_BADGE_PROFILE_PERMISSIONS } from '@/app/features/badge-profiles/badge-profile-permissions'
import { BadgeProfileAssignedBadgesDialog } from '@/app/features/badge-profiles/components/BadgeProfileAssignedBadgesDialog'
import { BadgeProfileAssignDialog } from '@/app/features/badge-profiles/components/BadgeProfileAssignDialog'
import { BadgeProfileDeleteDialog } from '@/app/features/badge-profiles/components/BadgeProfileDeleteDialog'
import { BadgeProfileManagementActions } from '@/app/features/badge-profiles/components/BadgeProfileManagementActions'
import { cn } from '@/app/utils'

const TABLE_COLUMNS = [
  'Profile Name',
  'BadgeGroupID',
  'BadgeProfileID',
  'Assigned Badges',
  'Last Modified',
  'Status',
  'Actions',
] as const

function StatusBadge({ status }: { status: BadgeProfileStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'rounded-full border-transparent px-2.5 py-[2px] text-xs font-semibold',
        status === 'Active' && 'bg-success/10 text-success',
        status === 'Inactive' && 'bg-zinc-100 text-zinc-600',
        status === 'Draft' && 'bg-warning/10 text-warning-foreground',
      )}
    >
      {status}
    </Badge>
  )
}

function BadgeGroupCell({ profile }: { profile: BadgeProfileRecord }) {
  const badgeGroupName = getBadgeGroupName(profile.badgeGroupId, profile.badgeGroupName)

  return (
    <div className="flex flex-col">
      {badgeGroupName ? (
        <span className="text-sm text-foreground">{badgeGroupName}</span>
      ) : null}
      <span className={cn('text-sm', badgeGroupName ? 'text-muted-foreground' : 'text-foreground')}>
        {profile.badgeGroupId}
      </span>
    </div>
  )
}

function BadgeProfileIdCell({ profile }: { profile: BadgeProfileRecord }) {
  return (
    <div className="flex flex-col">
      <span className="text-sm text-foreground">
        {formatBadgeProfileVersionLabel(profile)}
      </span>
      <span className="text-sm text-muted-foreground">{profile.badgeProfileId}</span>
    </div>
  )
}

function LastModifiedCell({ profile }: { profile: BadgeProfileRecord }) {
  const lastModifiedDetails = getLastModifiedDetails(profile)

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="text-left text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          {profile.lastModified}
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" className="space-y-1 text-left">
        <p>Modified By: {lastModifiedDetails.modifiedBy}</p>
        <p>Date: {lastModifiedDetails.date}</p>
        <p>Time: {lastModifiedDetails.time}</p>
      </TooltipContent>
    </Tooltip>
  )
}

export function BadgeProfileManagementPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { profiles, deleteProfile } = useBadgeProfiles()
  const badgeProfilePermissions = DEFAULT_BADGE_PROFILE_PERMISSIONS
  const [searchQuery, setSearchQuery] = useState('')
  const [badgeGroupFilter, setBadgeGroupFilter] = useState<string>(
    BADGE_GROUP_FILTER_OPTIONS[0],
  )
  const [statusFilter, setStatusFilter] = useState<string>(
    BADGE_PROFILE_STATUS_FILTER_OPTIONS[0],
  )
  const [assignedBadgesProfile, setAssignedBadgesProfile] =
    useState<BadgeProfileRecord | null>(null)
  const [assignProfile, setAssignProfile] = useState<BadgeProfileRecord | null>(null)
  const [deleteTargetProfile, setDeleteTargetProfile] =
    useState<BadgeProfileRecord | null>(null)

  const filteredProfiles = useMemo(
    () =>
      filterBadgeProfiles(profiles, searchQuery, badgeGroupFilter, statusFilter),
    [badgeGroupFilter, profiles, searchQuery, statusFilter],
  )

  useEffect(() => {
    const state = location.state as
      | {
          showBadgeProfileSavedToast?: boolean
          showBadgeProfileUpdatedToast?: boolean
        }
      | null

    if (state?.showBadgeProfileSavedToast) {
      showToast('Badge profile saved successfully.')
    } else if (state?.showBadgeProfileUpdatedToast) {
      showToast('Badge profile updated successfully.')
    } else {
      return
    }

    navigate(
      {
        pathname: location.pathname,
        search: location.search,
      },
      { replace: true, state: null },
    )
  }, [location.pathname, location.search, location.state, navigate, showToast])

  function handleDeleteProfile(profileId: string) {
    deleteProfile(profileId)
    showToast('The selected badge profile was removed from the list.')
  }

  function handleEditProfile(profile: BadgeProfileRecord) {
    navigate(`/badge-profiles/${profile.id}/edit`)
  }

  return (
    <TooltipProvider>
      <main>
        <PageHeader
          title="Badge Profile Management"
          description="This module allows you to create, manage, and configure badge profiles."
        />

        <div className="mt-5 grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-3 lg:col-span-3">
            <label
              htmlFor="search-badge-profile"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Search Badge Profile
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="search-badge-profile"
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search Badge Profile"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm shadow-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20"
              />
            </div>
          </div>

          <div className="col-span-12 md:col-span-3 lg:col-span-3">
            <label
              htmlFor="filter-badge-group"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Badge Group
            </label>
            <div className="relative">
              <select
                id="filter-badge-group"
                value={badgeGroupFilter}
                onChange={(event) => setBadgeGroupFilter(event.target.value)}
                className="flex h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm shadow-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20"
              >
                {BADGE_GROUP_FILTER_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronsUpDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          <div className="col-span-12 md:col-span-3 lg:col-span-3">
            <label
              htmlFor="filter-badge-profile-status"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Status
            </label>
            <div className="relative">
              <select
                id="filter-badge-profile-status"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="flex h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm shadow-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20"
              >
                {BADGE_PROFILE_STATUS_FILTER_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronsUpDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          <div className="col-span-12 flex items-end md:col-span-3 lg:col-span-3">
            <Button type="button" variant="default" className="h-10 gap-2" asChild>
              <Link to="/badge-profiles/create">
                <Plus className="size-4" />
                Add Badge Profile
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-md border border-border bg-card">
          {filteredProfiles.length === 0 ? (
            <div className="p-6">
              <EmptyState
                title="No Badge Profiles Found"
                description="Try adjusting your filters or create a new Badge Profile."
                action={
                  <Button type="button" variant="default" className="h-10 gap-2" asChild>
                    <Link to="/badge-profiles/create">
                      <Plus className="size-4" />
                      Add Badge Profile
                    </Link>
                  </Button>
                }
              />
            </div>
          ) : (
            <div className="relative w-full overflow-x-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="border-b border-border bg-zinc-100">
                  <tr>
                    {TABLE_COLUMNS.map((column) => (
                      <th
                        key={column}
                        className="h-10 whitespace-nowrap px-3 text-left align-middle text-sm font-medium text-foreground"
                      >
                        <div className="inline-flex items-center gap-1">
                          <span>{column}</span>
                          {column !== 'Actions' ? (
                            <ChevronsUpDown className="size-3.5 text-muted-foreground" />
                          ) : null}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredProfiles.map((profile, index) => (
                    <tr
                      key={profile.id}
                      className={cn(
                        'border-b border-border transition-colors',
                        index % 2 === 0 ? 'bg-background' : 'bg-zinc-50',
                      )}
                    >
                      <td className="whitespace-nowrap px-3 py-3 align-middle text-sm text-foreground">
                        {profile.profileName}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 align-middle">
                        <BadgeGroupCell profile={profile} />
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 align-middle">
                        <BadgeProfileIdCell profile={profile} />
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 align-middle text-sm">
                        <button
                          type="button"
                          onClick={() => setAssignedBadgesProfile(profile)}
                          className="text-primary underline-offset-4 hover:underline"
                        >
                          {formatAssignedBadgesLabel(profile.assignedBadges)}
                        </button>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 align-middle">
                        <LastModifiedCell profile={profile} />
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 align-middle">
                        <StatusBadge status={profile.status} />
                      </td>
                      <td className="whitespace-nowrap p-1 align-middle">
                        <BadgeProfileManagementActions
                          profile={profile}
                          permissions={badgeProfilePermissions}
                          onEdit={handleEditProfile}
                          onAssign={() => setAssignProfile(profile)}
                          onDelete={() => setDeleteTargetProfile(profile)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex flex-col gap-3 border-t border-border px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="text-foreground">
              {filteredProfiles.length} Record(s) Fetched.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Rows per page</span>
                <select
                  defaultValue="10"
                  disabled
                  className="h-8 rounded-md border border-input bg-background px-2 text-sm"
                >
                  <option value="10">10</option>
                </select>
              </div>

              <span className="text-muted-foreground">Page 1 of 1</span>

              <div className="flex items-center gap-1">
                {[
                  { label: 'First page', Icon: ChevronsLeft, enabled: false },
                  { label: 'Previous page', Icon: ChevronLeft, enabled: false },
                  { label: 'Next page', Icon: ChevronRight, enabled: false },
                  { label: 'Last page', Icon: ChevronsRight, enabled: false },
                ].map(({ label, Icon, enabled }) => (
                  <button
                    key={label}
                    type="button"
                    aria-label={label}
                    disabled
                    className={cn(
                      'inline-flex size-8 items-center justify-center rounded-md border',
                      enabled
                        ? 'border-primary text-primary'
                        : 'border-primary/30 text-primary/40',
                    )}
                  >
                    <Icon className="size-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <BadgeProfileAssignedBadgesDialog
          profile={assignedBadgesProfile}
          open={assignedBadgesProfile != null}
          onOpenChange={(open) => {
            if (!open) {
              setAssignedBadgesProfile(null)
            }
          }}
        />

        <BadgeProfileAssignDialog
          profile={assignProfile}
          open={assignProfile != null}
          onOpenChange={(open) => {
            if (!open) {
              setAssignProfile(null)
            }
          }}
        />

        <BadgeProfileDeleteDialog
          profile={deleteTargetProfile}
          open={deleteTargetProfile != null}
          onOpenChange={(open) => {
            if (!open) {
              setDeleteTargetProfile(null)
            }
          }}
          onConfirmDelete={handleDeleteProfile}
        />
      </main>
    </TooltipProvider>
  )
}
