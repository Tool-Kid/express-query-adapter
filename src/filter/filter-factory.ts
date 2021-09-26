import { LookupDelimiter, LookupFilter } from './field/lookup.enum';
import { FieldFilter } from './field/field-filter';
import { AbstractFilter } from './filter';

export class FilterFactory {

  public get(query: any, key: string, value: string): AbstractFilter {
    if (this.isFieldFilter(key)) {
      const prop = key.split(LookupDelimiter.LOOKUP_DELIMITER)[0];
      const notOperator = key.includes(`${LookupDelimiter.LOOKUP_DELIMITER}${LookupFilter.NOT}`);
      const lookup = key.includes(LookupDelimiter.LOOKUP_DELIMITER)
        ? key.split(LookupDelimiter.LOOKUP_DELIMITER)[notOperator ? 2 : 1] as LookupFilter
        : LookupFilter.EXACT;
      return new FieldFilter({ query, prop, lookup, value, notOperator });
    }
  }

  private isFieldFilter(key: string): boolean {
    if (!key.includes(LookupDelimiter.RELATION_DELIMITER)) {
      return true;
    }
    return false;
  }
}
