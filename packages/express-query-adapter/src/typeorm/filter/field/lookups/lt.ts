import { FindOptionsUtils, LessThan } from 'typeorm';
import { LookupBuilder } from '../lookup';

export class LowerThanLookup extends LookupBuilder {
  build(prop: string, value: string): Record<string, FindOptionsUtils> {
    return { [prop]: LessThan(value) };
  }
}
