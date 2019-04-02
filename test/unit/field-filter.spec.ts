import { Like, IsNull, MoreThan, MoreThanOrEqual, LessThanOrEqual, LessThan, Between, In, Not } from 'typeorm';
import { FieldFilter } from '../../src/field-filter';
import { LookupFilter } from '../../src/lookup.enum';

describe('Test FieldFilter #buildQuery', () => {

  const built = {};

  it('should return an <exact> filter', () => {
    const fieldFilter = new FieldFilter(built, 'name', LookupFilter.EXACT, 'value');
    fieldFilter.buildQuery();
    expect(built['where']['name']).toBe('value');
  });

  it('should return a <contains> filter', () => {
    const fieldFilter = new FieldFilter(built, 'name', LookupFilter.CONTAINS, 'value');
    fieldFilter.buildQuery();
    expect(built['where']['name']).toEqual(Like('%value%'));
  });

  it('should return an <startswith> contains filter', () => {
    const fieldFilter = new FieldFilter(built, 'name', LookupFilter.STARTS_WITH, 'value');
    fieldFilter.buildQuery();
    expect(built['where']['name']).toEqual(Like('value%'));
  });

  it('should return an <endswith> filter', () => {
    const fieldFilter = new FieldFilter(built, 'name', LookupFilter.ENDS_WITH, 'value');
    fieldFilter.buildQuery();
    expect(built['where']['name']).toEqual(Like('%value'));
  });

  it('should return an <isnull> filter', () => {
    const fieldFilter = new FieldFilter(built, 'name', LookupFilter.IS_NULL, 'value');
    fieldFilter.buildQuery();
    expect(built['where']['name']).toEqual(IsNull());
  });

  it('should return an <gt> filter', () => {
    const fieldFilter = new FieldFilter(built, 'name', LookupFilter.GT, '2');
    fieldFilter.buildQuery();
    expect(built['where']['name']).toEqual(MoreThan('2'));
  });

  it('should return a <gte> filter', () => {
    const fieldFilter = new FieldFilter(built, 'name', LookupFilter.GTE, '2');
    fieldFilter.buildQuery();
    expect(built['where']['name']).toEqual(MoreThanOrEqual('2'));
  });

  it('should return a <lt> filter', () => {
    const fieldFilter = new FieldFilter(built, 'name', LookupFilter.LT, '2');
    fieldFilter.buildQuery();
    expect(built['where']['name']).toEqual(LessThan('2'));
  });

  it('should return a <lte> filter', () => {
    const fieldFilter = new FieldFilter(built, 'name', LookupFilter.LTE, '2');
    fieldFilter.buildQuery();
    expect(built['where']['name']).toEqual(LessThanOrEqual('2'));
  });

  it('should return a <between> filter', () => {
    const fieldFilter = new FieldFilter(built, 'name', LookupFilter.BETWEEN, '1,10');
    fieldFilter.buildQuery();
    expect(built['where']['name']).toEqual(Between(1, 10));
  });

  it('should return a <in> filter', () => {
    const fieldFilter = new FieldFilter(built, 'name', LookupFilter.IN, '1,2,3,4,foo');
    fieldFilter.buildQuery();
    expect(built['where']['name']).toEqual(In(['1', '2', '3', '4', 'foo']));
  });

  it('should return a <not> filter', () => {
    const fieldFilter = new FieldFilter(built, 'name', LookupFilter.EXACT, 'value', true);
    fieldFilter.buildQuery();
    expect(built['where']['name']).toEqual(Not('value'));
  });

});
