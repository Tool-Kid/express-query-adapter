import { QueryDialect } from '../../../types';
import { FindOptionsUtils } from 'typeorm';

export abstract class LookupBuilder {
  protected readonly dialect?: QueryDialect;

  constructor(config: { dialect?: QueryDialect }) {
    this.dialect = config.dialect;
  }
  abstract build(prop: string, value: string): Record<string, FindOptionsUtils>;
}
