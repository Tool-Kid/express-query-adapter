import { QueryBuilderFactory } from './factory';
import { ConfigProfile } from './profile';
import { QueryBuilderReturnType } from './return-type';

interface Config<Adapter> {
  adapter: Adapter;
  profile?: ProfileType;
}

export type ProfileType = 'enabled' | 'disabled' | ConfigProfile;
export type QueryAdapter = 'typeorm';

export function getQueryAdapter<Adapter extends QueryAdapter>(
  config: Config<Adapter>
): QueryBuilderReturnType<Adapter> {
  const factory = new QueryBuilderFactory();
  const queryBuilder = factory.build(config.adapter, config.profile);
  return queryBuilder;
}
