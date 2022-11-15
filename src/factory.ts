import { TypeORMQueryBuilder } from './typeorm/query-builder'
import { ProfileType, Strategy } from './express-query-builder'
import { ProfileLoader } from './profile'

export class QueryBuilderFactory {
  private readonly profileFactory = new ProfileLoader()
  public build(
    strategy: Strategy,
    profileType?: ProfileType
  ): TypeORMQueryBuilder {
    const profile = this.profileFactory.load(profileType)
    switch (strategy) {
      case 'typeorm':
        return new TypeORMQueryBuilder(profile)
      default:
        return new TypeORMQueryBuilder(profile)
    }
  }
}
