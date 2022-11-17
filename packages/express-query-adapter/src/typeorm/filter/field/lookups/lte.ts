import { FindOptionsUtils, LessThanOrEqual } from 'typeorm';
import { LookupBuilder } from '../lookup';

export class LowerThanOrEqualLookup implements LookupBuilder {
  build(prop: string, value: string): Record<string, FindOptionsUtils> {
    return { [prop]: LessThanOrEqual(value) };
  }
}
