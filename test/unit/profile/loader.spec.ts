import { ConfigProfile } from '../../../src/profile/config-profile'
import {
  DISABLED_PROFILE,
  ENABLED_PROFILE,
} from '../../../src/profile/defaults'
import { loadProfile } from '../../../src/profile/loader'

describe('Profile loader', () => {
  const qb = loadProfile

  it('should return ENABLED_PROFILE when no profile provided', () => {
    expect(qb(null)).toEqual(ENABLED_PROFILE)
  })
  it('should return ENABLED_PROFILE when "enabled" strategy provided', () => {
    expect(qb('enabled')).toEqual(ENABLED_PROFILE)
  })
  it('should return DISABLED_PROFILE when "disabled" strategy provided', () => {
    expect(qb('disabled')).toEqual(DISABLED_PROFILE)
  })
  it('should return a custom profile when provided', () => {
    const customProfile: ConfigProfile = {
      ...ENABLED_PROFILE,
      options: {
        ...ENABLED_PROFILE.options,
        ordering: { status: 'disabled' },
      },
    }
    expect(qb(customProfile)).toEqual(customProfile)
  })
})
