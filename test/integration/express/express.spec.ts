import * as express from 'express'
import * as request from 'supertest'
import { QueryBuilder } from '../../../src/query-builder'
import { Like } from 'typeorm'
import { Server } from 'http'

describe('Test Express integration', () => {
  let server: Server

  beforeAll((done) => {
    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.get('/get', (req, res) => {
      const queryBuilder = new QueryBuilder(req.query)
      const built = queryBuilder.build()
      res.send(built)
    })
    app.post('/post_urlquery', (req, res) => {
      const queryBuilder = new QueryBuilder(req.query)
      const built = queryBuilder.build()
      res.send(built)
    })
    app.post('/post_body', (req, res) => {
      const queryBuilder = new QueryBuilder(req.body)
      const built = queryBuilder.build()
      res.send(built)
    })
    server = app.listen(3000, () => {
      done()
    })
  })

  afterAll(() => {
    server.close()
  })

  it('should return an appropiate query built for GET /get?...', (done) => {
    request(server)
      .get('/get?name=rjlopezdev&email__contains=@gmail.com')
      .expect(200)
      .end((err, res) => {
        expect(JSON.parse(res.text)).toEqual({
          where: {
            name: 'rjlopezdev',
            email: Like('%@gmail.com%'),
          },
          skip: 0,
          take: 25,
        })
        done()
      })
  })

  it('should return an appropiate query built for POST /post_urlquery?...', (done) => {
    request(server)
      .post('/post_urlquery?name=rjlopezdev&email__contains=@gmail.com')
      .expect(200)
      .end((err, res) => {
        expect(JSON.parse(res.text)).toEqual({
          where: {
            name: 'rjlopezdev',
            email: Like('%@gmail.com%'),
          },
          skip: 0,
          take: 25,
        })
        done()
      })
  })

  it('should return an appropiate query built for POST /post_body, body: {...}', (done) => {
    request(server)
      .post('/post_body')
      .send({
        name: 'rjlopezdev',
        email__contains: '@gmail.com',
      })
      .expect(200)
      .end((err, res) => {
        expect(JSON.parse(res.text)).toEqual({
          where: {
            name: 'rjlopezdev',
            email: Like('%@gmail.com%'),
          },
          skip: 0,
          take: 25,
        })
        done()
      })
  })
})
