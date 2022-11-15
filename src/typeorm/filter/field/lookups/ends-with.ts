import { FindOptionsUtils, Like } from 'typeorm'
import { LookupBuilder } from '../lookup'

export class EndsWithLookup implements LookupBuilder {
  build(prop: string, value: string): Record<string, FindOptionsUtils> {
    return { [prop]: Like(`%${value}`) }
  }
}
