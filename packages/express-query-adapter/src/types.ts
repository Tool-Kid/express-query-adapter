import { ConfigProfile } from './profile';
import { TypeORMQueryBuilder } from './typeorm/query-builder';

export enum QueryAdapter {
  TYPEORM = 'typeorm',
}
export enum QueryDialect {
  MONGODB = 'mongodb',
}

export type ProfileType = 'enabled' | 'disabled' | ConfigProfile;
export type QueryAdapterType = `${QueryAdapter}`;
export type QueryDialectType = `${QueryDialect}`;

export type QueryBuilderReturnType<Adapter> =
  Adapter extends `${QueryAdapter.TYPEORM}` ? TypeORMQueryBuilder : unknown;
