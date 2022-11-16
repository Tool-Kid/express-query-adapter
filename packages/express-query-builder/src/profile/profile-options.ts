import { EnableableOption } from './enableable-option';
import { PaginationOption } from './pagination-option';

export interface ProfileOptions {
  ordering: EnableableOption;
  pagination: PaginationOption;
  relations: EnableableOption;
  select: EnableableOption;
}
