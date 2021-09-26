import { FilterFactory } from './filter/filter-factory';
import { OptionsContainer } from './filter/options/container';

export class QueryBuilder {

  private expressQuery: any;
  private typeORMQuery: any;

  private options: OptionsContainer;

  constructor(expressQuery: any) {
    this.expressQuery = expressQuery;
    this.typeORMQuery = {};
    this.options = new OptionsContainer();
  }

  public build(): any {
    const factory = new FilterFactory();

    for (const option of this.options.options) {
      const query = option.setOption({
        expressQuery: this.expressQuery,
        typeORMQuery: this.typeORMQuery,
      });
      if (query) {
        this.expressQuery = query.expressQuery;
        this.typeORMQuery = this.typeORMQuery;
      }
    }

    this.setRelations();

    for (const queryItem in this.expressQuery) {
      const filter = factory.get(this.typeORMQuery, queryItem, this.expressQuery[queryItem]);
      filter.buildQuery();
    }

    return this.typeORMQuery;
  }

  private setRelations() {
    if (!this.expressQuery['with']) {
      return;
    }

    const relations = this.expressQuery['with'].split(',');
    this.typeORMQuery['relations'] = relations;

    delete this.expressQuery['with'];
  }
}
