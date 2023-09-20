import { FindOptionsUtils, ILike } from 'typeorm';
import { LookupBuilder } from '../lookup';
import { escapeRegExp } from '../utils';
import { TypeORMQueryDialect } from '../../../query-dialect';

export class InsensitiveStartsWithLookup extends LookupBuilder {
  build(prop: string, value: string): Record<string, FindOptionsUtils> {
    if (this.dialect === TypeORMQueryDialect.MONGODB) {
      return { [prop]: { $regex: new RegExp(`^${escapeRegExp(value)}`, 'i') } };
    } else {
      return { [prop]: ILike(`${value}%`) };
    }
  }
}
