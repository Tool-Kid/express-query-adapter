import { TypeORMQueryBuilder } from './typeorm/query-builder'
import { ProfileType, Strategy } from './express-query-builder'

export class QueryBuilderFactory {
  public build(strategy: Strategy, profile: ProfileType): TypeORMQueryBuilder {
    switch (strategy) {
      case 'typeorm':
        return new TypeORMQueryBuilder({}, profile)
      default:
        return new TypeORMQueryBuilder({}, profile)
    }
  }
}
