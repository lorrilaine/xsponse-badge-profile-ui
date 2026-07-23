import { FormMessage } from '@/app/components/ui/form-field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/app/components/ui/input-group'
import type {
  BadgeProfileFieldHelp,
  BadgeProfileInputUnit,
} from '@/app/features/badge-profiles/badge-profile-field-types'
import { handleBadgeProfileIntegerInputKeyDown } from '@/app/features/badge-profiles/badge-profile-integer-input'
import { BadgeProfileFieldLabel } from '@/app/features/badge-profiles/components/BadgeProfileFieldLabel'
import { cn } from '@/app/utils'

type BadgeProfileNumericFieldProps = {
  id: string
  name: string
  label: string
  help: BadgeProfileFieldHelp
  value: string
  onChange: (value: string) => void
  unit: BadgeProfileInputUnit
  required?: boolean
  error?: string
  onBlur?: () => void
  disabled?: boolean
  className?: string
}

export function BadgeProfileNumericField({
  id,
  name,
  label,
  help,
  value,
  onChange,
  unit,
  required = false,
  error,
  onBlur,
  disabled = false,
  className,
}: BadgeProfileNumericFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <BadgeProfileFieldLabel
        htmlFor={id}
        label={label}
        required={required}
        help={help}
      />

      <div className={cn(disabled && 'opacity-60')}>
        <InputGroup>
          <InputGroupInput
            id={id}
            name={name}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            pattern="[0-9]*"
            value={value}
            required={required}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            onBlur={onBlur}
            onKeyDown={handleBadgeProfileIntegerInputKeyDown}
            onChange={(event) => onChange(event.target.value)}
          />
          <InputGroupAddon>{unit}</InputGroupAddon>
        </InputGroup>
      </div>

      <div className="min-h-5">
        {error ? <FormMessage message={error} /> : null}
      </div>
    </div>
  )
}
