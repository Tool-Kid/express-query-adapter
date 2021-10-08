import { LookupFilter } from './lookup.enum'
import {
  Like,
  IsNull,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  In,
  Between,
  FindOptionsUtils,
} from 'typeorm'

interface BuildQueryFunction {
  build: (prop: string, value: string) => Record<string, FindOptionsUtils>
}

export const LOOKUP_FILTER_MAP: Map<LookupFilter, BuildQueryFunction> = new Map(
  [
    [
      LookupFilter.EXACT,
      {
        build: (prop, value) => ({ [prop]: value }),
      },
    ],
    [
      LookupFilter.CONTAINS,
      {
        build: (prop, value) => ({ [prop]: Like(`%${value}%`) }),
      },
    ],
    [
      LookupFilter.STARTS_WITH,
      {
        build: (prop, value) => ({ [prop]: Like(`${value}%`) }),
      },
    ],
    [
      LookupFilter.ENDS_WITH,
      {
        build: (prop, value) => ({ [prop]: Like(`%${value}`) }),
      },
    ],
    [
      LookupFilter.IS_NULL,
      {
        build: (prop) => ({ [prop]: IsNull() }),
      },
    ],
    [
      LookupFilter.LT,
      {
        build: (prop, value) => ({ [prop]: LessThan(value) }),
      },
    ],
    [
      LookupFilter.LTE,
      {
        build: (prop, value) => ({ [prop]: LessThanOrEqual(value) }),
      },
    ],
    [
      LookupFilter.GT,
      {
        build: (prop, value) => ({ [prop]: MoreThan(value) }),
      },
    ],
    [
      LookupFilter.GTE,
      {
        build: (prop, value) => ({ [prop]: MoreThanOrEqual(value) }),
      },
    ],
    [
      LookupFilter.IN,
      {
        build: (prop, value) => ({ [prop]: In(value.split(',')) }),
      },
    ],
    [
      LookupFilter.BETWEEN,
      {
        build: (prop, value) => {
          const rangeValues = value.split(',')
          return { [prop]: Between(+rangeValues[0], +rangeValues[1]) }
        },
      },
    ],
  ]
)
