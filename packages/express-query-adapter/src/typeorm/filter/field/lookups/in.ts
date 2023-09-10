import { FindOptionsUtils, In } from 'typeorm';
import { LookupBuilder } from '../lookup';
import { getParsedPrimitiveValue } from '../utils';
import { TypeORMQueryDialect } from '../../../query-dialect';

export class InLookup extends LookupBuilder {
  build(prop: string, value: string): Record<string, FindOptionsUtils> {
    const values = value.split(',');
    if (this.dialect === TypeORMQueryDialect.MONGODB) {
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
