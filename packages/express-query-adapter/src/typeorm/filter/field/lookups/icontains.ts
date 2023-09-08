import { FindOptionsUtils, ILike } from 'typeorm';
import { LookupBuilder } from '../lookup';
import { QueryDialect } from '../../../../types';
import { escapeRegExp } from '../utils';

export class InsensitiveContainsLookup extends LookupBuilder {
  build(prop: string, value: string): Record<string, FindOptionsUtils> {
    if (this.dialect === QueryDialect.MONGODB) {
      return { [prop]: { $regex: new RegExp(`${escapeRegExp(value)}`, 'i') } };
    } else {
      return { [prop]: ILike(`%${value}%`) };
    }
  }
}
