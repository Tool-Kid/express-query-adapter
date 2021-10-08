import { LookupDelimiter, LookupFilter } from './field/lookup.enum'
import { FieldFilter } from './field/field-filter'
import { AbstractFilter } from './filter'
import { TypeORMQuery } from '../typeorm-query'

interface FilterFactoryQuery {
  query: TypeORMQuery
  key: string
  value: string
}

export class FilterFactory {
  public get(query: FilterFactoryQuery): AbstractFilter {
    if (this.isFieldFilter(query.key)) {
      const prop = query.key.split(LookupDelimiter.LOOKUP_DELIMITER)[0]
      const notOperator = query.key.includes(
        `${LookupDelimiter.LOOKUP_DELIMITER}${LookupFilter.NOT}`
      )
      const lookup = query.key.includes(LookupDelimiter.LOOKUP_DELIMITER)
        ? (query.key.split(LookupDelimiter.LOOKUP_DELIMITER)[
            notOperator ? 2 : 1
          ] as LookupFilter)
        : LookupFilter.EXACT
      return new FieldFilter({
        query: query.query,
        prop,
        lookup,
        value: query.value,
        notOperator,
      })
    }
  }

  private isFieldFilter(key: string): boolean {
    if (!key.includes(LookupDelimiter.RELATION_DELIMITER)) {
      return true
    }
    return false
  }
}
