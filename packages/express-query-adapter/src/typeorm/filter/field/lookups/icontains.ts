import { FindOptionsUtils, ILike } from 'typeorm';
import { LookupBuilder } from '../lookup';

export class InsensitiveContainsLookup implements LookupBuilder {
  build(prop: string, value: string): Record<string, FindOptionsUtils> {
    return { [prop]: ILike(`%${value}%`) };
  }
}
