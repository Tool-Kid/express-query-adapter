import { FindOptionsUtils, LessThan } from 'typeorm';
import { LookupBuilder } from '../lookup';
import { QueryDialect } from '../../../../types';
import { getParsedPrimitiveValue } from '../utils';

export class LowerThanLookup extends LookupBuilder {
  build(prop: string, value: string): Record<string, FindOptionsUtils> {
    if (this.dialect === QueryDialect.MONGODB) {
      return {
        [prop]: { $lt: getParsedPrimitiveValue(value) },
      };
    } else {
      return { [prop]: LessThan(value) };
    }
  }
}
