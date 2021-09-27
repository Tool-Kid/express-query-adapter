import { ITEMS_PER_PAGE } from "../../default-config";
import { FilterOption } from "./filter-option";

export class PaginationOption extends FilterOption {

  public setOption(
    query: { expressQuery: any, typeORMQuery: any }
  ): void {
    if (
      query.expressQuery['pagination'] === undefined ||
      query.expressQuery['pagination'] === true
    ) {
      query.typeORMQuery['skip'] = (query.expressQuery['page'] && query.expressQuery['page'] > 1)
        ? ( query.expressQuery['page'] - 1) * ( query.expressQuery['limit'] || ITEMS_PER_PAGE)
        : 0;
      delete query.expressQuery['page'];
      query.typeORMQuery['take'] = (query.expressQuery['limit'] && query.expressQuery['limit'] > 0)
        ? query.expressQuery['limit']
        : ITEMS_PER_PAGE;
      delete query.expressQuery['limit'];
    }
    delete query.expressQuery['pagination'];
  }

}
