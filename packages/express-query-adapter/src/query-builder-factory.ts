import {
  QueryAdapter,
  QueryDialect,
  ProfileType,
  QueryBuilderReturnType,
} from './types';

interface QueryBuilderConfig {
  adapter: QueryAdapter;
  dialect?: QueryDialect;
  profile?: ProfileType;
}

export class QueryBuilderFactory {
  public async build(
    config: QueryBuilderConfig
  ): Promise<QueryBuilderReturnType<QueryAdapter>> {
    switch (config.adapter) {
      case QueryAdapter.TYPEORM:
        return import('./typeorm/query-builder')
          .then((m) => m.TypeORMQueryBuilder)
          .then(
            (qb) =>
              new qb({
                dialect: config.dialect,
                profile: config.profile,
              })
          );
      default:
        throw new Error(`No adapter found for ${config.adapter}`);
    }
  }
}
