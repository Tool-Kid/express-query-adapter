import { FindOptionsUtils, In } from 'typeorm';
import { LookupBuilder } from '../lookup';
import { QueryDialect } from '../../../../types';
import { getParsedPrimitiveValue } from '../utils';

export class InLookup extends LookupBuilder {
  build(prop: string, value: string): Record<string, FindOptionsUtils> {
    const values = value.split(',');
    if (this.dialect === QueryDialect.MONGODB) {
      return {
        $or: [
          { [prop]: { $in: values } },
          { [prop]: { $in: values.map((v) => getParsedPrimitiveValue(v)) } },
        ],
      };
    } else {
      return { [prop]: In(values) };
    }
  }
}
