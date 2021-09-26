import { LookupFilter } from './field/lookup.enum';

export abstract class AbstractFilter {

  public readonly prop: string;
  public readonly lookup: LookupFilter;
  public readonly value: string;
  public query: any;

  constructor(query:any, prop: string, lookup: LookupFilter, value: string) {
    this.query = query;
    this.prop = prop;
    this.lookup = lookup;
    this.value = value;
  }

  public abstract buildQuery();

}
