import { QueryAdapter } from './express-query-builder'
import { TypeORMQueryBuilder } from './typeorm/query-builder'

export type QueryBuilderReturnType<Adapter extends QueryAdapter> =
  Adapter extends 'typeorm' ? TypeORMQueryBuilder : unknown
