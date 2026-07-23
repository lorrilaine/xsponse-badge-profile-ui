import { Info } from 'lucide-react'

import { Button } from '@/app/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog'
import { getBadgeGroupName } from '@/app/features/badge-profiles/badge-profile-list-formatters'
import type { BadgeProfileRecord } from '@/app/features/badge-profiles/badge-profile-mock-data'

type BadgeProfileAssignDialogProps = {
  profile: BadgeProfileRecord | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Placeholder dialog for the future Assign Profile to Badge workflow.
 *
 * TODO:
 * - Backend/API integration pending
 * - Badge selection workflow pending product specification
 * - Assignment save operation pending implementation
 */
export function BadgeProfileAssignDialog({
  profile,
  open,
  onOpenChange,
}: BadgeProfileAssignDialogProps) {
  if (!profile) {
    return null
  }

  const badgeGroupName =
    getBadgeGroupName(profile.badgeGroupId, profile.badgeGroupName) ?? profile.badgeGroupId

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Assign Profile to Badge</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-md border border-border bg-zinc-50 p-4">
            <p className="mb-3 text-sm font-medium text-foreground">Selected Badge Profile</p>
            <dl className="grid gap-3 sm:grid-cols-1">
              <div className="space-y-1">
                <dt className="text-xs font-medium text-muted-foreground">Profile Name</dt>
                <dd className="text-sm text-foreground">{profile.profileName}</dd>
              </div>
              <div className="space-y-1">
                <dt className="text-xs font-medium text-muted-foreground">Badge Profile ID</dt>
                <dd className="text-sm text-foreground">{profile.badgeProfileId}</dd>
              </div>
              <div className="space-y-1">
                <dt className="text-xs font-medium text-muted-foreground">Badge Group</dt>
                <dd className="text-sm text-foreground">{badgeGroupName}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-md border border-dashed border-border bg-card px-6 py-8 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Info className="size-6" strokeWidth={1.75} />
            </div>
            <h3 className="mt-4 text-base font-semibold text-foreground">Coming Soon</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              The Badge Assignment workflow will allow administrators to associate this Badge
              Profile with one or more badges.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              The detailed assignment experience, validation rules, and backend integration will
              be implemented in a future iteration once the complete specification is available.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
