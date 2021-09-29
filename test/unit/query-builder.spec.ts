import { QueryBuilder } from '../../src/query-builder';
import { Like } from 'typeorm';
import { ITEMS_PER_PAGE } from '../../src/profile/default-config';


describe('Test Query Builder #build', () => {

  it('should build a query with an exact & contains filter', () => {
    const queryBuilder = new QueryBuilder({
      name: 'rjlopezdev',
      email__contains: '@gmail.com'
    });
    const build = queryBuilder.build();
    expect(build).toEqual({
      where: {
        name: 'rjlopezdev',
        email: Like('%@gmail.com%'),
      },
      skip: 0,
      take: ITEMS_PER_PAGE,
    });
  });

  it('should build a query with skip equals to 0 and take equals to ITEMS_PER_PAGE', () => {
    const queryBuilder = new QueryBuilder({
      name: 'rjlopezdev',
      email__contains: '@gmail.com',
      page: 1
    });
    const build = queryBuilder.build();
    expect(build).toEqual({
      where: {
        name: 'rjlopezdev',
        email: Like('%@gmail.com%'),
      },
      skip: 0,
      take: ITEMS_PER_PAGE,
    });
  });

  it('should build a query with skip equals to ITEMS_PER_PAGE and take equals to ITEMS_PER_PAGE', () => {
    const queryBuilder = new QueryBuilder({
      name: 'rjlopezdev',
      email__contains: '@gmail.com',
      page: 2
    });
    const build = queryBuilder.build();
    expect(build).toEqual({
      where: {
        name: 'rjlopezdev',
        email: Like('%@gmail.com%'),
      },
      skip: ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    });
  });

  it('should build a query with skip equals to 50 and take equals to ITEMS_PER_PAGE', () => {
    const queryBuilder = new QueryBuilder({
      name: 'rjlopezdev',
      email__contains: '@gmail.com',
      page: 3
    });
    const build = queryBuilder.build();
    expect(build).toEqual({
      where: {
        name: 'rjlopezdev',
        email: Like('%@gmail.com%'),
      },
      skip: 50,
      take: ITEMS_PER_PAGE,
    });
  });

  it('should build a query with skip equals to 20 and take equals to 10', () => {
    const queryBuilder = new QueryBuilder({
      name: 'rjlopezdev',
      email__contains: '@gmail.com',
      page: 3,
      limit: 10
    });
    const build = queryBuilder.build();
    expect(build).toEqual({
      where: {
        name: 'rjlopezdev',
        email: Like('%@gmail.com%'),
      },
      skip: 20,
      take: 10,
    });
  });

  it('should build a query with no paginated results when pagination equals to false', () => {
      const queryBuilder = new QueryBuilder({
        name: 'rjlopezdev',
        email__contains: '@gmail.com',
        pagination: false
      });
      const build = queryBuilder.build();
      expect(build).toEqual({
        where: {
          name: 'rjlopezdev',
          email: Like('%@gmail.com%'),
        },
      });
    });

  it('should build a query with paginated results when pagination equals to true', () => {
      const queryBuilder = new QueryBuilder({
        name: 'rjlopezdev',
        email__contains: '@gmail.com',
        pagination: true
      });
      const build = queryBuilder.build();
      expect(build).toEqual({
        where: {
          name: 'rjlopezdev',
          email: Like('%@gmail.com%'),
        },
        skip: 0,
        take: ITEMS_PER_PAGE,
      });
    })

    it('should build a query with paginated results when pagination equals undefined', () => {
      const queryBuilder = new QueryBuilder({
        name: 'rjlopezdev',
        email__contains: '@gmail.com',
      });
      const build = queryBuilder.build();
      expect(build).toEqual({
        where: {
          name: 'rjlopezdev',
          email: Like('%@gmail.com%'),
        },
        skip: 0,
        take: ITEMS_PER_PAGE,
      });
    })
});

describe('Test QueryBuilder #setPage', () => {

  it('should return a skip equals to 0 when page property is not provided', () => {
    const queryBuilder: any = new QueryBuilder({});
    const query = queryBuilder.build();
    expect(query).toEqual({
      skip: 0,
      take: 25,
    })
  })

  it('should return a skip equals to 0 when page equals to 1', () => {
    const queryBuilder: QueryBuilder = new QueryBuilder({
      page: 1
    });
    const query = queryBuilder.build();
    expect(query).toEqual({
      skip: 0,
      take: 25,
    });
  })

  it('should return a skip equals to ITEMS_PER_PAGE when page equals to 2', () => {
    const queryBuilder: QueryBuilder = new QueryBuilder({
      page: 2
    });
    const query = queryBuilder.build();
    expect(query).toEqual({
      skip: ITEMS_PER_PAGE,
      take: 25,
    });
  })
})

