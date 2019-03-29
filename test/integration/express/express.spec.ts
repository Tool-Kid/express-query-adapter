import express = require('express');
import request = require('supertest');
import { QueryBuilder } from '../../../src/query-builder';
import { Like } from 'typeorm';

describe('Test Express integration', () => {

  let server;

  beforeAll((done) => {
    let app = express();
    app.get('/foo', (req, res) => {
      const queryBuilder = new QueryBuilder(req.query);
      const built = queryBuilder.build();
      res.send(built);
    });
    server = app.listen(3000, () => {
      done();
    });
  })

  it('should return an appropiate query built', (done) => {
    request(server)
      .get('/foo?name=rjlopezdev&email__contains=@gmail.com')
      .expect(200)
      .end((err, res) => {
        expect(JSON.parse(res.text)).toEqual({
          where: {
            name: 'rjlopezdev',
            email: Like('%@gmail.com%')
          },
          skip: 0,
          take: 25
        });
        done();
      })
  })

})
