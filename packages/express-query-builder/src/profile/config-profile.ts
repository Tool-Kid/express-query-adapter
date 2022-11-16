import { FindPolicyType } from './find-policy';
import { ProfileOptions } from './profile-options';

export interface ConfigProfile {
  options: ProfileOptions;
  policy: FindPolicyType;
}
