import { ConfigProfile, ProfileLoader } from './profile';
import { ExpressQuery } from './express-query';

export abstract class QueryBuilder<Query> {
  protected readonly profile: ConfigProfile;
  private readonly profileLoader: ProfileLoader = new ProfileLoader();

  constructor(profile?: ConfigProfile) {
    this.profile = this.profileLoader.load(profile);
  }

  abstract build(expressQuery: ExpressQuery): Query;
}
