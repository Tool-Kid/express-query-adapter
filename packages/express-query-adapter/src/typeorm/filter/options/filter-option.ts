import { TypeORMQuery } from '../../query';
import { ExpressQuery } from '../../../express-query';
import { ConfigProfile } from '../../../profile/config-profile';

export interface FilterOptionQuery {
  source: ExpressQuery;
  target: TypeORMQuery;
}

export interface FilterOption {
  setOption(query: FilterOptionQuery, profile: ConfigProfile): void;
  isAuthorized(profile: ConfigProfile): boolean;
}
