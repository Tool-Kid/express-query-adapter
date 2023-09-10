import { FindOptionsUtils, MoreThan } from 'typeorm';
import { LookupBuilder } from '../lookup';
import { getParsedPrimitiveValue } from '../utils';
import { TypeORMQueryDialect } from '../../../query-dialect';

export class GreaterThanLookup extends LookupBuilder {
  build(prop: string, value: string): Record<string, FindOptionsUtils> {
    if (this.dialect === TypeORMQueryDialect.MONGODB) {
      return {
        [prop]: { $gt: getParsedPrimitiveValue(value) },
      };
    } else {
      return { [prop]: MoreThan(value) };
    }
  }
}
