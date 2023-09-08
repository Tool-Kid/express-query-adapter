import { QueryBuilderFactory } from './factory';
import {
  ProfileType,
  QueryAdapter,
  QueryAdapterType,
  QueryBuilderReturnType,
  QueryDialect,
} from './types';

interface Config<Adapter> {
  adapter: Adapter;
  dialect?: QueryDialect;
  profile?: ProfileType;
}

export async function getQueryAdapter<Adapter extends QueryAdapterType>(
  config: Config<Adapter>
): Promise<QueryBuilderReturnType<Adapter>> {
  const factory = new QueryBuilderFactory();
  const queryBuilder = await factory.build({
    adapter: config.adapter as QueryAdapter,
    dialect: config.dialect,
    profile: config.profile,
  });
  return queryBuilder;
}
