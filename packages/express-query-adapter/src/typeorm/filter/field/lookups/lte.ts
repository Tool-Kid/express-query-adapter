import { FindOptionsUtils, LessThanOrEqual } from 'typeorm';
import { LookupBuilder } from '../lookup';
import { QueryDialect } from '../../../../types';
import { getParsedPrimitiveValue } from '../utils';

export class LowerThanOrEqualLookup extends LookupBuilder {
  build(prop: string, value: string): Record<string, FindOptionsUtils> {
    if (this.dialect === QueryDialect.MONGODB) {
      return {
        [prop]: { $lte: getParsedPrimitiveValue(value) },
      };
    } else {
      return { [prop]: LessThanOrEqual(value) };
    }
  }
}
