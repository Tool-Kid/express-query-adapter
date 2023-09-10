import { FindOptionsUtils, IsNull } from 'typeorm';
import { LookupBuilder } from '../lookup';
import { QueryDialect } from '../../../../types';

export class IsNullLookup extends LookupBuilder {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  build(prop: string, value: string): Record<string, FindOptionsUtils> {
    if (this.dialect === QueryDialect.MONGODB) {
      return {
        [prop]: { $eq: null },
      };
    } else {
      return { [prop]: IsNull() };
    }
  }
}
