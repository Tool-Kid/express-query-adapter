import { DEFAULT_PAGINATION } from './fixtures/default-pagination';
import { ConfigProfile } from '../../../../profile/config-profile';
import { ENABLED_PROFILE } from '../../../../profile/defaults';
import { TypeORMQueryBuilder } from '../../../query-builder';

describe('Test Profiles for <pagination>', () => {
  let qb: TypeORMQueryBuilder;
  let profile: ConfigProfile;

  beforeEach(() => {
    profile = ENABLED_PROFILE;
  });
  it('should paginate with default "itemsPerPage" when <options.pagination.status> equals to "enabled"', () => {
    profile.options.pagination.status = 'enabled';
    qb = new TypeORMQueryBuilder({ profile });
    expect(qb.build({})).toEqual(DEFAULT_PAGINATION);
  });

  it('should paginate with default "itemsPerPage" when <options.pagination.status> equals to "enabled" and "paginate" equals to true', () => {
    profile.options.pagination.status = 'enabled';
    qb = new TypeORMQueryBuilder({ profile });
    expect(qb.build({ pagination: true })).toEqual(DEFAULT_PAGINATION);
  });
  it('should paginate with default "itemsPerPage" when <options.pagination.status> equals to "enabled" and "paginate" equals to undefined', () => {
    profile.options.pagination.status = 'enabled';
    qb = new TypeORMQueryBuilder({ profile });
    expect(qb.build({ pagination: undefined })).toEqual(DEFAULT_PAGINATION);
  });
  it('should not paginate when <options.pagination.status> equals to "disabled"', () => {
    profile.options.pagination.status = 'disabled';
    qb = new TypeORMQueryBuilder({ profile });
    expect(qb.build({})).toEqual({});
  });
  it('should paginate with custom "itemsPerPage" when <options.pagination.status> equals to "enabled"', () => {
    profile.options.pagination.status = 'enabled';
    profile.options.pagination.itemsPerPage = 50;
    qb = new TypeORMQueryBuilder({ profile });
    expect(qb.build({})).toEqual({
      skip: 0,
      take: 50,
    });
  });
  it('should not paginate when <options.pagination.status> equals to "enabled" and "paginate" equals to false', () => {
    profile.options.pagination.status = 'enabled';
    qb = new TypeORMQueryBuilder({ profile });
    expect(qb.build({ pagination: false })).toEqual({});
  });
});
