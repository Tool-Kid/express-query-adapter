# TypeORM Express Query Builder
This library allows you to transfrom automatically Express.js _req.query_ into TypeORM findOptions queries.

_(Work In Progress)_

## Installation

`npm install typeorm-express-query-builder`


## Usage

Use QueryBuilder export from package and pass your `req.query` as an argument:

```typescript
import QueryBuilder from 'typeorm-express-query-builder';

const builder = QueryBuilder(req.query);
const builtQuery = builder.build();
// Now your query is built, pass it to your TypeORM repository
const results = await fooRepository.find(builtQuery);
```

## Building queries from url

Given the following url query string:

`foo/?name__contains=foo&role__in=admin,common&age__gte=18&page=3&limit=10`

It will be transformed into:

```typescript
{
  where: {
    foo: Like('%foo%'),
    role: In(['admin', 'common']),
    age: MoreThanOrEqual(18)
  },
  skip: 20,
  take: 10
}
```
