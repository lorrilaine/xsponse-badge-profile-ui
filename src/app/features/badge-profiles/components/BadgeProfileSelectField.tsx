import { ChevronsUpDown } from 'lucide-react'

import { FormMessage } from '@/app/components/ui/form-field'
import type { BadgeProfileFieldHelp } from '@/app/features/badge-profiles/badge-profile-field-types'
import { BadgeProfileFieldLabel } from '@/app/features/badge-profiles/components/BadgeProfileFieldLabel'
import { cn } from '@/app/utils'

const SELECT_CLASS_NAME =
  'flex h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm shadow-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20 disabled:cursor-not-allowed'

type BadgeProfileSelectOption = {
  value: string
  label: string
}

type BadgeProfileSelectFieldProps = {
  id: string
  name: string
  label: string
  help: BadgeProfileFieldHelp
  value: string
  options: BadgeProfileSelectOption[]
  onChange: (value: string) => void
  onBlur?: () => void
  disabled?: boolean
  error?: string
  className?: string
}

export function BadgeProfileSelectField({
  id,
  name,
  label,
  help,
  value,
  options,
  onChange,
  onBlur,
  disabled = false,
  error,
  className,
}: BadgeProfileSelectFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <BadgeProfileFieldLabel htmlFor={id} label={label} help={help} />

      <div className={cn('relative', disabled && 'opacity-60')}>
        <select
          id={id}
          name={name}
          value={value}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          onBlur={onBlur}
          onChange={(event) => onChange(event.target.value)}
          className={SELECT_CLASS_NAME}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronsUpDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      </div>

      <div className="min-h-5">
        {error ? <FormMessage message={error} /> : null}
      </div>
    </div>
  )
}
