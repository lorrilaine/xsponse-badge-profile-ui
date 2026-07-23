import { Loader2 } from 'lucide-react'

import { cn } from '@/app/utils'

type SpinnerProps = {
  className?: string
  label?: string
}

export function Spinner({ className, label = 'Loading' }: SpinnerProps) {
  return (
    <div className="flex items-center justify-center" role="status">
      <Loader2
        className={cn('size-5 animate-spin text-primary', className)}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </div>
  )
}

type LoadingOverlayProps = {
  label?: string
  className?: string
}

export function LoadingOverlay({
  label = 'Loading',
  className,
}: LoadingOverlayProps) {
  return (
    <div
      className={cn(
        'absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-background/70 backdrop-blur-[1px]',
        className,
      )}
    >
      <Spinner label={label} className="size-6" />
    </div>
  )
}
