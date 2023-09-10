import { LookupBuilderFactory } from './lookup-builder-factory';
import { Not } from 'typeorm';
import { AbstractFilter } from '../filter';
import { LookupFilter } from './lookup.enum';
import { ExpressQuery } from '../../../express-query';
import { TypeORMQuery } from '../../query';
import { TypeORMQueryDialect } from '../../query-dialect';

interface FilterConfig {
  query: ExpressQuery;
  dialect?: TypeORMQueryDialect;
  prop: string;
  lookup: LookupFilter;
  value: string;
  notOperator?: boolean;
}

export class FieldFilter extends AbstractFilter {
  public readonly notOperator: boolean;
  private readonly lookupBuilderFactory: LookupBuilderFactory =
    new LookupBuilderFactory();

  constructor({
    query,
    prop,
    lookup,
    value,
    dialect,
    notOperator,
  }: FilterConfig) {
    super({ query, prop, lookup, value, dialect });
    this.notOperator = notOperator || false;
  }

  public buildQuery(): void {
    const queryToAdd = this.getQuery();
    this.setQuery(queryToAdd);
  }

  private setQuery(queryToAdd: TypeORMQuery) {
    this.query['where'] = {
      ...this.query['where'],
      ...queryToAdd,
    };
  }

  private getQuery(): TypeORMQuery {
    const builder = this.lookupBuilderFactory.build({
      lookup: this.lookup,
      dialect: this.dialect,
    });
    const queryToAdd = builder.build(this.prop, this.value);
    if (this.notOperator) {
      queryToAdd[this.prop] = Not(queryToAdd[this.prop]);
    }
    return queryToAdd;
  }
}
