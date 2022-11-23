import { QueryBuilderFactory } from '../../src/factory';
import { TypeORMQueryBuilder } from '../../src/typeorm/query-builder';

describe('QueryBuilderFactory', () => {
  it('should create an instance', async () => {
    const factory = new QueryBuilderFactory();
    expect(factory).toBeInstanceOf(QueryBuilderFactory);
  });

  it('should return a TypeORMQueryBuilder instance when <strategy: typeorm>', async () => {
    const factory = new QueryBuilderFactory();
    const qb = await factory.build('typeorm');
    expect(qb).toBeInstanceOf(TypeORMQueryBuilder);
  });

  it('should throw an error when unrecognized strategy provided', async () => {
    const factory = new QueryBuilderFactory();
    const qb = () => factory.build('' as any);
    expect(() => qb()).rejects.toThrow();
  });
});
