import { getQueryBuilder } from '../../src/express-query-builder';
import { TypeORMQueryBuilder } from '../../src/typeorm/query-builder';

describe('ExpressQueryBuilder', () => {
  it('should create an instance', () => {
    const qb = getQueryBuilder({ adapter: 'typeorm' });
    expect(qb).toBeInstanceOf(TypeORMQueryBuilder);
  });

  it('should build a query', () => {
    const qb = getQueryBuilder({ adapter: 'typeorm' });
    const query = qb.build({});
    expect(query).toBeDefined();
  });
});
