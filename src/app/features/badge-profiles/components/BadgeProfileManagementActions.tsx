import { Download, Link2, Pencil, Trash2 } from 'lucide-react'

import { TableActionButton } from '@/app/components/enterprise/table-action-button'
import {
  BADGE_PROFILE_DOWNLOAD_ACTION_ENABLED,
  type BadgeProfilePermissions,
} from '@/app/features/badge-profiles/badge-profile-permissions'
import type { BadgeProfileRecord } from '@/app/features/badge-profiles/badge-profile-mock-data'

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
  return (
    <div className="flex flex-row items-center justify-end gap-1">
      {permissions.canEditBadgeProfile ? (
        <TableActionButton
          label="Edit Badge Profile"
          variant="info"
          onClick={() => onEdit(profile)}
        >
          <Pencil className="size-5" />
        </TableActionButton>
      ) : null}

      {permissions.canAssignBadgeProfile ? (
        <TableActionButton
          label="Assign Profile to Badge"
          variant="assign"
          onClick={() => onAssign(profile)}
        >
          <Link2 className="size-5" />
        </TableActionButton>
      ) : null}

      {!BADGE_PROFILE_DOWNLOAD_ACTION_ENABLED ? (
        <TableActionButton
          label="Download Profile"
          tooltip="Available in a future release."
          variant="warning"
          disabled
        >
          <Download className="size-5" />
        </TableActionButton>
      ) : null}

      {permissions.canDeleteBadgeProfile ? (
        <TableActionButton
          label="Delete Badge Profile"
          variant="destructive"
          onClick={() => onDelete(profile)}
        >
          <Trash2 className="size-5" />
        </TableActionButton>
      ) : null}
    </div>
  )
}
