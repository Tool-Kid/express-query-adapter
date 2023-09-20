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
  it('should attach "select" fields when <options.select.status> equals to "enabled"', () => {
    profile.options.select.status = 'enabled';
    qb = new TypeORMQueryBuilder({ profile });
    expect(qb.build({ select: 'field1,field2' })).toEqual({
      ...DEFAULT_PAGINATION,
      select: ['field1', 'field2'],
    });
  });
  it('should not attach "select" fields when <options.select.status> equals to "disabled"', () => {
    profile.options.select.status = 'disabled';
    qb = new TypeORMQueryBuilder({ profile });
    expect(qb.build({ select: 'field1,field2' })).toEqual({
      ...DEFAULT_PAGINATION,
    });
  });
  it('should not attach fields when <options.select.status> equals to "enabled" and "select" key equals to undefined', () => {
    profile.options.select.status = 'enabled';
    qb = new TypeORMQueryBuilder({ profile });
    expect(qb.build({})).toEqual({
      ...DEFAULT_PAGINATION,
    });
  });
});
