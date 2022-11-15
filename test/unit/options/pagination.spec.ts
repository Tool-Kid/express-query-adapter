import { ConfigProfile } from '../../../src/profile/config-profile'
import { ENABLED_PROFILE } from '../../../src/profile/defaults'
import { TypeORMQueryBuilder } from '../../../src/typeorm/query-builder'

describe('Test Profiles for <pagination>', () => {
  let qb: TypeORMQueryBuilder
  let profile: ConfigProfile

  beforeEach(() => {
    profile = ENABLED_PROFILE
  })
  it('should paginate with default "itemsPerPage" when <options.pagination.status> equals to "enabled"', () => {
    profile.options.pagination.status = 'enabled'
    qb = new TypeORMQueryBuilder(profile)
    expect(qb.build({})).toEqual({
      skip: 0,
      take: 25,
    })
  })

  it('should paginate with default "itemsPerPage" when <options.pagination.status> equals to "enabled" and "paginate" equals to true', () => {
    profile.options.pagination.status = 'enabled'
    qb = new TypeORMQueryBuilder(profile)
    expect(qb.build({ pagination: true })).toEqual({
      skip: 0,
      take: 25,
    })
  })
  it('should paginate with default "itemsPerPage" when <options.pagination.status> equals to "enabled" and "paginate" equals to undefined', () => {
    profile.options.pagination.status = 'enabled'
    qb = new TypeORMQueryBuilder(profile)
    expect(qb.build({ pagination: undefined })).toEqual({
      skip: 0,
      take: 25,
    })
  })
  it('should not paginate when <options.pagination.status> equals to "disabled"', () => {
    profile.options.pagination.status = 'disabled'
    qb = new TypeORMQueryBuilder(profile)
    expect(qb.build({})).toEqual({})
  })
  it('should paginate with custom "itemsPerPage" when <options.pagination.status> equals to "enabled"', () => {
    profile.options.pagination.status = 'enabled'
    profile.options.pagination.itemsPerPage = 50
    qb = new TypeORMQueryBuilder(profile)
    expect(qb.build({})).toEqual({
      skip: 0,
      take: 50,
    })
  })
  it('should not paginate when <options.pagination.status> equals to "enabled" and "paginate" equals to false', () => {
    profile.options.pagination.status = 'enabled'
    qb = new TypeORMQueryBuilder(profile)
    expect(qb.build({ pagination: false })).toEqual({})
  })
})
