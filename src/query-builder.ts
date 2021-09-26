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
      this.expressQuery = query.expressQuery;
      this.typeORMQuery = this.typeORMQuery;
    }

    this.setOrder();
    this.setRelations();

    for (const queryItem in this.expressQuery) {
      const filter = factory.get(this.typeORMQuery, queryItem, this.expressQuery[queryItem]);
      filter.buildQuery();
    }

    return this.typeORMQuery;
  }

  private setOrder() {
    if (!this.expressQuery['order']) {
      return;
    }
    const orderFields = this.expressQuery['order'].split(',');
    for (const field of orderFields) {
      const orderCriteria = this.getOrderCriteria(field);
      this.typeORMQuery['order'] = {
        ...this.typeORMQuery['order'],
        [field.substr(1, field.length)]: orderCriteria
      }
    }
    delete this.expressQuery['order'];
  }

  private setRelations() {
    if (!this.expressQuery['with']) {
      return;
    }

    const relations = this.expressQuery['with'].split(',');
    this.typeORMQuery['relations'] = relations;

    delete this.expressQuery['with'];
  }

  private getOrderCriteria(field: string): string {
    if (field.startsWith('+')) {
      return 'ASC';
    } else if (field.startsWith('-')) {
      return 'DESC';
    } else {
      throw new Error(`No order set for <${field}>. Prefix with one of these: [+, -]`);
    }
  }
}
