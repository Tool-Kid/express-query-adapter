import { ExpressQueryBuilder } from '../../src/express-query-builder'

describe('ExpressQueryBuilder', () => {
  it('should create an instance', () => {
    const qb = new ExpressQueryBuilder({ strategy: 'typeorm' })
    expect(qb).toBeInstanceOf(ExpressQueryBuilder)
  })

  it('should build a query', () => {
    const qb = new ExpressQueryBuilder({ strategy: 'typeorm' })
    const query = qb.build({})
    expect(query).toBeDefined()
  })
})
