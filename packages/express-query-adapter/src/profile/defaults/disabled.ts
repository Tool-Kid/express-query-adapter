import { ConfigProfile } from '../config-profile';

export const DISABLED_PROFILE: ConfigProfile = {
  options: {
    pagination: {
      status: 'disabled',
      paginate: true,
      itemsPerPage: 25,
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
