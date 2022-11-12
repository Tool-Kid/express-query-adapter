import { LookupFilter } from './lookup.enum'
import {
  Like,
  ILike,
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

export const LOOKUP_FILTER_MAP: Map<LookupFilter, BuildQueryFunction> = new Map([
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
    LookupFilter.ICONTAINS,
    {
      build: (prop, value) => ({ [prop]: ILike(`%${value}%`) }),
    },
  ],
  [
    LookupFilter.ISTARTS_WITH,
    {
      build: (prop, value) => ({ [prop]: ILike(`${value}%`) }),
    },
  ],
  [
    LookupFilter.IENDS_WITH,
    {
      build: (prop, value) => ({ [prop]: ILike(`%${value}`) }),
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
        const isoDateRegex =
          /^(?:[+-]?\d{4}(?!\d{2}\b))(?:(-?)(?:(?:0[1-9]|1[0-2])(?:\1(?:[12]\d|0[1-9]|3[01]))?|W(?:[0-4]\d|5[0-2])(?:-?[1-7])?|(?:00[1-9]|0[1-9]\d|[12]\d{2}|3(?:[0-5]\d|6[1-6])))(?:[T\s](?:(?:(?:[01]\d|2[0-3])(?:(:?)[0-5]\d)?|24:?00)(?:[.,]\d+(?!:))?)?(?:\2[0-5]\d(?:[.,]\d+)?)?(?:[zZ]|(?:[+-])(?:[01]\d|2[0-3]):?(?:[0-5]\d)?)?)?)?$/
        const isDate =
          isoDateRegex.test(rangeValues[0]) && isoDateRegex.test(rangeValues[0])
        const { from, to } = isDate
          ? { from: new Date(rangeValues[0]), to: new Date(rangeValues[1]) }
          : { from: +rangeValues[0], to: +rangeValues[1] }
        return { [prop]: Between(from, to) }
      },
    },
  ],
])
