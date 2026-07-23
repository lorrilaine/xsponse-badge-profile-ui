import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  Pencil,
  Plus,
  Search,
  Trash2,
} from 'lucide-react'

import { PageHeader } from '@/app/components/layout/PageHeader'
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import {
  BADGE_GROUP_FILTER_OPTIONS,
  BADGE_PROFILE_STATUS_FILTER_OPTIONS,
  filterBadgeProfiles,
  MOCK_BADGE_PROFILES,
  type BadgeProfileStatus,
} from '@/app/features/badge-profiles/badge-profile-mock-data'
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

function BadgeProfileActionButton({
  children,
  label,
  className,
  onClick,
  disabled = false,
}: {
  children: ReactNode
  label: string
  className?: string
  onClick?: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <span
        className={cn(
          'inline-flex size-8 items-center justify-center rounded-md border border-transparent',
          className,
        )}
      >
        {children}
      </span>
    </button>
  )
}

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

export function BadgeProfileManagementPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [badgeGroupFilter, setBadgeGroupFilter] = useState<string>(
    BADGE_GROUP_FILTER_OPTIONS[0],
  )
  const [statusFilter, setStatusFilter] = useState<string>(
    BADGE_PROFILE_STATUS_FILTER_OPTIONS[0],
  )

  const filteredProfiles = useMemo(
    () =>
      filterBadgeProfiles(
        MOCK_BADGE_PROFILES,
        searchQuery,
        badgeGroupFilter,
        statusFilter,
      ),
    [badgeGroupFilter, searchQuery, statusFilter],
  )

  return (
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
          <Button type="button" variant="default" className="h-10 gap-2" disabled>
            <Plus className="size-4" />
            Add Badge Profile
          </Button>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-md border border-border bg-card">
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
                  <td className="whitespace-nowrap px-3 py-3 align-middle text-sm text-muted-foreground">
                    {profile.badgeGroupId}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 align-middle text-sm text-muted-foreground">
                    {profile.badgeProfileId}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 align-middle text-sm text-muted-foreground">
                    {profile.assignedBadges}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 align-middle text-sm text-muted-foreground">
                    {profile.lastModified}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 align-middle">
                    <StatusBadge status={profile.status} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 align-middle">
                    <div className="flex items-center gap-1">
                      <BadgeProfileActionButton
                        label="Edit badge profile"
                        className="text-sky-500"
                        disabled
                      >
                        <Pencil className="size-4" />
                      </BadgeProfileActionButton>
                      <BadgeProfileActionButton
                        label="Delete badge profile"
                        className="text-primary"
                        disabled
                      >
                        <Trash2 className="size-4" />
                      </BadgeProfileActionButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
    </main>
  )
}
