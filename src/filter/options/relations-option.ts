import { FilterOption, FilterOptionQuery } from "./filter-option";

export class RelationsOption extends FilterOption {

  public setOption(
    query: FilterOptionQuery
  ): void {
    if (!query.source['with']) {
      return;
    }

    const relations = query.source['with'].split(',');
    query.target['relations'] = relations;

    delete query.source['with'];
  }

}
