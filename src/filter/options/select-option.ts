import { FilterOption, FilterOptionQuery } from "./filter-option";

export class SelectOption extends FilterOption {

  public setOption(
    query: FilterOptionQuery
  ): void {
    if (!query.source['select']) {
      return;
    }

    const fields = query.source['select'].split(',');
    query.target['select'] = fields;

    delete query.source['select'];
  }

}
