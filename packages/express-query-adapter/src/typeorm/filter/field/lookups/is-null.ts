import { FindOptionsUtils, IsNull } from 'typeorm';
import { LookupBuilder } from '../lookup';
import { TypeORMQueryDialect } from '../../../query-dialect';

export class IsNullLookup extends LookupBuilder {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  build(prop: string, value: string): Record<string, FindOptionsUtils> {
    if (this.dialect === TypeORMQueryDialect.MONGODB) {
      return {
        [prop]: { $eq: null },
      };
    } else {
      return { [prop]: IsNull() };
    }
  }
}
