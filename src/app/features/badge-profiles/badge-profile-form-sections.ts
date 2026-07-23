export type BadgeProfileSectionLayout = 'two-column' | 'single-column'

export type BadgeConfigurationSectionId =
  (typeof BADGE_CONFIGURATION_SECTIONS)[number]['id']

export const BADGE_CONFIGURATION_SECTIONS = [
  {
    id: 'beacon-settings',
    title: 'Beacon Settings',
    navigationLabel: 'Beacon Settings',
    description: 'Beacon transmission intervals.',
    layout: 'two-column',
  },
  {
    id: 'tracking-settings',
    title: 'Tracking Settings',
    navigationLabel: 'Tracking Settings',
    description: 'Continuous location reporting.',
    layout: 'single-column',
  },
  {
    id: 'status-update-settings',
    title: 'Status Update Settings',
    navigationLabel: 'Status Update Settings',
    description: 'Status reporting intervals.',
    layout: 'single-column',
  },
  {
    id: 'wakeup-settings',
    title: 'Wakeup Settings',
    navigationLabel: 'Wakeup Settings',
    description: 'Wake-up and listening timing.',
    layout: 'single-column',
  },
  {
    id: 'alert-mode-1',
    title: 'Alert Mode 1 Configuration',
    navigationLabel: 'Alert Mode 1',
    description: 'Alert Mode 1 activation behavior.',
    layout: 'two-column',
  },
  {
    id: 'alert-mode-2',
    title: 'Alert Mode 2 Configuration',
    navigationLabel: 'Alert Mode 2',
    description: 'Alert Mode 2 activation behavior.',
    layout: 'two-column',
  },
  {
    id: 'alert-mode-3',
    title: 'Alert Mode 3 Configuration',
    navigationLabel: 'Alert Mode 3',
    description: 'Alert Mode 3 activation behavior.',
    layout: 'two-column',
  },
  {
    id: 'clear-button',
    title: 'Clear Button Configuration',
    navigationLabel: 'Clear Button Settings',
    description: 'Alert clear behavior.',
    layout: 'two-column',
  },
  {
    id: 'filter-settings',
    title: 'Filter Settings',
    navigationLabel: 'Filter Settings',
    description: 'Badge filtering parameters.',
    layout: 'single-column',
  },
] as const satisfies ReadonlyArray<{
  id: string
  title: string
  navigationLabel: string
  description: string
  layout: BadgeProfileSectionLayout
}>

export const DEFAULT_BADGE_CONFIGURATION_SECTION_ID: BadgeConfigurationSectionId =
  'beacon-settings'

export function getBadgeConfigurationSection(sectionId: BadgeConfigurationSectionId) {
  return BADGE_CONFIGURATION_SECTIONS.find((section) => section.id === sectionId)
}

export const BADGE_GROUP_SELECT_OPTIONS = [
  { value: 'BG-1001', label: 'BG-1001 - Executive Access' },
  { value: 'BG-1002', label: 'BG-1002 - Visitor Standard' },
  { value: 'BG-1003', label: 'BG-1003 - Contractor Limited' },
  { value: 'BG-1004', label: 'BG-1004 - Emergency Response' },
] as const
