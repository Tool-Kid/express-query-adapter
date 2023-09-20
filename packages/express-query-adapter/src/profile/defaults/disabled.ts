import { ConfigProfile } from '../config-profile';
import { ITEMS_PER_PAGE } from '../default-config';

export const DISABLED_PROFILE: ConfigProfile = {
  options: {
    pagination: {
      status: 'disabled',
      paginate: true,
      itemsPerPage: ITEMS_PER_PAGE,
    },
    ordering: {
      status: 'disabled',
    },
    relations: {
      status: 'disabled',
    },
    select: {
      status: 'disabled',
    },
  },
  policy: 'skip',
};
