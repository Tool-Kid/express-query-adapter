import { FindOptionsUtils, MoreThanOrEqual } from 'typeorm';
import { LookupBuilder } from '../lookup';
import { QueryDialect } from '../../../../types';
import { getParsedPrimitiveValue } from '../utils';

export class GreaterThanOrEqualLookup extends LookupBuilder {
  build(prop: string, value: string): Record<string, FindOptionsUtils> {
    if (this.dialect === QueryDialect.MONGODB) {
      return {
        [prop]: { $gte: getParsedPrimitiveValue(value) },
      };
    } else {
      return { [prop]: MoreThanOrEqual(value) };
    }
  }
}
