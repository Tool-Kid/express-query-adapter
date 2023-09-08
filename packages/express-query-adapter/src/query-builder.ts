import { ConfigProfile, ProfileLoader } from './profile';
import { ExpressQuery } from './express-query';
import { QueryDialect, ProfileType } from './types';

export abstract class QueryBuilder<Query> {
  protected readonly profile: ConfigProfile;
  protected readonly dialect?: QueryDialect;

  private readonly profileLoader: ProfileLoader = new ProfileLoader();

  constructor({
    dialect,
    profile,
  }: {
    dialect?: QueryDialect;
    profile?: ProfileType;
  }) {
    this.profile = this.profileLoader.load(profile);
    this.dialect = dialect;
  }

  abstract build(expressQuery: ExpressQuery): Query;
}
