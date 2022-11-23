import { getQueryAdapter } from '../../src/express-query-adapter';
import { TypeORMQueryBuilder } from '../../src/typeorm/query-builder';

describe('ExpressQueryBuilder', () => {
  it('should create an instance', async () => {
    const qb = await getQueryAdapter({ adapter: 'typeorm' });
    expect(qb).toBeInstanceOf(TypeORMQueryBuilder);
  });

  it('should build a query', async () => {
    const qb = await getQueryAdapter({ adapter: 'typeorm' });
    const query = qb.build({});
    expect(query).toBeDefined();
  });
});
