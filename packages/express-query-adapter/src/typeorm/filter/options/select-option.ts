import { ConfigProfile } from '../../../profile/config-profile';
import { FilterOption, FilterOptionQuery } from './filter-option';

export class SelectOption implements FilterOption {
  public setOption(query: FilterOptionQuery, profile: ConfigProfile): void {
    if (!this.isAuthorized(profile)) {
      delete query.source['select'];
      return;
    }
    if (!query.source['select']) {
      return;
    }

    const fields = query.source['select'].split(',');
    query.target['select'] = fields;

    delete query.source['select'];
  }

  public isAuthorized(profile: ConfigProfile): boolean {
    if (profile.options.select.status === 'disabled') {
      return false;
    }
    return true;
  }
}
