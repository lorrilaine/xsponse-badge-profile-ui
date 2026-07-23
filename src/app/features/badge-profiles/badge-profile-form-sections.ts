export const BADGE_CONFIGURATION_SECTIONS = [
  {
    id: 'beacon-settings',
    title: 'Beacon Settings',
    description: 'Configure beacon transmission intervals used by the badge.',
  },
  {
    id: 'tracking-settings',
    title: 'Tracking Settings',
    description: 'Configure continuous tracking behavior.',
  },
  {
    id: 'status-update-settings',
    title: 'Status Update Settings',
    description: 'Configure badge status reporting intervals.',
  },
  {
    id: 'wakeup-settings',
    title: 'Wakeup Settings',
    description: 'Configure badge wake-up timing and listening intervals.',
  },
  {
    id: 'alert-mode-1',
    title: 'Alert Mode 1 Configuration',
    description: 'Configure activation behavior for Alert Mode 1.',
  },
  {
    id: 'alert-mode-2',
    title: 'Alert Mode 2 Configuration',
    description: 'Configure activation behavior for Alert Mode 2.',
  },
  {
    id: 'alert-mode-3',
    title: 'Alert Mode 3 Configuration',
    description: 'Configure activation behavior for Alert Mode 3.',
  },
  {
    id: 'clear-button',
    title: 'Clear Button Configuration',
    description: 'Configure how badge alerts are cleared.',
  },
  {
    id: 'filter-settings',
    title: 'Filter Settings',
    description: 'Configure badge filtering parameters.',
  },
] as const

export const BADGE_GROUP_SELECT_OPTIONS = [
  { value: 'BG-1001', label: 'BG-1001 - Executive Access' },
  { value: 'BG-1002', label: 'BG-1002 - Visitor Standard' },
  { value: 'BG-1003', label: 'BG-1003 - Contractor Limited' },
  { value: 'BG-1004', label: 'BG-1004 - Emergency Response' },
] as const
