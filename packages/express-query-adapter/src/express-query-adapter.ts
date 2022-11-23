import { QueryBuilderFactory } from './factory';
import { ConfigProfile } from './profile';
import { QueryBuilderReturnType } from './return-type';

interface Config<Adapter> {
  adapter: Adapter;
  profile?: ProfileType;
}

export type ProfileType = 'enabled' | 'disabled' | ConfigProfile;
export type QueryAdapter = 'typeorm';

export async function getQueryAdapter<Adapter extends QueryAdapter>(
  config: Config<Adapter>
): Promise<QueryBuilderReturnType<Adapter>> {
  const factory = new QueryBuilderFactory();
  const queryBuilder = await factory.build(config.adapter, config.profile);
  return queryBuilder;
}
