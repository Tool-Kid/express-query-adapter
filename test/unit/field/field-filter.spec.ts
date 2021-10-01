import {
  Like,
  IsNull,
  MoreThan,
  MoreThanOrEqual,
  LessThanOrEqual,
  LessThan,
  Between,
  In,
  Not,
} from 'typeorm'
import { FieldFilter } from '../../../src/filter/field/field-filter'
import { LookupFilter } from '../../../src/filter/field/lookup.enum'

describe('Test FieldFilter #buildQuery', () => {
  const built = {}

  it('should return an <exact> filter', () => {
    const fieldFilter = new FieldFilter({
      query: built,
      prop: 'name',
      lookup: LookupFilter.EXACT,
      value: 'value',
    })
    fieldFilter.buildQuery()
    expect(built['where']['name']).toBe('value')
  })

  it('should return a <contains> filter', () => {
    const fieldFilter = new FieldFilter({
      query: built,
      prop: 'name',
      lookup: LookupFilter.CONTAINS,
      value: 'value',
    })
    fieldFilter.buildQuery()
    expect(built['where']['name']).toEqual(Like('%value%'))
  })

  it('should return an <startswith> contains filter', () => {
    const fieldFilter = new FieldFilter({
      query: built,
      prop: 'name',
      lookup: LookupFilter.STARTS_WITH,
      value: 'value',
    })
    fieldFilter.buildQuery()
    expect(built['where']['name']).toEqual(Like('value%'))
  })

  it('should return an <endswith> filter', () => {
    const fieldFilter = new FieldFilter({
      query: built,
      prop: 'name',
      lookup: LookupFilter.ENDS_WITH,
      value: 'value',
    })
    fieldFilter.buildQuery()
    expect(built['where']['name']).toEqual(Like('%value'))
  })

  it('should return an <isnull> filter', () => {
    const fieldFilter = new FieldFilter({
      query: built,
      prop: 'name',
      lookup: LookupFilter.IS_NULL,
      value: 'value',
    })
    fieldFilter.buildQuery()
    expect(built['where']['name']).toEqual(IsNull())
  })

  it('should return an <gt> filter', () => {
    const fieldFilter = new FieldFilter({
      query: built,
      prop: 'name',
      lookup: LookupFilter.GT,
      value: '2',
    })
    fieldFilter.buildQuery()
    expect(built['where']['name']).toEqual(MoreThan('2'))
  })

  it('should return a <gte> filter', () => {
    const fieldFilter = new FieldFilter({
      query: built,
      prop: 'name',
      lookup: LookupFilter.GTE,
      value: '2',
    })
    fieldFilter.buildQuery()
    expect(built['where']['name']).toEqual(MoreThanOrEqual('2'))
  })

  it('should return a <lt> filter', () => {
    const fieldFilter = new FieldFilter({
      query: built,
      prop: 'name',
      lookup: LookupFilter.LT,
      value: '2',
    })
    fieldFilter.buildQuery()
    expect(built['where']['name']).toEqual(LessThan('2'))
  })

  it('should return a <lte> filter', () => {
    const fieldFilter = new FieldFilter({
      query: built,
      prop: 'name',
      lookup: LookupFilter.LTE,
      value: '2',
    })
    fieldFilter.buildQuery()
    expect(built['where']['name']).toEqual(LessThanOrEqual('2'))
  })

  it('should return a <between> filter', () => {
    const fieldFilter = new FieldFilter({
      query: built,
      prop: 'name',
      lookup: LookupFilter.BETWEEN,
      value: '1,10',
    })
    fieldFilter.buildQuery()
    expect(built['where']['name']).toEqual(Between(1, 10))
  })

  it('should return a <in> filter', () => {
    const fieldFilter = new FieldFilter({
      query: built,
      prop: 'name',
      lookup: LookupFilter.IN,
      value: '1,2,3,4,foo',
    })
    fieldFilter.buildQuery()
    expect(built['where']['name']).toEqual(In(['1', '2', '3', '4', 'foo']))
  })

  it('should return a <not> filter', () => {
    const fieldFilter = new FieldFilter({
      query: built,
      prop: 'name',
      lookup: LookupFilter.EXACT,
      value: 'value',
      notOperator: true,
    })
    fieldFilter.buildQuery()
    expect(built['where']['name']).toEqual(Not('value'))
  })
})
