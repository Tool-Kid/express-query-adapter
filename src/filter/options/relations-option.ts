import { FilterOption } from "./filter-option";

export class RelationsOption extends FilterOption {

  public setOption(
    query: { expressQuery: any, typeORMQuery: any }
  ): void {
    if (!query.expressQuery['with']) {
      return;
    }

    const relations = query.expressQuery['with'].split(',');
    query.typeORMQuery['relations'] = relations;

    delete query.expressQuery['with'];
  }

}
