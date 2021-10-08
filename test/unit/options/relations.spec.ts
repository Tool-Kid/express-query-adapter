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
  it('should attach "relations" when <options.relations.status> equals to "enabled"', () => {
    profile.options.relations.status = 'enabled'
    qb = new QueryBuilder({ with: 'rel1,rel2' }, profile)
    expect(qb.build()).toEqual({
      ...DEFAULT_PAGINATION,
      relations: ['rel1', 'rel2'],
    })
  })
  it('should not attach "relations" when <options.relations.status> equals to "disabled"', () => {
    profile.options.relations.status = 'disabled'
    qb = new QueryBuilder({ with: 'rel1,rel2' }, profile)
    expect(qb.build()).toEqual({
      ...DEFAULT_PAGINATION,
    })
  })
  it('should not attach relations when <options.relations.status> equals to "enabled" and "with" key equals to undefined', () => {
    profile.options.pagination.status = 'enabled'
    qb = new QueryBuilder({}, profile)
    expect(qb.build()).toEqual({
      ...DEFAULT_PAGINATION,
    })
  })
})
