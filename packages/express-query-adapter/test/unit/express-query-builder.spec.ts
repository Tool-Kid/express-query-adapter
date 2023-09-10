import { getQueryAdapter } from '../../src/express-query-adapter';
import { TypeORMQueryBuilder } from '../../src/typeorm/query-builder';

describe('ExpressQueryBuilder', () => {
  describe('typeorm adapter', () => {
    it('should create an instance', async () => {
      const qb = await getQueryAdapter({ adapter: 'typeorm' });
      expect(qb).toBeInstanceOf(TypeORMQueryBuilder);
    });

    it('should build a query when no dialect is provided', async () => {
      const qb = await getQueryAdapter({ adapter: 'typeorm' });
      const query = qb.build({});
      expect(query).toBeDefined();
    });

    it('should build a query when "mongodb" dialect is provided', async () => {
      const qb = await getQueryAdapter({
        adapter: 'typeorm',
        dialect: 'mongodb',
      });
      const query = qb.build({});
      expect(query).toBeDefined();
    });

    it('should throw an error when invalid dialect is provided', async () => {
      const invalidDialect = 'invalidDialect';
      const qb = () =>
        getQueryAdapter({
          adapter: 'typeorm',
          dialect: invalidDialect as never,
        });
      expect(qb()).rejects.toThrow(
        `Invalid dialect provided: ${invalidDialect}`
      );
    });
  });

  describe('invalid adapter', () => {
    it('should throw an error when invalid adapter is provided', async () => {
      const invalidAdapter = 'invalidAdapter';
      const qb = () => getQueryAdapter({ adapter: invalidAdapter as never });
      expect(qb()).rejects.toThrow(`No adapter found for ${invalidAdapter}`);
    });
  });
});
