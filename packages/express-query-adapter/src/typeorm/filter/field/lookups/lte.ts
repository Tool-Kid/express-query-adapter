import { FindOptionsUtils, LessThanOrEqual } from 'typeorm';
import { LookupBuilder } from '../lookup';
import { getParsedPrimitiveValue } from '../utils';
import { TypeORMQueryDialect } from '../../../query-dialect';

export class LowerThanOrEqualLookup extends LookupBuilder {
  build(prop: string, value: string): Record<string, FindOptionsUtils> {
    if (this.dialect === TypeORMQueryDialect.MONGODB) {
      return {
        [prop]: { $lte: getParsedPrimitiveValue(value) },
      };
    } else {
      return { [prop]: LessThanOrEqual(value) };
    }
  }
}
