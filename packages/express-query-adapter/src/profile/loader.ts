import { ConfigProfile } from './config-profile';
import { DISABLED_PROFILE, ENABLED_PROFILE } from './defaults';

export class ProfileLoader {
  public load(profile?: 'enabled' | 'disabled' | ConfigProfile): ConfigProfile {
    if (!profile) {
      return ENABLED_PROFILE;
    }
    switch (profile) {
      case 'enabled':
        return ENABLED_PROFILE;
      case 'disabled':
        return DISABLED_PROFILE;
      default:
        return profile;
    }
  }
}
