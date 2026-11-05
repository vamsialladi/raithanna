const CURRENT_PROFILE_KEY = 'raithanna:current-profile'

function getAccountKey(roleId, mobile) {
  return `raithanna:account:${roleId}:${mobile}`
}

function parseProfile(value) {
  if (!value) {
    return null
  }

  try {
    const profile = JSON.parse(value)
    if (
      typeof profile.name === 'string' &&
      typeof profile.roleId === 'string' &&
      typeof profile.roleName === 'string' &&
      typeof profile.mobile === 'string'
    ) {
      return profile
    }
  } catch (error) {
    if (!(error instanceof SyntaxError)) {
      throw error
    }
  }

  return null
}

export function getCurrentProfile() {
  return parseProfile(localStorage.getItem(CURRENT_PROFILE_KEY))
}

export function getRegisteredProfile(roleId, mobile) {
  return parseProfile(localStorage.getItem(getAccountKey(roleId, mobile)))
}

export function saveProfile(profile) {
  const serializedProfile = JSON.stringify(profile)
  localStorage.setItem(getAccountKey(profile.roleId, profile.mobile), serializedProfile)
  localStorage.setItem(CURRENT_PROFILE_KEY, serializedProfile)
}

export function clearCurrentProfile() {
  localStorage.removeItem(CURRENT_PROFILE_KEY)
}
