import { ExpressQuery } from '../../express-query';
import { LookupFilter } from './field/lookup.enum';

export abstract class AbstractFilter {
  public readonly prop: string;
  public readonly lookup: LookupFilter;
  public readonly value: string;
  public query: ExpressQuery;

  constructor(
    query: ExpressQuery,
    prop: string,
    lookup: LookupFilter,
    value: string
  ) {
    this.query = query;
    this.prop = prop;
    this.lookup = lookup;
    this.value = value;
  }

  public abstract buildQuery(): void;
}
