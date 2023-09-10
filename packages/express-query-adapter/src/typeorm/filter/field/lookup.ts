import { FindOptionsUtils } from 'typeorm';
import { TypeORMQueryDialect } from '../../query-dialect';

export abstract class LookupBuilder {
  protected readonly dialect?: TypeORMQueryDialect;

  constructor(config: { dialect?: TypeORMQueryDialect }) {
    this.dialect = config.dialect;
  }
  abstract build(prop: string, value: string): Record<string, FindOptionsUtils>;
}
