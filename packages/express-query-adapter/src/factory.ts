/* eslint-disable no-case-declarations */
import { ProfileType, QueryAdapter } from './express-query-adapter';
import { ProfileLoader } from './profile';
import { QueryBuilderReturnType } from './return-type';

export class QueryBuilderFactory {
  private readonly profileFactory = new ProfileLoader();
  public async build<Adapter extends QueryAdapter>(
    adapter: Adapter,
    profileType?: ProfileType
  ): Promise<QueryBuilderReturnType<Adapter>> {
    const profile = this.profileFactory.load(profileType);
    switch (adapter) {
      case 'typeorm':
        const qb = (await import('./typeorm/query-builder'))
          .TypeORMQueryBuilder;
        return new qb(profile);
      default:
        throw new Error(`No adapter found for ${adapter}`);
    }
  }
}
