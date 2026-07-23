import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import type { BadgeProfileRecord } from '@/app/features/badge-profiles/badge-profile-mock-data'
import {
  buildBadgeProfileDetail,
  MOCK_BADGE_PROFILE_DETAILS,
  type BadgeProfileDetail,
  type SaveBadgeProfileInput,
} from '@/app/features/badge-profiles/badge-profile-store-data'

function toBadgeProfileRecord(profile: BadgeProfileDetail): BadgeProfileRecord {
  return {
    id: profile.id,
    profileName: profile.profileName,
    badgeGroupId: profile.badgeGroupId,
    badgeGroupName: profile.badgeGroupName,
    badgeProfileId: profile.badgeProfileId,
    badgeProfileVersion: profile.badgeProfileVersion,
    assignedBadges: profile.assignedBadges,
    assignedBadgeLabels: profile.assignedBadgeLabels,
    lastModified: profile.lastModified,
    lastModifiedDetails: profile.lastModifiedDetails,
    status: profile.status,
  }
}

type BadgeProfileContextValue = {
  profiles: BadgeProfileRecord[]
  getProfileById: (id: string) => BadgeProfileDetail | undefined
  saveProfile: (input: SaveBadgeProfileInput) => BadgeProfileDetail
  deleteProfile: (id: string) => void
}

const BadgeProfileContext = createContext<BadgeProfileContextValue | null>(null)

export function BadgeProfileProvider({ children }: { children: ReactNode }) {
  const [profileDetails, setProfileDetails] = useState<BadgeProfileDetail[]>(
    MOCK_BADGE_PROFILE_DETAILS,
  )

  const profiles = useMemo(
    () => profileDetails.map(toBadgeProfileRecord),
    [profileDetails],
  )

  const getProfileById = useCallback(
    (id: string) => profileDetails.find((profile) => profile.id === id),
    [profileDetails],
  )

  const saveProfile = useCallback((input: SaveBadgeProfileInput) => {
    let savedRecord: BadgeProfileDetail | null = null

    setProfileDetails((current) => {
      const existing = input.id
        ? current.find((profile) => profile.id === input.id)
        : undefined
      const record = buildBadgeProfileDetail(input, existing)
      savedRecord = record
      const existingIndex = current.findIndex((profile) => profile.id === record.id)

      if (existingIndex === -1) {
        return [...current, record]
      }

      return current.map((profile, index) =>
        index === existingIndex ? record : profile,
      )
    })

    if (!savedRecord) {
      throw new Error('Failed to save badge profile.')
    }

    return savedRecord
  }, [])

  const deleteProfile = useCallback((id: string) => {
    setProfileDetails((current) => current.filter((profile) => profile.id !== id))
  }, [])

  const value = useMemo(
    () => ({
      profiles,
      getProfileById,
      saveProfile,
      deleteProfile,
    }),
    [profiles, getProfileById, saveProfile, deleteProfile],
  )

  return (
    <BadgeProfileContext.Provider value={value}>
      {children}
    </BadgeProfileContext.Provider>
  )
}

export function useBadgeProfiles() {
  const context = useContext(BadgeProfileContext)

  if (!context) {
    throw new Error('useBadgeProfiles must be used within BadgeProfileProvider')
  }

  return context
}
