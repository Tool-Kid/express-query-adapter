import { ConfigProfile } from '../config-profile';
import { ITEMS_PER_PAGE } from '../default-config';

export const ENABLED_PROFILE: ConfigProfile = {
  options: {
    pagination: {
      status: 'enabled',
      paginate: true,
      itemsPerPage: ITEMS_PER_PAGE,
    },
    ordering: {
      status: 'enabled',
    },
    relations: {
      status: 'enabled',
    },
    select: {
      status: 'enabled',
    },
  },
  policy: 'skip',
};
