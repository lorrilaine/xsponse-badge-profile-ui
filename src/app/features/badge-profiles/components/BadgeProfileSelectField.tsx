import { FormMessage } from '@/app/components/ui/form-field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select'
import type { BadgeProfileFieldHelp } from '@/app/features/badge-profiles/badge-profile-field-types'
import { BadgeProfileFieldLabel } from '@/app/features/badge-profiles/components/BadgeProfileFieldLabel'
import { cn } from '@/app/utils'

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

      <div className={cn(disabled && 'opacity-60')}>
        <Select
          name={name}
          value={value}
          disabled={disabled}
          onValueChange={onChange}
        >
          <SelectTrigger
            id={id}
            aria-invalid={Boolean(error)}
            onBlur={onBlur}
            className="h-10 w-full bg-background shadow-sm"
          >
            <SelectValue placeholder="Select option..." />
          </SelectTrigger>
          <SelectContent position="popper" className="z-50">
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="min-h-5">
        {error ? <FormMessage message={error} /> : null}
      </div>
    </div>
  )
}
