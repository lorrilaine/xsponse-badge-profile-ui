import type { ReactNode } from 'react'
import { Download, Link2, MoreVertical, Pencil } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/app/components/ui/tooltip'
import {
  BADGE_PROFILE_DOWNLOAD_ACTION_ENABLED,
  type BadgeProfilePermissions,
} from '@/app/features/badge-profiles/badge-profile-permissions'
import type { BadgeProfileRecord } from '@/app/features/badge-profiles/badge-profile-mock-data'
import { cn } from '@/app/utils'

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
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={label}
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
      </TooltipTrigger>
      <TooltipContent side="top">{label}</TooltipContent>
    </Tooltip>
  )
}

type BadgeProfileManagementActionsProps = {
  profile: BadgeProfileRecord
  permissions: BadgeProfilePermissions
  onEdit: (profile: BadgeProfileRecord) => void
  onAssign: (profile: BadgeProfileRecord) => void
  onDelete: (profile: BadgeProfileRecord) => void
}

export function BadgeProfileManagementActions({
  profile,
  permissions,
  onEdit,
  onAssign,
  onDelete,
}: BadgeProfileManagementActionsProps) {
  const showMoreActionsMenu =
    !BADGE_PROFILE_DOWNLOAD_ACTION_ENABLED || permissions.canDeleteBadgeProfile

  return (
    <div className="flex min-w-[6.5rem] flex-wrap items-center gap-1">
      {permissions.canEditBadgeProfile ? (
        <BadgeProfileActionButton
          label="Edit Badge Profile"
          className="text-sky-500"
          onClick={() => onEdit(profile)}
        >
          <Pencil className="size-4" />
        </BadgeProfileActionButton>
      ) : null}

      {permissions.canAssignBadgeProfile ? (
        <BadgeProfileActionButton
          label="Assign Profile to Badge"
          className="text-primary"
          onClick={() => onAssign(profile)}
        >
          <Link2 className="size-4" />
        </BadgeProfileActionButton>
      ) : null}

      {showMoreActionsMenu ? (
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label="More Actions"
                  className="inline-flex size-8 items-center justify-center rounded-md border border-transparent text-muted-foreground transition-opacity hover:opacity-80"
                >
                  <MoreVertical className="size-4" />
                </button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side="top">More Actions</TooltipContent>
          </Tooltip>

          <DropdownMenuContent align="end">
            {/* TODO: Enable download when product confirms list-level download workflow. */}
            {!BADGE_PROFILE_DOWNLOAD_ACTION_ENABLED ? (
              <DropdownMenuItem className="gap-2" disabled>
                <Download className="size-4" />
                <span>Download Profile</span>
              </DropdownMenuItem>
            ) : null}

            {permissions.canDeleteBadgeProfile ? (
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => onDelete(profile)}
              >
                <span>Delete Badge Profile</span>
              </DropdownMenuItem>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
    </div>
  )
}
