/**
 * Standard contextual help metadata for Badge Profile configuration fields.
 * Use this shape for every field tooltip across the Badge Profile Editor.
 */
export type BadgeProfileFieldHelp = {
  /** Field display name shown as the tooltip title. */
  title: string
  /** Firmware variable name from the Badge Profile specification. */
  variable: string
  /** Storage size from the Badge Profile specification. */
  byteLength: string
  /** Field description from the Badge Profile specification. */
  description: string
  /** Allowed numeric range from the Badge Profile specification. */
  allowedRange?: string
  /** Allowed discrete values from the Badge Profile specification. */
  allowedValues?: string
  /**
   * Optional specification notes for special behavior or dependencies.
   * Omit when the specification defines no special rules.
   */
  notes?: string
}

export type BadgeProfileInputUnit =
  | 'seconds'
  | 'milliseconds'
  | 'presses'
  | 'times'
  | 'bytes'
  | 'flashes'
  | 'activations'

/** Consistent documentation-card width for all Badge Profile field tooltips. */
export const BADGE_PROFILE_TOOLTIP_WIDTH_CLASSNAME =
  'w-[320px] min-w-[300px] max-w-[min(340px,calc(100vw-2rem))]'
