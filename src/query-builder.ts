import { ExpressQuery } from './express-query'
import { FindManyOptions } from 'typeorm'
import { TypeORMQuery } from './typeorm-query'
import { FilterFactory } from './filter/filter-factory'
import { OptionsCollection } from './filter/options/container'
import { ConfigProfile } from './profile/config-profile'
import { loadProfile } from './profile/loader'

export class QueryBuilder {
  private expressQuery: ExpressQuery
  private typeORMQuery: TypeORMQuery

  private readonly profile: ConfigProfile
  private readonly findOptions: OptionsCollection
  private readonly filterFactory: FilterFactory

  constructor(
    expressQuery: ExpressQuery,
    profile?: 'enabled' | 'disabled' | ConfigProfile
  ) {
    this.expressQuery = expressQuery
    this.typeORMQuery = {}
    this.profile = loadProfile(profile)
    this.findOptions = new OptionsCollection()
    this.filterFactory = new FilterFactory()
  }

  public build(): FindManyOptions {
    for (const option of this.findOptions.options) {
      option.setOption(
        {
          source: this.expressQuery,
          target: this.typeORMQuery,
        },
        this.profile
      )
    }

    for (const queryItem in this.expressQuery) {
      const filter = this.filterFactory.get({
        query: this.typeORMQuery,
        key: queryItem,
        value: this.expressQuery[queryItem],
      })
      filter.buildQuery()
    }

    return this.typeORMQuery
  }
}
