import { FindOptionsUtils, IsNull } from 'typeorm';
import { LookupBuilder } from '../lookup';

export class IsNullLookup extends LookupBuilder {
  build(prop: string, value: string): Record<string, FindOptionsUtils> {
    return { [prop]: IsNull() };
  }
}
