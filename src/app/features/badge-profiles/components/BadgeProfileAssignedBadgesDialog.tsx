import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog'
import type { BadgeProfileRecord } from '@/app/features/badge-profiles/badge-profile-mock-data'
import { formatAssignedBadgesLabel } from '@/app/features/badge-profiles/badge-profile-list-formatters'

type BadgeProfileAssignedBadgesDialogProps = {
  profile: BadgeProfileRecord | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BadgeProfileAssignedBadgesDialog({
  profile,
  open,
  onOpenChange,
}: BadgeProfileAssignedBadgesDialogProps) {
  if (!profile) {
    return null
  }

  const assignedBadgeLabels = profile.assignedBadgeLabels ?? []
  const remainingCount = Math.max(profile.assignedBadges - assignedBadgeLabels.length, 0)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assigned Badges</DialogTitle>
          <DialogDescription>
            {formatAssignedBadgesLabel(profile.assignedBadges)} currently assigned to{' '}
            {profile.profileName}.
          </DialogDescription>
        </DialogHeader>

        {profile.assignedBadges === 0 ? (
          <p className="text-sm text-muted-foreground">
            No badges are assigned to this profile yet.
          </p>
        ) : (
          <div className="max-h-64 space-y-2 overflow-y-auto rounded-md border border-border bg-zinc-50 p-3">
            <ul className="space-y-1.5">
              {assignedBadgeLabels.map((badgeLabel) => (
                <li
                  key={badgeLabel}
                  className="rounded-sm bg-background px-3 py-2 text-sm text-foreground"
                >
                  {badgeLabel}
                </li>
              ))}
            </ul>
            {remainingCount > 0 ? (
              <p className="pt-1 text-xs text-muted-foreground">
                And {remainingCount} more badge{remainingCount === 1 ? '' : 's'} not shown in
                this preview.
              </p>
            ) : null}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
