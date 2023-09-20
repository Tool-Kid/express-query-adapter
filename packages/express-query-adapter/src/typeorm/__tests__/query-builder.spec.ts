import { Between } from 'typeorm';
import { TypeORMQueryBuilder } from '../query-builder';
import { TypeORMQueryDialect } from '../query-dialect';

describe('TypeORMQueryBuilder', () => {
  it('should build query successfully when no dialect is provided', () => {
    const config = {};
    const queryBuilder = new TypeORMQueryBuilder(config);
    const expressQuery = {
      createdAt__between: '2023-09-10T18:00:00.405Z,2023-09-10T19:00:00.405Z',
    };
    const result = queryBuilder.build(expressQuery);
    expect(result).toEqual(
      expect.objectContaining({
        where: {
          createdAt: Between(
            new Date('2023-09-10T18:00:00.405Z'),
            new Date('2023-09-10T19:00:00.405Z')
          ),
        },
      })
    );
  });

  it('should build query successfully when mongodb dialect is provided', () => {
    const config = { dialect: TypeORMQueryDialect.MONGODB };
    const queryBuilder = new TypeORMQueryBuilder(config);
    const expressQuery = {
      createdAt__between: '2023-09-10T18:00:00.405Z,2023-09-10T19:00:00.405Z',
    };
    const result = queryBuilder.build(expressQuery);
    expect(result).toEqual(
      expect.objectContaining({
        where: {
          $and: [
            {
              createdAt: {
                $gte: new Date('2023-09-10T18:00:00.405Z'),
                $lte: new Date('2023-09-10T19:00:00.405Z'),
              },
            },
          ],
        },
      })
    );
  });

  it('should throw an error when invalid dialect is provided', () => {
    const invalidDialect = 'invalidDialect';
    const config = { dialect: invalidDialect as never };
    const qb = () => new TypeORMQueryBuilder(config);

    expect(qb).toThrow(`Invalid dialect provided: ${invalidDialect}`);
  });
});
