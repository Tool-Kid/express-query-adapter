import { FindOptionsUtils, MoreThan } from 'typeorm';
import { LookupBuilder } from '../lookup';

export class GreaterThanLookup extends LookupBuilder {
  build(prop: string, value: string): Record<string, FindOptionsUtils> {
    return { [prop]: MoreThan(value) };
  }
}
