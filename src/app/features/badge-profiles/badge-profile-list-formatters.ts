import type {
  BadgeProfileLastModifiedDetails,
  BadgeProfileRecord,
} from '@/app/features/badge-profiles/badge-profile-mock-data'
import { BADGE_GROUP_NAME_BY_ID } from '@/app/features/badge-profiles/badge-profile-mock-data'

export function getBadgeGroupName(
  badgeGroupId: string,
  badgeGroupName?: string,
): string | undefined {
  if (badgeGroupName) {
    return badgeGroupName
  }

  return BADGE_GROUP_NAME_BY_ID[badgeGroupId]
}

export function formatBadgeProfileVersionLabel(
  profile: Pick<BadgeProfileRecord, 'badgeProfileId' | 'badgeProfileVersion'>,
): string {
  if (profile.badgeProfileVersion != null) {
    return `Version ${profile.badgeProfileVersion}`
  }

  const versionMatch = profile.badgeProfileId.match(/BP-(\d{2})/)

  if (versionMatch) {
    return `Version ${Number(versionMatch[1])}`
  }

  return 'Version —'
}

export function formatAssignedBadgesLabel(count: number): string {
  return `${count} Badge${count === 1 ? '' : 's'}`
}

export function getLastModifiedDetails(
  profile: BadgeProfileRecord,
): BadgeProfileLastModifiedDetails {
  if (profile.lastModifiedDetails) {
    return profile.lastModifiedDetails
  }

  const [month, day, year, ...timeParts] = profile.lastModified.replace(',', '').split(' ')

  return {
    modifiedBy: 'System Administrator',
    date: [month, day, year].filter(Boolean).join(' '),
    time: timeParts.join(' ') || profile.lastModified,
  }
}
