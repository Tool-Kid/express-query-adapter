import { ExpressQuery } from '../../express-query';
import { TypeORMQueryDialect } from '../query-dialect';
import { LookupFilter } from './field/lookup.enum';

interface AbstractFilterConfig {
  query: ExpressQuery;
  dialect?: TypeORMQueryDialect;
  prop: string;
  lookup: LookupFilter;
  value: string;
}

export abstract class AbstractFilter {
  public readonly prop: string;
  public readonly lookup: LookupFilter;
  public readonly value: string;
  public readonly dialect?: TypeORMQueryDialect;
  public query: ExpressQuery;

  constructor({ query, prop, lookup, value, dialect }: AbstractFilterConfig) {
    this.query = query;
    this.prop = prop;
    this.lookup = lookup;
    this.value = value;
    this.dialect = dialect;
  }

  public abstract buildQuery(): void;
}
