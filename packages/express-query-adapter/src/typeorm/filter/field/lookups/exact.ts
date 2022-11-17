import { FindOptionsUtils } from 'typeorm';
import { LookupBuilder } from '../lookup';

export class ExactLookup implements LookupBuilder {
  build(prop: string, value: string): Record<string, FindOptionsUtils> {
    return { [prop]: value };
  }
}
