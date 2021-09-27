import { TypeORMQuery } from "../../typeorm-query";
import { ExpressQuery } from "../../express-query";

export interface FilterOptionQuery {
  source: ExpressQuery;
  target: TypeORMQuery
}

export abstract class FilterOption {
  public abstract setOption(query: FilterOptionQuery): void;
}
