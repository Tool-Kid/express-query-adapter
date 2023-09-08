import { ExpressQuery } from '../express-query';
import { TypeORMQuery } from './query';
import { FilterFactory } from './filter/filter-factory';
import { OptionsCollection } from './filter/options/container';
import { QueryBuilder } from '../query-builder';
import { QueryDialect, ProfileType } from '../types';

export class TypeORMQueryBuilder extends QueryBuilder<TypeORMQuery> {
  private readonly findOptions: OptionsCollection = new OptionsCollection();
  private readonly filterFactory: FilterFactory = new FilterFactory();

  constructor({
    dialect,
    profile,
  }: {
    dialect?: QueryDialect;
    profile?: ProfileType;
  }) {
    super({ dialect, profile });
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
        dialect: this.dialect,
        key: queryItem,
        value: expressQuery[queryItem],
      });
      filter.buildQuery();
    }

    return typeORMQuery;
  }
}
