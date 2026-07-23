import { cn } from '@/app/utils'

type SectionHeaderProps = {
  title: string
  description?: string
  actions?: React.ReactNode
  className?: string
}

export function SectionHeader({
  title,
  description,
  actions,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
    >
      <div>
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        {description ? (
          <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  )
}
