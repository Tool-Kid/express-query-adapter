import { ExpressQuery } from './express-query'
import { QueryBuilderFactory } from './factory'
import { QueryBuilder } from './query-builder'
import { ConfigProfile } from './profile'

interface Config {
  strategy: Strategy
  profile?: ProfileType
}

export type ProfileType = 'enabled' | 'disabled' | ConfigProfile
export type Strategy = 'typeorm'

export class ExpressQueryBuilder {
  private readonly config: Config
  private readonly queryBuilder: QueryBuilder<unknown>

  constructor(config: Config) {
    this.config = config
    const factory = new QueryBuilderFactory()
    this.queryBuilder = factory.build(config.strategy, config.profile)
  }

  public build(expressQuery: ExpressQuery) {
    return this.queryBuilder.build(expressQuery)
  }
}
