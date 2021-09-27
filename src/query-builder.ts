import { FindManyOptions, FindOneOptions } from 'typeorm';
import { FilterFactory } from './filter/filter-factory';
import { OptionsContainer } from './filter/options/container';

export class QueryBuilder {

  private expressQuery: any;
  private typeORMQuery: any;

  private readonly findOptions: OptionsContainer;
  private readonly filterFactory: FilterFactory;

  constructor(expressQuery: any) {
    this.expressQuery = expressQuery;
    this.typeORMQuery = {};
    this.findOptions = new OptionsContainer();
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
