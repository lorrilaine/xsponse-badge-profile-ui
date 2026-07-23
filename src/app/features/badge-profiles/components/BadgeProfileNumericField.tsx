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
import { BadgeProfileFieldLabel } from '@/app/features/badge-profiles/components/BadgeProfileFieldLabel'
import { cn } from '@/app/utils'

type BadgeProfileNumericFieldProps = {
  id: string
  name: string
  label: string
  help: BadgeProfileFieldHelp
  value: string
  onChange: (value: string) => void
  min: number
  max: number
  unit: BadgeProfileInputUnit
  required?: boolean
  error?: string
  className?: string
}

export function BadgeProfileNumericField({
  id,
  name,
  label,
  help,
  value,
  onChange,
  min,
  max,
  unit,
  required = false,
  error,
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

      <InputGroup>
        <InputGroupInput
          id={id}
          name={name}
          type="number"
          inputMode="numeric"
          value={value}
          min={min}
          max={max}
          required={required}
          aria-invalid={Boolean(error)}
          onChange={(event) => onChange(event.target.value)}
        />
        <InputGroupAddon>{unit}</InputGroupAddon>
      </InputGroup>

      <div className="min-h-5">
        {error ? <FormMessage message={error} /> : null}
      </div>
    </div>
  )
}
