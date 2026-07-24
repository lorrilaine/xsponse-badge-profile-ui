import {
  Bell,
  BellRing,
  Crosshair,
  FileText,
  Filter,
  Hand,
  Power,
  RadioTower,
  RefreshCw,
  Siren,
  type LucideIcon,
} from 'lucide-react'

import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog'
import type {
  BadgeProfileReviewSummarySection,
  BadgeProfileReviewSummarySectionStatus,
} from '@/app/features/badge-profiles/badge-profile-review-summary'
import { cn } from '@/app/utils'

type BadgeProfileReviewSummaryDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  sections: BadgeProfileReviewSummarySection[]
  profileTitle: string
}

const REVIEW_SUMMARY_STATUS_BADGES: Record<
  BadgeProfileReviewSummarySectionStatus,
  { label: string; className: string }
> = {
  configured: {
    label: '✓ Configured',
    className: 'border-transparent bg-[#ECFDF5] text-[#16A34A]',
  },
  'partially-configured': {
    label: '⚠ Partially Configured',
    className: 'border-transparent bg-[#FFFBEB] text-[#D97706]',
  },
  disabled: {
    label: 'Disabled',
    className: 'border-transparent bg-[#F3F4F6] text-[#6B7280]',
  },
  'not-configured': {
    label: 'Not Configured',
    className: 'border-transparent bg-[#F8FAFC] text-[#64748B]',
  },
}

type ReviewSummarySectionIconConfig = {
  Icon: LucideIcon
  iconClassName: string
}

const REVIEW_SUMMARY_SECTION_ICONS: Record<string, ReviewSummarySectionIconConfig> = {
  'General Information': {
    Icon: FileText,
    iconClassName: 'text-default-500',
  },
  'Beacon Settings': {
    Icon: RadioTower,
    iconClassName: 'text-info/80',
  },
  'Tracking Settings': {
    Icon: Crosshair,
    iconClassName: 'text-success/80',
  },
  'Status Update Settings': {
    Icon: RefreshCw,
    iconClassName: 'text-info/70',
  },
  'Wakeup Settings': {
    Icon: Power,
    iconClassName: 'text-warning/80',
  },
  'Alert Mode 1': {
    Icon: Bell,
    iconClassName: 'text-primary/70',
  },
  'Alert Mode 2': {
    Icon: BellRing,
    iconClassName: 'text-primary/80',
  },
  'Alert Mode 3': {
    Icon: Siren,
    iconClassName: 'text-destructive/70',
  },
  'Clear Button Settings': {
    Icon: Hand,
    iconClassName: 'text-assign/80',
  },
  'Filter Settings': {
    Icon: Filter,
    iconClassName: 'text-muted-foreground',
  },
}

function getReviewSummarySectionIcon(title: string): ReviewSummarySectionIconConfig {
  return (
    REVIEW_SUMMARY_SECTION_ICONS[title] ?? {
      Icon: FileText,
      iconClassName: 'text-muted-foreground',
    }
  )
}

function SummarySectionCard({
  section,
}: {
  section: BadgeProfileReviewSummarySection
}) {
  const { Icon, iconClassName } = getReviewSummarySectionIcon(section.title)
  const statusBadge = REVIEW_SUMMARY_STATUS_BADGES[section.status]

  return (
    <article className="flex h-full flex-col rounded-md border border-border bg-card shadow-sm">
      <div className="flex items-start justify-between gap-3 border-b border-border px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <Icon
            className={cn('size-[18px] shrink-0', iconClassName)}
            aria-hidden="true"
          />
          <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
        </div>
        <Badge
          variant="outline"
          className={cn(
            'shrink-0 rounded-full px-2.5 py-[2px] text-xs font-semibold',
            statusBadge.className,
          )}
        >
          {statusBadge.label}
        </Badge>
      </div>

      {section.disabled ? null : (
        <dl className="grid flex-1 grid-cols-2 gap-x-4 gap-y-2.5 px-4 py-3">
          {section.fields?.map((field) => (
            <div
              key={`${section.title}-${field.label}`}
              className="contents"
            >
              <dt className="text-sm text-muted-foreground">{field.label}</dt>
              <dd className="text-sm font-medium text-foreground">{field.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </article>
  )
}

export function BadgeProfileReviewSummaryDialog({
  open,
  onOpenChange,
  sections,
  profileTitle,
}: BadgeProfileReviewSummaryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          'flex h-[90vh] max-h-[90vh] w-[90vw] max-w-[1400px] flex-col gap-0 overflow-hidden p-0 sm:max-w-[1400px]',
        )}
      >
        <DialogHeader className="shrink-0 border-b border-border px-6 py-4 text-left">
          <DialogTitle>Review Summary</DialogTitle>
          <DialogDescription>
            Read-only overview of {profileTitle || 'this badge profile'} before saving.
          </DialogDescription>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {sections.map((section) => (
              <SummarySectionCard key={section.title} section={section} />
            ))}
          </div>
        </div>

        <DialogFooter className="shrink-0 border-t border-border px-6 py-4 sm:justify-end">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
