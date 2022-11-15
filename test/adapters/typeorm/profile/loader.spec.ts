import { ConfigProfile } from '../../../../src/profile/config-profile'
import {
  DISABLED_PROFILE,
  ENABLED_PROFILE,
} from '../../../../src/profile/defaults'
import { ProfileLoader } from '../../../../src/profile/loader'

describe('Profile loader', () => {
  const loader = new ProfileLoader()

  it('should return ENABLED_PROFILE when no profile provided', () => {
    expect(loader.load(null as any)).toEqual(ENABLED_PROFILE)
  })
  it('should return ENABLED_PROFILE when "enabled" strategy provided', () => {
    expect(loader.load('enabled')).toEqual(ENABLED_PROFILE)
  })
  it('should return DISABLED_PROFILE when "disabled" strategy provided', () => {
    expect(loader.load('disabled')).toEqual(DISABLED_PROFILE)
  })
  it('should return a custom profile when provided', () => {
    const customProfile: ConfigProfile = {
      ...ENABLED_PROFILE,
      options: {
        ...ENABLED_PROFILE.options,
        ordering: { status: 'disabled' },
      },
    }
    expect(loader.load(customProfile)).toEqual(customProfile)
  })
})
