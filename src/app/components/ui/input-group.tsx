import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/app/utils'

function InputGroup({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="input-group"
      className={cn(
        'flex w-full min-w-0 overflow-hidden rounded-md border border-input bg-background shadow-sm transition-[color,box-shadow] focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20 has-[[aria-invalid=true]]:border-destructive/60',
        className,
      )}
      {...props}
    />
  )
}

function InputGroupInput({ className, ...props }: ComponentProps<'input'>) {
  return (
    <input
      data-slot="input-group-input"
      className={cn(
        'flex h-10 min-w-0 flex-1 border-0 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

function InputGroupAddon({
  className,
  children,
  ...props
}: ComponentProps<'div'> & { children: ReactNode }) {
  return (
    <div
      data-slot="input-group-addon"
      aria-hidden="true"
      className={cn(
        'flex h-10 shrink-0 items-center border-l border-input bg-muted/40 px-3 text-sm text-muted-foreground select-none',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { InputGroup, InputGroupAddon, InputGroupInput }
