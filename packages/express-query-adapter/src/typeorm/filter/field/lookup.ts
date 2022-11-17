import { FindOptionsUtils } from 'typeorm';

export abstract class LookupBuilder {
  abstract build(prop: string, value: string): Record<string, FindOptionsUtils>;
}
