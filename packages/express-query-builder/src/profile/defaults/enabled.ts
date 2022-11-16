import { ConfigProfile } from '../config-profile';

export const ENABLED_PROFILE: ConfigProfile = {
  options: {
    pagination: {
      status: 'enabled',
      paginate: true,
      itemsPerPage: 25,
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
