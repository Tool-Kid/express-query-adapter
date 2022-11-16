import { LookupDelimiter, LookupFilter } from './field/lookup.enum';
import { FieldFilter } from './field/field-filter';
import { AbstractFilter } from './filter';
import { TypeORMQuery } from '../query';

interface FilterFactoryQuery {
  query: TypeORMQuery;
  key: string;
  value: string;
}

export class FilterFactory {
  public get(query: FilterFactoryQuery): AbstractFilter {
    if (!this.isFieldFilter(query.key)) {
      return;
    }
    const prop = this.getProp(query);
    const hasNotOperator = this.hasNotOperator(query);
    const lookup = this.getLookupFilter(query, hasNotOperator);
    return new FieldFilter({
      query: query.query,
      prop,
      lookup,
      value: query.value,
      notOperator: hasNotOperator,
    });
  }

  private getLookupFilter(
    query: FilterFactoryQuery,
    hasNotOperator: boolean
  ): LookupFilter {
    const includesLookupDelimiter = query.key.includes(
      LookupDelimiter.LOOKUP_DELIMITER
    );
    if (!includesLookupDelimiter) {
      return LookupFilter.EXACT;
    }
    return query.key.split(LookupDelimiter.LOOKUP_DELIMITER)[
      hasNotOperator ? 2 : 1
    ] as LookupFilter;
  }

  private getProp(query: FilterFactoryQuery) {
    return query.key.split(LookupDelimiter.LOOKUP_DELIMITER)[0];
  }

  private hasNotOperator(query: FilterFactoryQuery) {
    return query.key.includes(
      `${LookupDelimiter.LOOKUP_DELIMITER}${LookupFilter.NOT}`
    );
  }

  private isFieldFilter(key: string): boolean {
    if (!key.includes(LookupDelimiter.RELATION_DELIMITER)) {
      return true;
    }
    return false;
  }
}
