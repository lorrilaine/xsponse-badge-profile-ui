import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog'
import type { BadgeProfileRecord } from '@/app/features/badge-profiles/badge-profile-mock-data'

type BadgeProfileAssignDialogProps = {
  profile: BadgeProfileRecord | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BadgeProfileAssignDialog({
  profile,
  open,
  onOpenChange,
}: BadgeProfileAssignDialogProps) {
  if (!profile) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Profile to Badge</DialogTitle>
          <DialogDescription>
            Select badges to assign {profile.profileName} ({profile.badgeProfileId}). Badge
            assignment workflow will be connected when the backend service is available.
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          This placeholder dialog confirms the assign action entry point for the selected badge
          profile.
        </p>
      </DialogContent>
    </Dialog>
  )
}
