import { ITEMS_PER_PAGE } from "../../default-config";
import { FilterOption, FilterOptionQuery } from "./filter-option";

export class PaginationOption extends FilterOption {

  public setOption(
    query: FilterOptionQuery
  ): void {
    if (
      query.source['pagination'] === undefined ||
      query.source['pagination'] === true
    ) {
      query.target['skip'] = (query.source['page'] && query.source['page'] > 1)
        ? ( query.source['page'] - 1) * ( query.source['limit'] || ITEMS_PER_PAGE)
        : 0;
      delete query.source['page'];
      query.target['take'] = (query.source['limit'] && query.source['limit'] > 0)
        ? query.source['limit']
        : ITEMS_PER_PAGE;
      delete query.source['limit'];
    }
    delete query.source['pagination'];
  }

}
