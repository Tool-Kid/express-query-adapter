import { FilterOption } from "./filter-option";
import { PaginationOption } from "./pagination-option";

export class OptionsContainer {
  public readonly options: FilterOption[] = [];

  constructor() {
    this.options.push(
      new PaginationOption(),
    );
  }
}
