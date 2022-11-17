import { QueryBuilderFactory } from '../../src/factory';
import { TypeORMQueryBuilder } from '../../src/typeorm/query-builder';

describe('QueryBuilderFactory', () => {
  it('should create an instance', () => {
    const factory = new QueryBuilderFactory();
    expect(factory).toBeInstanceOf(QueryBuilderFactory);
  });

  it('should return a TypeORMQueryBuilder instance when <strategy: typeorm>', () => {
    const factory = new QueryBuilderFactory();
    const qb = factory.build('typeorm');
    expect(qb).toBeInstanceOf(TypeORMQueryBuilder);
  });

  it('should throw an error when unrecognized strategy provided', () => {
    const factory = new QueryBuilderFactory();
    const qb = () => factory.build('' as any);
    expect(() => qb()).toThrow();
  });
});
