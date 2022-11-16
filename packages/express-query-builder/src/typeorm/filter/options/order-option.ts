import { ConfigProfile } from '../../../profile/config-profile';
import { FilterOption, FilterOptionQuery } from './filter-option';

export class OrderOption implements FilterOption {
  public setOption(query: FilterOptionQuery, profile: ConfigProfile): void {
    if (!this.isAuthorized(profile)) {
      delete query.source['order'];
      return;
    }
    if (!query.source['order']) {
      return;
    }
    const orderFields = query.source['order'].split(',');
    for (const field of orderFields) {
      const orderCriteria = this.getOrderCriteria(field);
      query.target['order'] = {
        ...query.target['order'],
        [field.substr(1, field.length)]: orderCriteria,
      };
    }
    delete query.source['order'];
  }

  private getOrderCriteria(field: string): string {
    if (field.startsWith('+')) {
      return 'ASC';
    } else if (field.startsWith('-')) {
      return 'DESC';
    } else {
      throw new Error(
        `No order set for <${field}>. Prefix with one of these: [+, -]`
      );
    }
  }

  public isAuthorized(profile: ConfigProfile): boolean {
    if (profile.options.ordering.status === 'disabled') {
      return false;
    }
    return true;
  }
}
