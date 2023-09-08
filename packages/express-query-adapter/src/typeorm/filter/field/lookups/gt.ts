import { FindOptionsUtils, MoreThan } from 'typeorm';
import { LookupBuilder } from '../lookup';
import { QueryDialect } from '../../../../types';
import { getParsedPrimitiveValue } from '../utils';

export class GreaterThanLookup extends LookupBuilder {
  build(prop: string, value: string): Record<string, FindOptionsUtils> {
    if (this.dialect === QueryDialect.MONGODB) {
      return {
        [prop]: { $gt: getParsedPrimitiveValue(value) },
      };
    } else {
      return { [prop]: MoreThan(value) };
    }
  }
}
