import { ConfigProfile } from '../../../profile/config-profile';
import { FilterOption, FilterOptionQuery } from './filter-option';

export class RelationsOption implements FilterOption {
  public setOption(query: FilterOptionQuery, profile: ConfigProfile): void {
    if (!this.isAuthorized(profile)) {
      delete query.source['with'];
      return;
    }
    if (!query.source['with']) {
      return;
    }

    const relations = query.source['with'].split(',');
    query.target['relations'] = relations;

    delete query.source['with'];
  }

  public isAuthorized(profile: ConfigProfile): boolean {
    if (profile.options.relations.status === 'disabled') {
      return false;
    }
    return true;
  }
}