describe('Test QueryBuilder #setLimit', () => {

  it('should return a take equals to ITEMS_PER_PAGE when limit is not provided', () => {
    const queryBuilder: QueryBuilder = new QueryBuilder({});
    const query = queryBuilder.build();
    expect(query).toEqual({
      take: ITEMS_PER_PAGE,
      skip: 0,
    });
  })

  it('should return a take equals to ITEMS_PER_PAGE when limit equals to 0', () => {
    const queryBuilder: QueryBuilder = new QueryBuilder({
      limit: 0
    });
    const query = queryBuilder.build();
    expect(query).toEqual({
      take: ITEMS_PER_PAGE,
      skip: 0,
    });
  })

  it('should return a take equals to 1 when limit equals to 1', () => {
    const queryBuilder: QueryBuilder = new QueryBuilder({
      limit: 1
    });
    const query = queryBuilder.build();
    expect(query).toEqual({
      take: 1,
      skip: 0,
    });
  })
})


describe('Test QueryBuilder #setOrder', () => {

  it('should return a query with no order property', () => {
    const queryBuilder: QueryBuilder = new QueryBuilder({});
    const query = queryBuilder.build();
    expect(query).toEqual({
      skip: 0,
      take: 25,
    });
  })

  it('should return a query with order equals to foo:ASC', () => {
    const queryBuilder: QueryBuilder = new QueryBuilder({
      order: '+foo'
    });
    const query = queryBuilder.build();
    expect(query).toEqual({
      order: {
        foo: 'ASC'
      },
      skip: 0,
      take: 25,
    });
  })

  it('should return a query with order equals to foo:DESC', () => {
    const queryBuilder: QueryBuilder = new QueryBuilder({
      order: '-foo'
    });
    const query = queryBuilder.build();
    expect(query).toEqual({
      order: {
        foo: 'DESC'
      },
      skip: 0,
      take: 25,
    });
  })

  it('should thrown an error when order criteria is not provided', () => {
    const queryBuilder: QueryBuilder = new QueryBuilder({
      order: 'foo'
    });
    expect(() => queryBuilder.build()).toThrow();
  })
})


describe('Test QueryBuilder #getOrderCriteria', () => {

  it('should return a query with order equals to foo:ASC', () => {
    const queryBuilder: QueryBuilder = new QueryBuilder({
      order: '+foo',
    });
    const query = queryBuilder.build();
    expect(query).toStrictEqual({
      order: {
        foo: 'ASC',
      },
      skip: 0,
      take: 25,
    });
  })

  it('should return a query with order equals to foo:DESC', () => {
    const queryBuilder: QueryBuilder = new QueryBuilder({
      order: '-foo',
    });
    const query = queryBuilder.build();
    expect(query).toStrictEqual({
      order: {
        foo: 'DESC',
      },
      skip: 0,
      take: 25,
    })
  })

  it('should thrown an error when order criteria is not provided', () => {
    const queryBuilder: any = new QueryBuilder({});
    expect(() => {
      queryBuilder.getOrderCriteria('foo')
    }).toThrow();
  })
})


describe('Test QueryBuilder <with>', () => {
  it(`should return a query with no 'with' property`, () => {
    const queryBuilder: QueryBuilder = new QueryBuilder({});
    const query = queryBuilder.build();
    expect(query).toEqual({
      skip: 0,
      take: 25,
    });
  })

  it(`should return a query with relationse equal to ['foo1', 'foo2']`, () => {
    const queryBuilder: QueryBuilder = new QueryBuilder({
      with: 'foo1,foo2'
    });
    const query = queryBuilder.build();
    expect(query).toEqual({
      relations: ['foo1', 'foo2'],
      skip: 0,
      take: 25,
    });
  })
})

describe('Test QueryBuilder <select>', () => {
  it(`should return a query with no 'select' property when no provided`, () => {
    const queryBuilder: QueryBuilder = new QueryBuilder({});
    const query = queryBuilder.build();
    expect(query).toEqual({
      skip: 0,
      take: 25,
    });
  })
  it(`should return a query with 'select' property when single selectors provided`, () => {
    const queryBuilder: QueryBuilder = new QueryBuilder({
      select: 'foo1,foo2'
    });
    const query = queryBuilder.build();
    expect(query).toEqual({
      select: ['foo1', 'foo2'],
      skip: 0,
      take: 25,
    });
  })

  it(`should return a query with 'select' property when single selectors provided`, () => {
    const queryBuilder: QueryBuilder = new QueryBuilder({
      select: 'foo1,foo2,foo3.nested'
    });
    const query = queryBuilder.build();
    expect(query).toEqual({
      select: ['foo1', 'foo2', 'foo3.nested'],
      skip: 0,
      take: 25,
    });
  })
})
