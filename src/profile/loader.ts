import { ConfigProfile } from './config-profile'
import { DISABLED_PROFILE, ENABLED_PROFILE } from './defaults'

export const loadProfile = (
  profile: 'enabled' | 'disabled' | ConfigProfile
): ConfigProfile => {
  if (!profile) {
    return ENABLED_PROFILE
  }
  if (profile === 'enabled') {
    return ENABLED_PROFILE
  } else if (profile === 'disabled') {
    return DISABLED_PROFILE
  } else {
    return profile
  }
}
