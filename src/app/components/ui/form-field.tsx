import type { ReactNode } from 'react'

import { Label } from '@/app/components/ui/label'
import { cn } from '@/app/utils'

type FormFieldProps = {
  label?: string
  htmlFor?: string
  required?: boolean
  description?: string
  error?: string
  children: ReactNode
  className?: string
}

export function FormField({
  label,
  htmlFor,
  required = false,
  description,
  error,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {label ? (
        <Label htmlFor={htmlFor} required={required}>
          {label}
        </Label>
      ) : null}
      {children}
      {description && !error ? (
        <p className="text-xs text-muted-foreground">{description}</p>
      ) : null}
      {error ? <FormMessage message={error} /> : null}
    </div>
  )
}

type FormMessageProps = {
  message: string
  className?: string
}

export function FormMessage({ message, className }: FormMessageProps) {
  return (
    <p className={cn('text-xs font-medium text-destructive', className)}>
      {message}
    </p>
  )
}
