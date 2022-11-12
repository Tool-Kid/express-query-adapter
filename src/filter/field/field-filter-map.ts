import { LookupFilter } from './lookup.enum'
import { LookupBuilder } from './lookup'
import {
  BetweenLookup,
  ContainsLookup,
  EndsWithLookup,
  ExactLookup,
  GreaterThanLookup,
  GreaterThanOrEqualLookup,
  InLookup,
  InsensitiveContainsLookup,
  InsensitiveEndsWithLookup,
  InsensitiveStartsWithLookup,
  IsNullLookup,
  LowerThanLookup,
  LowerThanOrEqualLookup,
  StartsWithLookup,
} from './lookups'

export const LOOKUP_FILTER_MAP: Map<LookupFilter, LookupBuilder> = new Map([
  [LookupFilter.EXACT, new ExactLookup()],
  [LookupFilter.CONTAINS, new ContainsLookup()],
  [LookupFilter.STARTS_WITH, new StartsWithLookup()],
  [LookupFilter.ENDS_WITH, new EndsWithLookup()],
  [LookupFilter.ICONTAINS, new InsensitiveContainsLookup()],
  [LookupFilter.ISTARTS_WITH, new InsensitiveStartsWithLookup()],
  [LookupFilter.IENDS_WITH, new InsensitiveEndsWithLookup()],
  [LookupFilter.IS_NULL, new IsNullLookup()],
  [LookupFilter.LT, new LowerThanLookup()],
  [LookupFilter.LTE, new LowerThanOrEqualLookup()],
  [LookupFilter.GT, new GreaterThanLookup()],
  [LookupFilter.GTE, new GreaterThanOrEqualLookup()],
  [LookupFilter.IN, new InLookup()],
  [LookupFilter.BETWEEN, new BetweenLookup()],
])
