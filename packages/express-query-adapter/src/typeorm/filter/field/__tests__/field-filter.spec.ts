import {
  Like,
  ILike,
  IsNull,
  MoreThan,
  MoreThanOrEqual,
  LessThanOrEqual,
  LessThan,
  Between,
  In,
  Not,
} from 'typeorm';
import { FieldFilter } from '../field-filter';
import { LookupFilter } from '../lookup.enum';
import { TypeORMQueryDialect } from '../../../query-dialect';

describe('Test FieldFilter #buildQuery', () => {
  const built: Record<string, never> = {};

  beforeEach(() => {
    for (const prop in built) {
      delete built[prop];
    }
  });

  describe('With no dialect provided', () => {
    it('should return an <exact> filter', () => {
      const fieldFilter = new FieldFilter({
        query: built,
        prop: 'name',
        lookup: LookupFilter.EXACT,
        value: 'value',
      });
      fieldFilter.buildQuery();
      expect(built['where']['name']).toBe('value');
    });

    it('should return a <contains> filter', () => {
      const fieldFilter = new FieldFilter({
        query: built,
        prop: 'name',
        lookup: LookupFilter.CONTAINS,
        value: 'value',
      });
      fieldFilter.buildQuery();
      expect(built['where']['name']).toEqual(Like('%value%'));
    });

    it('should return an <startswith> contains filter', () => {
      const fieldFilter = new FieldFilter({
        query: built,
        prop: 'name',
        lookup: LookupFilter.STARTS_WITH,
        value: 'value',
      });
      fieldFilter.buildQuery();
      expect(built['where']['name']).toEqual(Like('value%'));
    });

    it('should return an <endswith> filter', () => {
      const fieldFilter = new FieldFilter({
        query: built,
        prop: 'name',
        lookup: LookupFilter.ENDS_WITH,
        value: 'value',
      });
      fieldFilter.buildQuery();
      expect(built['where']['name']).toEqual(Like('%value'));
    });

    it('should return a <icontains> filter', () => {
      const fieldFilter = new FieldFilter({
        query: built,
        prop: 'name',
        lookup: LookupFilter.ICONTAINS,
        value: 'value',
      });
      fieldFilter.buildQuery();
      expect(built['where']['name']).toEqual(ILike('%value%'));
    });

    it('should return an <istartswith> contains filter', () => {
      const fieldFilter = new FieldFilter({
        query: built,
        prop: 'name',
        lookup: LookupFilter.ISTARTS_WITH,
        value: 'value',
      });
      fieldFilter.buildQuery();
      expect(built['where']['name']).toEqual(ILike('value%'));
    });

    it('should return an <iendswith> filter', () => {
      const fieldFilter = new FieldFilter({
        query: built,
        prop: 'name',
        lookup: LookupFilter.IENDS_WITH,
        value: 'value',
      });
      fieldFilter.buildQuery();
      expect(built['where']['name']).toEqual(ILike('%value'));
    });

    it('should return an <isnull> filter', () => {
      const fieldFilter = new FieldFilter({
        query: built,
        prop: 'name',
        lookup: LookupFilter.IS_NULL,
        value: 'value',
      });
      fieldFilter.buildQuery();
      expect(built['where']['name']).toEqual(IsNull());
    });

    it('should return an <gt> filter', () => {
      const fieldFilter = new FieldFilter({
        query: built,
        prop: 'name',
        lookup: LookupFilter.GT,
        value: '2',
      });
      fieldFilter.buildQuery();
      expect(built['where']['name']).toEqual(MoreThan('2'));
    });

    it('should return a <gte> filter', () => {
      const fieldFilter = new FieldFilter({
        query: built,
        prop: 'name',
        lookup: LookupFilter.GTE,
        value: '2',
      });
      fieldFilter.buildQuery();
      expect(built['where']['name']).toEqual(MoreThanOrEqual('2'));
    });

    it('should return a <lt> filter', () => {
      const fieldFilter = new FieldFilter({
        query: built,
        prop: 'name',
        lookup: LookupFilter.LT,
        value: '2',
      });
      fieldFilter.buildQuery();
      expect(built['where']['name']).toEqual(LessThan('2'));
    });

    it('should return a <lte> filter', () => {
      const fieldFilter = new FieldFilter({
        query: built,
        prop: 'name',
        lookup: LookupFilter.LTE,
        value: '2',
      });
      fieldFilter.buildQuery();
      expect(built['where']['name']).toEqual(LessThanOrEqual('2'));
    });

    it('should return a <between> filter', () => {
      const fieldFilter = new FieldFilter({
        query: built,
        prop: 'name',
        lookup: LookupFilter.BETWEEN,
        value: '1,10',
      });
      fieldFilter.buildQuery();
      expect(built['where']['name']).toEqual(Between(1, 10));
    });

    it('should return a <between> filter for dates', () => {
      const fieldFilter = new FieldFilter({
        query: built,
        prop: 'date',
        lookup: LookupFilter.BETWEEN,
        value: '2022-10-10,2022-11-11',
      });
      fieldFilter.buildQuery();
      expect(built['where']['date']).toEqual(
        Between(new Date('2022-10-10'), new Date('2022-11-11'))
      );
    });

    it('should return a <in> filter', () => {
      const fieldFilter = new FieldFilter({
        query: built,
        prop: 'name',
        lookup: LookupFilter.IN,
        value: '1,2,3,4,foo',
      });
      fieldFilter.buildQuery();
      expect(built['where']['name']).toEqual(In(['1', '2', '3', '4', 'foo']));
    });

    it('should return a <not> filter', () => {
      const fieldFilter = new FieldFilter({
        query: built,
        prop: 'name',
        lookup: LookupFilter.EXACT,
        value: 'value',
        notOperator: true,
      });
      fieldFilter.buildQuery();
      expect(built['where']['name']).toEqual(Not('value'));
    });
  });

  describe('With dialect equal to "mongodb"', () => {
    it('should return an <exact> filter', () => {
      const fieldFilter = new FieldFilter({
        query: built,
        prop: 'name',
        lookup: LookupFilter.EXACT,
        value: 'value',
        dialect: TypeORMQueryDialect.MONGODB,
      });
      fieldFilter.buildQuery();
      expect(built['where']).toStrictEqual({
        $and: [
          { $or: [{ name: { $eq: 'value' } }, { name: { $eq: 'value' } }] },
        ],
      });
    });

    it('should return a <contains> filter', () => {
      const fieldFilter = new FieldFilter({
        query: built,
        prop: 'name',
        lookup: LookupFilter.CONTAINS,
        value: 'value',
        dialect: TypeORMQueryDialect.MONGODB,
      });
      fieldFilter.buildQuery();
      expect(built['where']).toStrictEqual({
        $and: [{ name: { $regex: new RegExp('value') } }],
      });
    });

    it('should return an <startswith> contains filter', () => {
      const fieldFilter = new FieldFilter({
        query: built,
        prop: 'name',
        lookup: LookupFilter.STARTS_WITH,
        value: 'value',
        dialect: TypeORMQueryDialect.MONGODB,
      });
      fieldFilter.buildQuery();
      expect(built['where']).toStrictEqual({
        $and: [{ name: { $regex: new RegExp(`^value`) } }],
      });
    });

    it('should return an <endswith> filter', () => {
      const fieldFilter = new FieldFilter({
        query: built,
        prop: 'name',
        lookup: LookupFilter.ENDS_WITH,
        value: 'value',
        dialect: TypeORMQueryDialect.MONGODB,
      });
      fieldFilter.buildQuery();
      expect(built['where']).toStrictEqual({
        $and: [{ name: { $regex: new RegExp(`value$`) } }],
      });
    });

    it('should return a <icontains> filter', () => {
      const fieldFilter = new FieldFilter({
        query: built,
        prop: 'name',
        lookup: LookupFilter.ICONTAINS,
        value: 'value',
        dialect: TypeORMQueryDialect.MONGODB,
      });
      fieldFilter.buildQuery();
      expect(built['where']).toStrictEqual({
        $and: [{ name: { $regex: new RegExp(`value`, 'i') } }],
      });
    });

    it('should return an <istartswith> contains filter', () => {
      const fieldFilter = new FieldFilter({
        query: built,
        prop: 'name',
        lookup: LookupFilter.ISTARTS_WITH,
        value: 'value',
        dialect: TypeORMQueryDialect.MONGODB,
      });
      fieldFilter.buildQuery();
      expect(built['where']).toStrictEqual({
        $and: [{ name: { $regex: new RegExp(`^value`, 'i') } }],
      });
    });

    it('should return an <iendswith> filter', () => {
      const fieldFilter = new FieldFilter({
        query: built,
        prop: 'name',
        lookup: LookupFilter.IENDS_WITH,
        value: 'value',
        dialect: TypeORMQueryDialect.MONGODB,
      });
      fieldFilter.buildQuery();
      expect(built['where']).toStrictEqual({
        $and: [{ name: { $regex: new RegExp(`value$`, 'i') } }],
      });
    });

    it('should return an <isnull> filter', () => {
      const fieldFilter = new FieldFilter({
        query: built,
        prop: 'name',
        lookup: LookupFilter.IS_NULL,
        value: 'value',
        dialect: TypeORMQueryDialect.MONGODB,
      });
      fieldFilter.buildQuery();
      expect(built['where']).toStrictEqual({ $and: [{ name: { $eq: null } }] });
    });

    it('should return an <gt> filter', () => {
      const fieldFilter = new FieldFilter({
        query: built,
        prop: 'name',
        lookup: LookupFilter.GT,
        value: '2',
        dialect: TypeORMQueryDialect.MONGODB,
      });
      fieldFilter.buildQuery();
      expect(built['where']).toStrictEqual({ $and: [{ name: { $gt: 2 } }] });
    });

    it('should return a <gte> filter', () => {
      const fieldFilter = new FieldFilter({
        query: built,
        prop: 'name',
        lookup: LookupFilter.GTE,
        value: '2',
        dialect: TypeORMQueryDialect.MONGODB,
      });
      fieldFilter.buildQuery();
      expect(built['where']).toStrictEqual({ $and: [{ name: { $gte: 2 } }] });
    });

    it('should return a <lt> filter', () => {
      const fieldFilter = new FieldFilter({
        query: built,
        prop: 'name',
        lookup: LookupFilter.LT,
        value: '2',
        dialect: TypeORMQueryDialect.MONGODB,
      });
      fieldFilter.buildQuery();
      expect(built['where']).toStrictEqual({ $and: [{ name: { $lt: 2 } }] });
    });

    it('should return a <lte> filter', () => {
      const fieldFilter = new FieldFilter({
        query: built,
        prop: 'name',
        lookup: LookupFilter.LTE,
        value: '2',
        dialect: TypeORMQueryDialect.MONGODB,
      });
      fieldFilter.buildQuery();
      expect(built['where']).toStrictEqual({ $and: [{ name: { $lte: 2 } }] });
    });

    it('should return a <between> filter', () => {
      const fieldFilter = new FieldFilter({
        query: built,
        prop: 'name',
        lookup: LookupFilter.BETWEEN,
        value: '1,10',
        dialect: TypeORMQueryDialect.MONGODB,
      });
      fieldFilter.buildQuery();
      expect(built['where']).toStrictEqual({
        $and: [{ name: { $gte: 1, $lte: 10 } }],
      });
    });

    it('should return a <between> filter for dates', () => {
      const fieldFilter = new FieldFilter({
        query: built,
        prop: 'date',
        lookup: LookupFilter.BETWEEN,
        value: '2022-10-10,2022-11-11',
        dialect: TypeORMQueryDialect.MONGODB,
      });
      fieldFilter.buildQuery();
      expect(built['where']).toStrictEqual({
        $and: [
          {
            date: {
              $gte: new Date('2022-10-10'),
              $lte: new Date('2022-11-11'),
            },
          },
        ],
      });
    });

    it('should return a <in> filter', () => {
      const fieldFilter = new FieldFilter({
        query: built,
        prop: 'name',
        lookup: LookupFilter.IN,
        value: '1,2,3,4,foo',
        dialect: TypeORMQueryDialect.MONGODB,
      });
      fieldFilter.buildQuery();
      expect(built['where']).toStrictEqual({
        $and: [
          {
            $or: [
              { name: { $in: ['1', '2', '3', '4', 'foo'] } },
              { name: { $in: [1, 2, 3, 4, 'foo'] } },
            ],
          },
        ],
      });
    });

    it('should return a <not> filter for simple lookup', () => {
      const simpleFieldFilter = new FieldFilter({
        query: built,
        prop: 'name',
        lookup: LookupFilter.GT,
        value: '2',
        notOperator: true,
        dialect: TypeORMQueryDialect.MONGODB,
      });
      simpleFieldFilter.buildQuery();
      expect(built['where']).toStrictEqual({
        $and: [{ name: { $not: { $gt: 2 } } }],
      });
    });

    it('should return a <not> filter for lookup with $or operator', () => {
      const fieldFilterWithOROperator = new FieldFilter({
        query: built,
        prop: 'name',
        lookup: LookupFilter.EXACT,
        value: 'value',
        notOperator: true,
        dialect: TypeORMQueryDialect.MONGODB,
      });
      fieldFilterWithOROperator.buildQuery();
      expect(built['where']).toStrictEqual({
        $and: [
          {
            $and: [
              { name: { $not: { $eq: 'value' } } },
              { name: { $not: { $eq: 'value' } } },
            ],
          },
        ],
      });
    });
  });
});
