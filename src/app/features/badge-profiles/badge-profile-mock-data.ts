export type BadgeProfileStatus = 'Active' | 'Inactive' | 'Draft'

export type BadgeProfileRecord = {
  id: string
  profileName: string
  badgeGroupId: string
  badgeProfileId: string
  assignedBadges: number
  lastModified: string
  status: BadgeProfileStatus
}

export const BADGE_GROUP_FILTER_OPTIONS = [
  'All Badge Groups',
  'BG-1001 - Executive Access',
  'BG-1002 - Visitor Standard',
  'BG-1003 - Contractor Limited',
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
    lastModified: 'Jan 15, 2026 09:42 AM',
    status: 'Active',
  },
  {
    id: 'bp_002',
    profileName: 'Visitor Standard Profile',
    badgeGroupId: 'BG-1002',
    badgeProfileId: 'BP-24002',
    assignedBadges: 126,
    lastModified: 'Feb 03, 2026 02:18 PM',
    status: 'Active',
  },
  {
    id: 'bp_003',
    profileName: 'Contractor Limited Profile',
    badgeGroupId: 'BG-1003',
    badgeProfileId: 'BP-24003',
    assignedBadges: 34,
    lastModified: 'Mar 01, 2026 11:05 AM',
    status: 'Draft',
  },
  {
    id: 'bp_004',
    profileName: 'Emergency Response Profile',
    badgeGroupId: 'BG-1004',
    badgeProfileId: 'BP-24004',
    assignedBadges: 18,
    lastModified: 'Mar 12, 2026 04:27 PM',
    status: 'Active',
  },
  {
    id: 'bp_005',
    profileName: 'After Hours Access Profile',
    badgeGroupId: 'BG-1001',
    badgeProfileId: 'BP-24005',
    assignedBadges: 12,
    lastModified: 'Mar 18, 2026 08:51 AM',
    status: 'Inactive',
  },
  {
    id: 'bp_006',
    profileName: 'Temporary Event Profile',
    badgeGroupId: 'BG-1002',
    badgeProfileId: 'BP-24006',
    assignedBadges: 64,
    lastModified: 'Mar 21, 2026 01:33 PM',
    status: 'Active',
  },
  {
    id: 'bp_007',
    profileName: 'Maintenance Staff Profile',
    badgeGroupId: 'BG-1003',
    badgeProfileId: 'BP-24007',
    assignedBadges: 22,
    lastModified: 'Mar 22, 2026 10:14 AM',
    status: 'Draft',
  },
  {
    id: 'bp_008',
    profileName: 'Security Supervisor Profile',
    badgeGroupId: 'BG-1004',
    badgeProfileId: 'BP-24008',
    assignedBadges: 9,
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
