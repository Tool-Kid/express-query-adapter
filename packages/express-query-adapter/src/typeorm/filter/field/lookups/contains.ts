import { FindOptionsUtils, Like } from 'typeorm';
import { LookupBuilder } from '../lookup';
import { QueryDialect } from '../../../../types';
import { escapeRegExp } from '../utils';

export class ContainsLookup extends LookupBuilder {
  build(prop: string, value: string): Record<string, FindOptionsUtils> {
    if (this.dialect === QueryDialect.MONGODB) {
      return { [prop]: { $regex: new RegExp(`${escapeRegExp(value)}`) } };
    } else {
      return { [prop]: Like(`%${value}%`) };
    }
  }
}
