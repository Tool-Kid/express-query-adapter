import { ExpressQuery } from './express-query';
import { FindManyOptions } from 'typeorm';
import { TypeORMQuery } from './typeorm-query';
import { FilterFactory } from './filter/filter-factory';
import { OptionsCollection } from './filter/options/container';

export class QueryBuilder {

  private expressQuery: ExpressQuery;
  private typeORMQuery: TypeORMQuery;

  private readonly findOptions: OptionsCollection;
  private readonly filterFactory: FilterFactory;

  constructor(expressQuery: ExpressQuery) {
    this.expressQuery = expressQuery;
    this.typeORMQuery = {};
    this.findOptions = new OptionsCollection();
    this.filterFactory = new FilterFactory();
  }

  public build(): FindManyOptions {

    for (const option of this.findOptions.options) {
      option.setOption({
        expressQuery: this.expressQuery,
        typeORMQuery: this.typeORMQuery,
      });
    }

    for (const queryItem in this.expressQuery) {
      const filter = this.filterFactory.get({
        query: this.typeORMQuery,
        key: queryItem,
        value: this.expressQuery[queryItem]
      });
      filter.buildQuery();
    }

    return this.typeORMQuery;
  }

}
