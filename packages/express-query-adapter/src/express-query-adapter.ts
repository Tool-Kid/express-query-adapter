import { QueryBuilderFactory } from './query-builder-factory';
import {
  ProfileType,
  QueryAdapter,
  QueryAdapterType,
  QueryBuilderReturnType,
  QueryDialectType,
} from './types';

interface Config<Adapter> {
  adapter: Adapter;
  dialect?: QueryDialectType<Adapter>;
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
