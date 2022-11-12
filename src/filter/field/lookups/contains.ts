import { FindOptionsUtils, Like } from 'typeorm'
import { LookupBuilder } from '../lookup'

export class ContainsLookup implements LookupBuilder {
  build(prop: string, value: string): Record<string, FindOptionsUtils> {
    return { [prop]: Like(`%${value}%`) }
  }
}
