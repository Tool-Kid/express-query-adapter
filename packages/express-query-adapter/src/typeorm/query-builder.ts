import { ExpressQuery } from '../express-query';
import { TypeORMQuery } from './query';
import { FilterFactory } from './filter/filter-factory';
import { OptionsCollection } from './filter/options/container';
import { ConfigProfile } from '../profile/config-profile';
import { QueryBuilder } from '../query-builder';

export class TypeORMQueryBuilder extends QueryBuilder<TypeORMQuery> {
  private readonly findOptions: OptionsCollection = new OptionsCollection();
  private readonly filterFactory: FilterFactory = new FilterFactory();

  constructor(profile?: ConfigProfile) {
    super(profile);
  }

  build(expressQuery: ExpressQuery): TypeORMQuery {
    const typeORMQuery: TypeORMQuery = {};
    for (const option of this.findOptions.options) {
      option.setOption(
        {
          source: expressQuery,
          target: typeORMQuery,
        },
        this.profile
      );
    }

    for (const queryItem in expressQuery) {
      const filter = this.filterFactory.get({
        query: typeORMQuery,
        key: queryItem,
        value: expressQuery[queryItem],
      });
      filter.buildQuery();
    }

    return typeORMQuery;
  }
}
