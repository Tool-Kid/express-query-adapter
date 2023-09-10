import { FindOptionsUtils, MoreThanOrEqual } from 'typeorm';
import { LookupBuilder } from '../lookup';
import { getParsedPrimitiveValue } from '../utils';
import { TypeORMQueryDialect } from '../../../query-dialect';

export class GreaterThanOrEqualLookup extends LookupBuilder {
  build(prop: string, value: string): Record<string, FindOptionsUtils> {
    if (this.dialect === TypeORMQueryDialect.MONGODB) {
      return {
        [prop]: { $gte: getParsedPrimitiveValue(value) },
      };
    } else {
      return { [prop]: MoreThanOrEqual(value) };
    }
  }
}
