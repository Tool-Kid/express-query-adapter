import { FilterOption } from "./filter-option";

export class SelectOption extends FilterOption {

  public setOption(
    query: { expressQuery: any; typeORMQuery: any; }
  ): void {
    if (!query.expressQuery['select']) {
      return;
    }

    const fields = query.expressQuery['select'].split(',');
    query.typeORMQuery['select'] = fields;

    delete query.expressQuery['select'];
  }

}
