import { ConfigProfile } from '../../../../profile/config-profile';
import { ENABLED_PROFILE } from '../../../../profile/defaults';
import { TypeORMQueryBuilder } from '../../../query-builder';
import { DEFAULT_PAGINATION } from './fixtures/default-pagination';

describe('', () => {
  let qb: TypeORMQueryBuilder;
  let profile: ConfigProfile;

  beforeEach(() => {
    profile = ENABLED_PROFILE;
  });
  it('should attach "order" criteria when <options.ordering.status> equals to "enabled"', () => {
    profile.options.ordering.status = 'enabled';
    qb = new TypeORMQueryBuilder({ profile });
    expect(qb.build({ order: '+field1,-field2' })).toEqual({
      ...DEFAULT_PAGINATION,
      order: {
        field1: 'ASC',
        field2: 'DESC',
      },
    });
  });
  it('should not attach "order" criteria when <options.ordering.status> equals to "disabled"', () => {
    profile.options.ordering.status = 'disabled';
    qb = new TypeORMQueryBuilder({ profile });
    expect(qb.build({ order: '+field1,-field2' })).toEqual({
      ...DEFAULT_PAGINATION,
    });
  });
  it('should not attach fields when <options.ordering.status> equals to "enabled" and "select" key equals to undefined', () => {
    profile.options.ordering.status = 'enabled';
    qb = new TypeORMQueryBuilder({ profile });
    expect(qb.build({})).toEqual({
      ...DEFAULT_PAGINATION,
    });
  });
});
