import { ConfigProfile } from '../../../profile/config-profile';
import { FilterOption, FilterOptionQuery } from './filter-option';

export class PaginationOption implements FilterOption {
  public setOption(query: FilterOptionQuery, profile: ConfigProfile): void {
    const { itemsPerPage } = profile.options.pagination;

    if (!this.isAuthorized(profile)) {
      delete query.source['pagination'];
      delete query.source['page'];
      delete query.source['limit'];
      return;
    }

    if (
      query.source['pagination'] === undefined ||
      query.source['pagination'] === true
    ) {
      query.target['skip'] =
        query.source['page'] && query.source['page'] > 1
          ? (query.source['page'] - 1) * (query.source['limit'] || itemsPerPage)
          : 0;
      delete query.source['page'];
      query.target['take'] =
        query.source['limit'] && query.source['limit'] > 0
          ? query.source['limit']
          : itemsPerPage;
      delete query.source['limit'];
    }
    delete query.source['pagination'];
  }

  public isAuthorized(profile: ConfigProfile): boolean {
    if (profile.options.pagination.status === 'disabled') {
      return false;
    }
    return true;
  }
}
