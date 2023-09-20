import * as express from 'express';
import * as request from 'supertest';
import { TypeORMQueryBuilder } from '../src/typeorm/query-builder';
import { DEFAULT_PAGINATION } from './fixtures/default-pagination';
import { Like } from 'typeorm';
import { Server } from 'http';
import { TypeORMQueryDialect } from '../src/typeorm/query-dialect';

describe('Test Express integration with typeorm adapter', () => {
  let server: Server;

  beforeAll((done) => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.get('/get/:dialect?', (req, res) => {
      const config: Record<string, unknown> = {};
      if (req.params.dialect) {
        config['dialect'] = req.params.dialect as TypeORMQueryDialect;
      }
      const queryBuilder = new TypeORMQueryBuilder(config);
      const built = queryBuilder.build(req.query);
      res.send(built);
    });
    app.post('/post_urlquery/:dialect?', (req, res) => {
      const config: Record<string, unknown> = {};
      if (req.params.dialect) {
        config['dialect'] = req.params.dialect as TypeORMQueryDialect;
      }
      const queryBuilder = new TypeORMQueryBuilder(config);
      const built = queryBuilder.build(req.query);
      res.send(built);
    });
    app.post('/post_body/:dialect?', (req, res) => {
      const config: Record<string, unknown> = {};
      if (req.params.dialect) {
        config['dialect'] = req.params.dialect as TypeORMQueryDialect;
      }
      const queryBuilder = new TypeORMQueryBuilder(config);
      const built = queryBuilder.build(req.body);
      res.send(built);
    });
    server = app.listen(3000, () => {
      done();
    });
  });

  afterAll(() => {
    server.close();
  });

  describe('tests with no provided dialect', () => {
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
            ...DEFAULT_PAGINATION,
          });
          done();
        });
    });

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
            ...DEFAULT_PAGINATION,
          });
          done();
        });
    });

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
            ...DEFAULT_PAGINATION,
          });
          done();
        });
    });
  });

  describe('tests with "mongodb" dialect', () => {
    it('should return an appropiate query built for GET /get?...', (done) => {
      request(server)
        .get('/get/mongodb?name=rjlopezdev&age__not__gte=50')
        .expect(200)
        .end((err, res) => {
          expect(res.body).toEqual({
            where: {
              $and: [
                {
                  $or: [
                    { name: { $eq: 'rjlopezdev' } },
                    { name: { $eq: 'rjlopezdev' } },
                  ],
                },
                { age: { $not: { $gte: 50 } } },
              ],
            },
            ...DEFAULT_PAGINATION,
          });
          done();
        });
    });

    it('should return an appropiate query built for POST /post_urlquery?...', (done) => {
      request(server)
        .post('/post_urlquery/mongodb?name=rjlopezdev&age__not__gte=50')
        .expect(200)
        .end((err, res) => {
          expect(res.body).toEqual({
            where: {
              $and: [
                {
                  $or: [
                    { name: { $eq: 'rjlopezdev' } },
                    { name: { $eq: 'rjlopezdev' } },
                  ],
                },
                { age: { $not: { $gte: 50 } } },
              ],
            },
            ...DEFAULT_PAGINATION,
          });
          done();
        });
    });

    it('should return an appropiate query built for POST /post_body, body: {...}', (done) => {
      request(server)
        .post('/post_body/mongodb')
        .send({
          name: 'rjlopezdev',
          age__not__gte: '50',
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body).toEqual({
            where: {
              $and: [
                {
                  $or: [
                    { name: { $eq: 'rjlopezdev' } },
                    { name: { $eq: 'rjlopezdev' } },
                  ],
                },
                { age: { $not: { $gte: 50 } } },
              ],
            },
            ...DEFAULT_PAGINATION,
          });
          done();
        });
    });
  });
});
