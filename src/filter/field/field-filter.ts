import { LookupBuilderFactory } from './lookup-builder-factory'
import { Not } from 'typeorm'
import { AbstractFilter } from '../filter'
import { LookupFilter } from './lookup.enum'
import { ExpressQuery } from '../../express-query'
import { TypeORMQuery } from '../../typeorm-query'

interface FilterConfig {
  query: ExpressQuery
  prop: string
  lookup: LookupFilter
  value: string
  notOperator?: boolean
}

export class FieldFilter extends AbstractFilter {
  private readonly notOperator: boolean
  private readonly lookupBuilderFactory: LookupBuilderFactory

  constructor(config: FilterConfig) {
    super(config.query, config.prop, config.lookup, config.value)
    this.notOperator = config.notOperator
    this.lookupBuilderFactory = new LookupBuilderFactory()
  }

  public buildQuery(): void {
    let queryToAdd: TypeORMQuery = {}

    queryToAdd = this.setQuery(queryToAdd)

    if (this.notOperator) {
      queryToAdd[this.prop] = Not(queryToAdd[this.prop])
    }

    this.query['where'] = {
      ...this.query['where'],
      ...queryToAdd,
    }
  }

  private setQuery(queryToAdd: TypeORMQuery) {
    const builder = this.lookupBuilderFactory.build(this.lookup)
    queryToAdd = builder.build(this.prop, this.value)
    return queryToAdd
  }
}
