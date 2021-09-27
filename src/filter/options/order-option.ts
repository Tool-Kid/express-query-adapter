import { FilterOption } from "./filter-option";

export class OrderOption extends FilterOption {

  public setOption(
    query: { expressQuery: any, typeORMQuery: any }
  ): void {
    if (!query.expressQuery['order']) {
      return;
    }
    const orderFields = query.expressQuery['order'].split(',');
    for (const field of orderFields) {
      const orderCriteria = this.getOrderCriteria(field);
      query.typeORMQuery['order'] = {
        ...query.typeORMQuery['order'],
        [field.substr(1, field.length)]: orderCriteria
      }
    }
    delete query.expressQuery['order'];
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
