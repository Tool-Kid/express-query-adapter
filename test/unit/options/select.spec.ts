import { ConfigProfile } from '../../../src/profile/config-profile'
import { ENABLED_PROFILE } from '../../../src/profile/defaults'
import { QueryBuilder } from '../../../src/query-builder'
import { DEFAULT_PAGINATION } from '../../fixtures/default-pagination'

describe('', () => {
  let qb: QueryBuilder
  let profile: ConfigProfile

  beforeEach(() => {
    profile = ENABLED_PROFILE
  })
  it('should attach "select" fields when <options.select.status> equals to "enabled"', () => {
    profile.options.select.status = 'enabled'
    qb = new QueryBuilder({ select: 'field1,field2' }, profile)
    expect(qb.build()).toEqual({
      ...DEFAULT_PAGINATION,
      select: ['field1', 'field2'],
    })
  })
  it('should not attach "select" fields when <options.select.status> equals to "disabled"', () => {
    profile.options.select.status = 'disabled'
    qb = new QueryBuilder({ select: 'field1,field2' }, profile)
    expect(qb.build()).toEqual({
      ...DEFAULT_PAGINATION,
    })
  })
  it('should not attach fields when <options.select.status> equals to "enabled" and "select" key equals to undefined', () => {
    profile.options.select.status = 'enabled'
    qb = new QueryBuilder({}, profile)
    expect(qb.build()).toEqual({
      ...DEFAULT_PAGINATION,
    })
  })
})
