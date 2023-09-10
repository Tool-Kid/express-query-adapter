import { QueryAdapter } from '../../src/types';
import { QueryBuilderFactory } from '../../src/query-builder-factory';
import { TypeORMQueryBuilder } from '../../src/typeorm/query-builder';

describe('QueryBuilderFactory', () => {
  it('should create an instance', async () => {
    const factory = new QueryBuilderFactory();
    expect(factory).toBeInstanceOf(QueryBuilderFactory);
  });

  it('should return a TypeORMQueryBuilder instance when <adapter: typeorm>', async () => {
    const factory = new QueryBuilderFactory();
    const qb = await factory.build({ adapter: QueryAdapter.TYPEORM });
    expect(qb).toBeInstanceOf(TypeORMQueryBuilder);
  });

  it('should throw an error when unrecognized adapter provided', async () => {
    const factory = new QueryBuilderFactory();
    const invalidAdapter = 'invalidAdapter';
    const qb = () => factory.build({ adapter: invalidAdapter as never });
    expect(qb()).rejects.toThrow(`No adapter found for ${invalidAdapter}`);
  });
});
