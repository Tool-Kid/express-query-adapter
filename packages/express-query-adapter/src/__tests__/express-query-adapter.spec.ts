import { getQueryAdapter } from '../express-query-adapter';
import { QueryBuilderFactory } from '../query-builder-factory';

describe('getQueryAdapter method', () => {
  it('should call factory.build once and return the result', async () => {
    const mockQueryBuilder = { build: jest.fn() };

    const spy = jest
      .spyOn(QueryBuilderFactory.prototype, 'build')
      .mockReturnValue(Promise.resolve(mockQueryBuilder as never));

    const result = await getQueryAdapter({
      adapter: 'typeorm',
      dialect: 'mongodb',
    });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(Object.is(result, mockQueryBuilder)).toBe(true);
  });
});
