import { FilterOption } from "./filter-option";

export class RelationsOption extends FilterOption {

  public setOption(
    query: { expressQuery: any, typeORMQuery: any }
  ): { expressQuery: any, typeORMQuery: any } {
    if (!query.expressQuery['with']) {
      return;
    }

    const relations = query.expressQuery['with'].split(',');
    query.typeORMQuery['relations'] = relations;

    delete query.expressQuery['with'];
    return { expressQuery: query.expressQuery, typeORMQuery: query.typeORMQuery };
  }

}
