import { FilterOption } from "./filter-option";
import { OrderOption } from "./order-option";
import { PaginationOption } from "./pagination-option";

export class OptionsContainer {
  public readonly options: FilterOption[] = [];

  constructor() {
    this.options.push(
      new PaginationOption(),
      new OrderOption(),
    );
  }
}
