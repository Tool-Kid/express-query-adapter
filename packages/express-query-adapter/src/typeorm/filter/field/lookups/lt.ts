import { FindOptionsUtils, LessThan } from 'typeorm';
import { LookupBuilder } from '../lookup';
import { getParsedPrimitiveValue } from '../utils';
import { TypeORMQueryDialect } from '../../../query-dialect';

export class LowerThanLookup extends LookupBuilder {
  build(prop: string, value: string): Record<string, FindOptionsUtils> {
    if (this.dialect === TypeORMQueryDialect.MONGODB) {
      return {
        [prop]: { $lt: getParsedPrimitiveValue(value) },
      };
    } else {
      return { [prop]: LessThan(value) };
    }
  }
}
