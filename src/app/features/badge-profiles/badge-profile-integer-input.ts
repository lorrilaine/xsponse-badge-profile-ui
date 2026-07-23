import type { KeyboardEvent } from 'react'

const ALLOWED_CONTROL_KEYS = new Set([
  'Backspace',
  'Delete',
  'Tab',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'Home',
  'End',
])

const ALLOWED_SHORTCUT_KEYS = new Set(['a', 'c', 'v', 'x'])

function isShortcutKey(event: KeyboardEvent<HTMLInputElement>) {
  return (
    (event.ctrlKey || event.metaKey) &&
    ALLOWED_SHORTCUT_KEYS.has(event.key.toLowerCase())
  )
}

/**
 * Restricts keyboard entry to whole positive integers for Badge Profile fields.
 * Paste and shortcut-based input are allowed; validation handles invalid pasted values.
 */
export function handleBadgeProfileIntegerInputKeyDown(
  event: KeyboardEvent<HTMLInputElement>,
) {
  if (isShortcutKey(event) || ALLOWED_CONTROL_KEYS.has(event.key)) {
    return
  }

  if (/^\d$/.test(event.key)) {
    return
  }

  event.preventDefault()
}
