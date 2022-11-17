import { LookupBuilderFactory } from './lookup-builder-factory';
import { Not } from 'typeorm';
import { AbstractFilter } from '../filter';
import { LookupFilter } from './lookup.enum';
import { ExpressQuery } from '../../../express-query';
import { TypeORMQuery } from '../../query';

interface FilterConfig {
  query: ExpressQuery;
  prop: string;
  lookup: LookupFilter;
  value: string;
  notOperator?: boolean;
}

export class FieldFilter extends AbstractFilter {
  private readonly notOperator: boolean;
  private readonly lookupBuilderFactory: LookupBuilderFactory =
    new LookupBuilderFactory();

  constructor(config: FilterConfig) {
    super(config.query, config.prop, config.lookup, config.value);
    this.notOperator = config.notOperator || false;
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
    const builder = this.lookupBuilderFactory.build(this.lookup);
    const queryToAdd = builder.build(this.prop, this.value);
    if (this.notOperator) {
      queryToAdd[this.prop] = Not(queryToAdd[this.prop]);
    }
    return queryToAdd;
  }
}
