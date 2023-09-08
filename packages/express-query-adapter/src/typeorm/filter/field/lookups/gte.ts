import { FindOptionsUtils, MoreThanOrEqual } from 'typeorm';
import { LookupBuilder } from '../lookup';

export class GreaterThanOrEqualLookup extends LookupBuilder {
  build(prop: string, value: string): Record<string, FindOptionsUtils> {
    return { [prop]: MoreThanOrEqual(value) };
  }
}
