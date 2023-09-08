import { FindOptionsUtils } from 'typeorm';
import { LookupBuilder } from '../lookup';

export class ExactLookup extends LookupBuilder {
  build(prop: string, value: string): Record<string, FindOptionsUtils> {
    return { [prop]: value };
  }
}
