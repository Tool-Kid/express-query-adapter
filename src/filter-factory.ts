import { LookupDelimiter, LookupFilter } from './lookup.enum';
import { FieldFilter } from './field-filter';
import { AbstractFilter } from './filter';

export class FilterFactory {

  public get(query: any, key: string, value: string): AbstractFilter {
    if (this.isFieldFilter(key)) {
      const field = key.split(LookupDelimiter.LOOKUP_DELIMITER)[0];
      const notQuery = key.includes(`${LookupDelimiter.LOOKUP_DELIMITER}${LookupFilter.NOT}`);
      const lookup = key.includes(LookupDelimiter.LOOKUP_DELIMITER)
        ? key.split(LookupDelimiter.LOOKUP_DELIMITER)[notQuery ? 2 : 1] as LookupFilter
        : LookupFilter.EXACT;
      return new FieldFilter(query, field, lookup, value, notQuery);
    }
  }

  private isFieldFilter(key: string): boolean {
    if (!key.includes(LookupDelimiter.RELATION_DELIMITER)) {
      return true;
    }
    return false;
  }
}
