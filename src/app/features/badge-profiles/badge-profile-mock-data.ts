export type BadgeProfileStatus = 'Active' | 'Inactive' | 'Draft'

export type BadgeProfileLastModifiedDetails = {
  modifiedBy: string
  date: string
  time: string
}

export type BadgeProfileRecord = {
  id: string
  profileName: string
  badgeGroupId: string
  badgeGroupName?: string
  badgeProfileId: string
  badgeProfileVersion?: number
  assignedBadges: number
  assignedBadgeLabels?: string[]
  lastModified: string
  lastModifiedDetails?: BadgeProfileLastModifiedDetails
  status: BadgeProfileStatus
}

function createAssignedBadgeLabels(count: number, profileId: string): string[] {
  if (count === 0) {
    return []
  }

  const previewCount = Math.min(count, 8)

  return Array.from(
    { length: previewCount },
    (_, index) => `Badge ${profileId.toUpperCase()}-${String(index + 1).padStart(3, '0')}`,
  )
}

export const BADGE_GROUP_NAME_BY_ID: Record<string, string> = {
  'BG-1001': 'Executive Staff',
  'BG-1002': 'Visitor',
  'BG-1003': 'Contractor',
  'BG-1004': 'Emergency Response',
}

export const BADGE_GROUP_FILTER_OPTIONS = [
  'All Badge Groups',
  'BG-1001 - Executive Staff',
  'BG-1002 - Visitor',
  'BG-1003 - Contractor',
  'BG-1004 - Emergency Response',
] as const

export const BADGE_PROFILE_STATUS_FILTER_OPTIONS = [
  'All Statuses',
  'Active',
  'Inactive',
  'Draft',
] as const

export const MOCK_BADGE_PROFILES: BadgeProfileRecord[] = [
  {
    id: 'bp_001',
    profileName: 'Executive Access Profile',
    badgeGroupId: 'BG-1001',
    badgeProfileId: 'BP-24001',
    assignedBadges: 48,
    assignedBadgeLabels: createAssignedBadgeLabels(48, 'bp_001'),
    lastModified: 'Jan 15, 2026 09:42 AM',
    lastModifiedDetails: {
      modifiedBy: 'Jordan Lee',
      date: 'Jan 15, 2026',
      time: '09:42 AM',
    },
    status: 'Active',
  },
  {
    id: 'bp_002',
    profileName: 'Visitor Standard Profile',
    badgeGroupId: 'BG-1002',
    badgeProfileId: 'BP-24002',
    assignedBadges: 126,
    assignedBadgeLabels: createAssignedBadgeLabels(126, 'bp_002'),
    lastModified: 'Feb 03, 2026 02:18 PM',
    lastModifiedDetails: {
      modifiedBy: 'Alex Morgan',
      date: 'Feb 03, 2026',
      time: '02:18 PM',
    },
    status: 'Active',
  },
  {
    id: 'bp_003',
    profileName: 'Contractor Limited Profile',
    badgeGroupId: 'BG-1003',
    badgeProfileId: 'BP-24003',
    assignedBadges: 34,
    assignedBadgeLabels: createAssignedBadgeLabels(34, 'bp_003'),
    lastModified: 'Mar 01, 2026 11:05 AM',
    lastModifiedDetails: {
      modifiedBy: 'Taylor Brooks',
      date: 'Mar 01, 2026',
      time: '11:05 AM',
    },
    status: 'Draft',
  },
  {
    id: 'bp_004',
    profileName: 'Emergency Response Profile',
    badgeGroupId: 'BG-1004',
    badgeProfileId: 'BP-24004',
    assignedBadges: 18,
    assignedBadgeLabels: createAssignedBadgeLabels(18, 'bp_004'),
    lastModified: 'Mar 12, 2026 04:27 PM',
    status: 'Active',
  },
  {
    id: 'bp_005',
    profileName: 'After Hours Access Profile',
    badgeGroupId: 'BG-1001',
    badgeProfileId: 'BP-24005',
    assignedBadges: 12,
    assignedBadgeLabels: createAssignedBadgeLabels(12, 'bp_005'),
    lastModified: 'Mar 18, 2026 08:51 AM',
    status: 'Inactive',
  },
  {
    id: 'bp_006',
    profileName: 'Temporary Event Profile',
    badgeGroupId: 'BG-1002',
    badgeProfileId: 'BP-24006',
    assignedBadges: 64,
    assignedBadgeLabels: createAssignedBadgeLabels(64, 'bp_006'),
    lastModified: 'Mar 21, 2026 01:33 PM',
    status: 'Active',
  },
  {
    id: 'bp_007',
    profileName: 'Maintenance Staff Profile',
    badgeGroupId: 'BG-1003',
    badgeProfileId: 'BP-24007',
    assignedBadges: 0,
    assignedBadgeLabels: [],
    lastModified: 'Mar 22, 2026 10:14 AM',
    status: 'Draft',
  },
  {
    id: 'bp_008',
    profileName: 'Security Supervisor Profile',
    badgeGroupId: 'BG-1004',
    badgeProfileId: 'BP-24008',
    assignedBadges: 9,
    assignedBadgeLabels: createAssignedBadgeLabels(9, 'bp_008'),
    lastModified: 'Mar 23, 2026 03:46 PM',
    status: 'Active',
  },
]

export function filterBadgeProfiles(
  profiles: BadgeProfileRecord[],
  searchQuery: string,
  badgeGroupFilter: string,
  statusFilter: string,
) {
  const normalizedQuery = searchQuery.trim().toLowerCase()

  return profiles.filter((profile) => {
    const matchesSearch =
      normalizedQuery.length === 0 ||
      profile.profileName.toLowerCase().includes(normalizedQuery) ||
      profile.badgeProfileId.toLowerCase().includes(normalizedQuery) ||
      profile.badgeGroupId.toLowerCase().includes(normalizedQuery)

    const matchesBadgeGroup =
      badgeGroupFilter === 'All Badge Groups' ||
      profile.badgeGroupId === badgeGroupFilter.split(' - ')[0]

    const matchesStatus =
      statusFilter === 'All Statuses' || profile.status === statusFilter

    return matchesSearch && matchesBadgeGroup && matchesStatus
  })
}
