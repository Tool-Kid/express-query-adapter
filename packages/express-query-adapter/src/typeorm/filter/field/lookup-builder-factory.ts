import { LookupFilter } from './lookup.enum';
import { LookupBuilder } from './lookup';
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
} from './lookups';
import { TypeORMQueryDialect } from '../../query-dialect';

const LOOKUP_FILTER_MAP_FACTORY = (config: {
  dialect?: TypeORMQueryDialect;
}): Map<LookupFilter, LookupBuilder> =>
  new Map([
    [LookupFilter.EXACT, new ExactLookup(config)],
    [LookupFilter.CONTAINS, new ContainsLookup(config)],
    [LookupFilter.STARTS_WITH, new StartsWithLookup(config)],
    [LookupFilter.ENDS_WITH, new EndsWithLookup(config)],
    [LookupFilter.ICONTAINS, new InsensitiveContainsLookup(config)],
    [LookupFilter.ISTARTS_WITH, new InsensitiveStartsWithLookup(config)],
    [LookupFilter.IENDS_WITH, new InsensitiveEndsWithLookup(config)],
    [LookupFilter.IS_NULL, new IsNullLookup(config)],
    [LookupFilter.LT, new LowerThanLookup(config)],
    [LookupFilter.LTE, new LowerThanOrEqualLookup(config)],
    [LookupFilter.GT, new GreaterThanLookup(config)],
    [LookupFilter.GTE, new GreaterThanOrEqualLookup(config)],
    [LookupFilter.IN, new InLookup(config)],
    [LookupFilter.BETWEEN, new BetweenLookup(config)],
  ]);

export class LookupBuilderFactory {
  private readonly getLookupMap = LOOKUP_FILTER_MAP_FACTORY;

  build({
    lookup,
    dialect,
  }: {
    lookup: LookupFilter;
    dialect?: TypeORMQueryDialect;
  }): LookupBuilder {
    const builder = this.getLookupMap({ dialect }).get(lookup);
    if (!builder) {
      throw new Error(`Unsupported lookup ${lookup}`);
    }
    return builder;
  }
}
