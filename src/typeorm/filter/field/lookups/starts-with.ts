import { FindOptionsUtils, Like } from 'typeorm'
import { LookupBuilder } from '../lookup'

export class StartsWithLookup implements LookupBuilder {
  build(prop: string, value: string): Record<string, FindOptionsUtils> {
    return { [prop]: Like(`${value}%`) }
  }
}
