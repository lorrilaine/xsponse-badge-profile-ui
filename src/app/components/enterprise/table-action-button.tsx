import type { ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/app/components/ui/tooltip'
import { cn } from '@/app/utils'

const tableActionButtonVariants = cva(
  'inline-flex h-8 w-8 items-center justify-center !p-1 rounded-md text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-0 disabled:opacity-50 whitespace-nowrap disabled:pointer-events-none [&_svg]:size-5',
  {
    variants: {
      variant: {
        info: 'bg-info/10 text-info hover:bg-info/80 hover:text-info-foreground',
        warning:
          'bg-warning/10 text-warning hover:bg-warning/80 hover:text-warning-foreground',
        destructive:
          'bg-destructive/10 text-destructive hover:bg-destructive/80 hover:text-destructive-foreground',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  },
)

type TableActionButtonProps = {
  label: string
  tooltip?: string
  onClick?: () => void
  disabled?: boolean
  children: ReactNode
  className?: string
} & VariantProps<typeof tableActionButtonVariants>

export function TableActionButton({
  label,
  tooltip,
  onClick,
  disabled = false,
  children,
  variant,
  className,
}: TableActionButtonProps) {
  const tooltipLabel = tooltip ?? label

  const button = (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(tableActionButtonVariants({ variant }), className)}
    >
      {children}
    </button>
  )

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {disabled ? <span className="inline-flex">{button}</span> : button}
      </TooltipTrigger>
      <TooltipContent side="top">{tooltipLabel}</TooltipContent>
    </Tooltip>
  )
}
