import { FindOptionsUtils } from 'typeorm';
import { LookupBuilder } from '../lookup';
import { QueryDialect } from '../../../../types';
import { getParsedPrimitiveValue } from '../utils';

export class ExactLookup extends LookupBuilder {
  build(prop: string, value: string): Record<string, FindOptionsUtils> {
    if (this.dialect === QueryDialect.MONGODB) {
      return {
        $or: [{ [prop]: value }, { [prop]: getParsedPrimitiveValue(value) }],
      };
    } else {
      return { [prop]: value };
    }
  }
}
