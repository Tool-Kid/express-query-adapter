import { QueryBuilderFactory } from './factory';
import {
  ProfileType,
  QueryAdapter,
  QueryAdapterType,
  QueryBuilderReturnType,
  QueryDialectType,
  QueryDialect,
} from './types';

interface Config<Adapter> {
  adapter: Adapter;
  dialect?: QueryDialectType;
  profile?: ProfileType;
}

export async function getQueryAdapter<Adapter extends QueryAdapterType>(
  config: Config<Adapter>
): Promise<QueryBuilderReturnType<Adapter>> {
  const factory = new QueryBuilderFactory();
  const queryBuilder = await factory.build({
    adapter: config.adapter as QueryAdapter,
    dialect: config.dialect as QueryDialect,
    profile: config.profile,
  });
  return queryBuilder;
}
