export type BadgeProfileValidationErrors<TField extends string> = Partial<
  Record<TField, string>
>

export type IntegerRangeValidationOptions = {
  label: string
  min: number
  max: number
  required?: boolean
  unitLabel?: string
}

export function buildIntegerRangeValidationMessage(
  min: number,
  max: number,
  unitLabel?: string,
): string {
  const unitSuffix = unitLabel ? ` ${unitLabel}` : ''

  return `Enter a value between ${min} and ${max}${unitSuffix}.`
}

/**
 * Validates a numeric firmware configuration value without modifying user input.
 * Accepts whole numbers within the configured range only.
 */
export function validateIntegerRangeValue(
  value: string,
  {
    label,
    min,
    max,
    required = true,
    unitLabel,
  }: IntegerRangeValidationOptions,
): string | undefined {
  const trimmed = value.trim()
  const rangeMessage = buildIntegerRangeValidationMessage(min, max, unitLabel)

  if (trimmed === '') {
    return required ? `${label} is required.` : undefined
  }

  if (!/^\d+$/.test(trimmed)) {
    return rangeMessage
  }

  const numeric = Number(trimmed)

  if (numeric < min || numeric > max) {
    return rangeMessage
  }

  return undefined
}

export function getVisibleValidationErrors<TField extends string>(
  values: Record<TField, string>,
  touchedFields: Partial<Record<TField, boolean>>,
  fieldNames: readonly TField[],
  validateField: (field: TField, value: string) => string | undefined,
): BadgeProfileValidationErrors<TField> {
  const visibleErrors: BadgeProfileValidationErrors<TField> = {}

  for (const fieldName of fieldNames) {
    if (!touchedFields[fieldName]) {
      continue
    }

    const error = validateField(fieldName, values[fieldName])

    if (error) {
      visibleErrors[fieldName] = error
    }
  }

  return visibleErrors
}

export function markAllFieldsTouched<TField extends string>(
  fieldNames: readonly TField[],
): Record<TField, boolean> {
  return fieldNames.reduce(
    (touched, fieldName) => {
      touched[fieldName] = true
      return touched
    },
    {} as Record<TField, boolean>,
  )
}

export function findFirstInvalidField<TField extends string>(
  errors: BadgeProfileValidationErrors<TField>,
  fieldOrder: readonly TField[],
): TField | undefined {
  return fieldOrder.find((fieldName) => Boolean(errors[fieldName]))
}

export function focusConfigurationField(fieldId: string | undefined) {
  if (!fieldId) {
    return
  }

  queueMicrotask(() => {
    const element = document.getElementById(fieldId)

    if (!(element instanceof HTMLElement)) {
      return
    }

    element.focus()
    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
  })
}
