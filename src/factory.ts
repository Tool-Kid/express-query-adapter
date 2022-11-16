import { TypeORMQueryBuilder } from './typeorm/query-builder'
import { ProfileType, QueryAdapter } from './express-query-builder'
import { ProfileLoader } from './profile'
import { QueryBuilderReturnType } from './return-type'

export class QueryBuilderFactory {
  private readonly profileFactory = new ProfileLoader()
  public build<Adapter extends QueryAdapter>(
    adapter: Adapter,
    profileType?: ProfileType
  ): QueryBuilderReturnType<Adapter> {
    const profile = this.profileFactory.load(profileType)
    switch (adapter) {
      case 'typeorm':
        return new TypeORMQueryBuilder(profile)
      default:
        throw new Error(`No adapter found for ${adapter}`)
    }
  }
}
