import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/app/components/ui/alert-dialog'
import type { BadgeProfileRecord } from '@/app/features/badge-profiles/badge-profile-mock-data'
import { formatAssignedBadgesLabel } from '@/app/features/badge-profiles/badge-profile-list-formatters'

type BadgeProfileDeleteDialogProps = {
  profile: BadgeProfileRecord | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirmDelete: (profileId: string) => void
}

export function BadgeProfileDeleteDialog({
  profile,
  open,
  onOpenChange,
  onConfirmDelete,
}: BadgeProfileDeleteDialogProps) {
  if (!profile) {
    return null
  }

  const hasAssignedBadges = profile.assignedBadges > 0

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {hasAssignedBadges ? 'Cannot Delete Badge Profile' : 'Delete Badge Profile?'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {hasAssignedBadges ? (
              <>
                {profile.profileName} cannot be deleted because it is assigned to{' '}
                {formatAssignedBadgesLabel(profile.assignedBadges).toLowerCase()}. Unassign all
                badges before deleting this profile.
              </>
            ) : (
              <>
                This will permanently delete {profile.profileName} ({profile.badgeProfileId}).
                This action cannot be undone.
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {hasAssignedBadges ? (
            <AlertDialogAction onClick={() => onOpenChange(false)}>Close</AlertDialogAction>
          ) : (
            <>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                onClick={() => {
                  onConfirmDelete(profile.id)
                  onOpenChange(false)
                }}
              >
                Delete Badge Profile
              </AlertDialogAction>
            </>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
