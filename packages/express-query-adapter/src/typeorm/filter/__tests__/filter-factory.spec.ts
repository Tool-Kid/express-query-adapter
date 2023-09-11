import { FilterFactory } from '../filter-factory';
import { FieldFilter } from '../field/field-filter';
import { TypeORMQueryDialect } from '../../query-dialect';

describe('Test FilterFactory #get', () => {
  const factory = new FilterFactory();

  it('should return an instance of FieldFilter', () => {
    const filter = factory.get({
      query: {},
      key: 'field',
      value: 'value',
    });
    expect(filter).toBeInstanceOf(FieldFilter);
  });

  it('should return an instance of FieldFilter with notOperator equals to true', () => {
    const filter = factory.get({
      query: {},
      key: 'field__not',
      value: 'value',
    }) as FieldFilter;
    expect(filter).toBeInstanceOf(FieldFilter);
    expect(filter.notOperator).toBe(true);
  });

  it('should return an instance of FieldFilter with notOperator equals to false', () => {
    const filter = factory.get({
      query: {},
      key: 'field',
      value: 'value',
    }) as FieldFilter;
    expect(filter).toBeInstanceOf(FieldFilter);
    expect(filter.notOperator).toBe(false);
  });

  it('should throw an error when no provided dialect and key is an invalid field filter', () => {
    const invalidKey = 'fk.field';
    const filter = () =>
      factory.get({
        query: {},
        key: invalidKey,
        value: 'value',
      }) as FieldFilter;
    expect(filter).toThrow(`${invalidKey} is not a field`);
  });

  it('should throw an error when dialect is "mongodb" and key is an invalid field filter', () => {
    const invalidKey = '$invalidKey';
    const filter = () =>
      factory.get({
        query: {},
        key: invalidKey,
        value: 'value',
        dialect: TypeORMQueryDialect.MONGODB,
      }) as FieldFilter;
    expect(filter).toThrow(`${invalidKey} is not a field`);
  });
});
