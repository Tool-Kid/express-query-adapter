import { AbstractFilter } from './filter';
import { LookupFilter } from './lookup.enum';
import { Like, IsNull, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, In, Between } from 'typeorm';

export class FieldFilter extends AbstractFilter {

  constructor(query: any, prop: string, lookup: LookupFilter, value: string) {
    super(query, prop, lookup, value);
  }

  public buildQuery() {

    let queryToAdd;

    switch(this.lookup) {
      case LookupFilter.EXACT:
        queryToAdd = { [this.prop]: this.value };
        break;
      case LookupFilter.CONTAINS:
        queryToAdd = { [this.prop]: Like(`%${this.value}%`) };
        break;
      case LookupFilter.STARTS_WITH:
        queryToAdd = { [this.prop]: Like(`${this.value}%`) };
        break;
      case LookupFilter.ENDS_WITH:
        queryToAdd = { [this.prop]: Like(`%${this.value}`) };
        break;
      case LookupFilter.IS_NULL:
        queryToAdd = { [this.prop]: IsNull() };
        break;
      case LookupFilter.LT:
        queryToAdd = { [this.prop]: LessThan(this.value) };
        break;
      case LookupFilter.LTE:
        queryToAdd = { [this.prop]: LessThanOrEqual(this.value) };
        break;
      case LookupFilter.GT:
        queryToAdd = { [this.prop]: MoreThan(this.value) };
        break;
      case LookupFilter.GTE:
        queryToAdd = { [this.prop]: MoreThanOrEqual(this.value) };
        break;
      case LookupFilter.IN:
        queryToAdd = { [this.prop]: In(this.value.split(',')) };
        break;
      case LookupFilter.BETWEEN:
        const rangeValues = this.value.split(',');
        queryToAdd = { [this.prop]: Between(+rangeValues[0], +rangeValues[1]) };
        break;
    }
    this.query['where'] = {
      ...this.query['where'],
      ...queryToAdd
    }
  }
}

