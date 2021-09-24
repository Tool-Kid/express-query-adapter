import { LOOKUP_FILTER_MAP } from './field-filter-map';
import { Not } from 'typeorm';
import { AbstractFilter } from './filter';
import { LookupFilter } from './lookup.enum';

export class FieldFilter extends AbstractFilter {

  private notOperator: boolean;

  constructor(query: any, prop: string, lookup: LookupFilter, value: string, notOperator: boolean = false) {
    super(query, prop, lookup, value);
    this.notOperator = notOperator;
  }

  public buildQuery() {

    let queryToAdd;

    queryToAdd = this.setQuery(queryToAdd);

    if(this.notOperator) {
      queryToAdd[this.prop] = Not(queryToAdd[this.prop]);
    }

    this.query['where'] = {
      ...this.query['where'],
      ...queryToAdd
    }
  }

  private setQuery(queryToAdd: any) {
    queryToAdd = LOOKUP_FILTER_MAP.get(this.lookup).build(this.prop, this.value);
    return queryToAdd;
  }
}
