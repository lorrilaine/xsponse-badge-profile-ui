/**
 * Placeholder permission flags for Badge Profile Management actions.
 * Replace with role-based checks when Guardian authorization is wired in.
 */
export type BadgeProfilePermissions = {
  canEditBadgeProfile: boolean
  canAssignBadgeProfile: boolean
  canDeleteBadgeProfile: boolean
}

export const DEFAULT_BADGE_PROFILE_PERMISSIONS: BadgeProfilePermissions = {
  canEditBadgeProfile: true,
  canAssignBadgeProfile: true,
  canDeleteBadgeProfile: true,
}

/** TODO: Enable when product confirms download profile list action vs badge download workflow. */
export const BADGE_PROFILE_DOWNLOAD_ACTION_ENABLED = false
