import { EnableableOption } from './enableable-option';

export interface PaginationOption extends EnableableOption {
  paginate: boolean;
  itemsPerPage: number;
}
