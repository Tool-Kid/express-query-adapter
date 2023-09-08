import { FindOptionsUtils, In } from 'typeorm';
import { LookupBuilder } from '../lookup';

export class InLookup extends LookupBuilder {
  build(prop: string, value: string): Record<string, FindOptionsUtils> {
    return { [prop]: In(value.split(',')) };
  }
}
