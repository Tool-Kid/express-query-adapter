import { ConfigProfile } from './profile';
import { TypeORMQueryBuilder } from './typeorm/query-builder';
import { TypeORMQueryDialect } from './typeorm/query-dialect';

export enum QueryAdapter {
  TYPEORM = 'typeorm',
}
export type QueryDialect = `${TypeORMQueryDialect}`;

export type ProfileType = 'enabled' | 'disabled' | ConfigProfile;
export type QueryAdapterType = `${QueryAdapter}`;

export type QueryDialectType<Adapter> =
  Adapter extends `${QueryAdapter.TYPEORM}` ? `${TypeORMQueryDialect}` : never;

export type QueryBuilderReturnType<Adapter> =
  Adapter extends `${QueryAdapter.TYPEORM}` ? TypeORMQueryBuilder : unknown;
