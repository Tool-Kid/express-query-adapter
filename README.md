<p align="center">
  <img src="https://raw.githubusercontent.com/rjlopezdev/typeorm-express-query-builder/master/logo.jpg" alt="TypeORM Express Query Builder logo" width="200" height="200">
</p>

<h1 align="center"> TypeORM Express Query Builder </h1>

<p align="center">
  Easily transform an Express req.query into TypeORM query
  <br>
  <br>
  <img src="https://circleci.com/gh/rjlopezdev/typeorm-express-query-builder/tree/master.svg?style=svg">
  <br>
  <br>
  <img src="https://img.shields.io/badge/maintainer-rjlopezdev-orange.svg?link=https://github.com/rjlopezdev">
  <br>
  <a href="https://codecov.io/gh/rjlopezdev/typeorm-express-query-builder">
  <img src="https://codecov.io/gh/rjlopezdev/typeorm-express-query-builder/branch/master/graph/badge.svg" />
  </a>
  <img src="https://badge.fury.io/js/typeorm-express-query-builder.svg">
  <img src="https://img.shields.io/badge/license-MIT-green.svg">
  <br>
  <br>
  <a href="CONTRIBUTING.md"> Contributing </a>
  ·
  <a href="LICENSE"> License </a>
</p>

# TypeORM Express Query Builder

This library allows you to transfrom automatically Express.js _req.query_ into TypeORM findOptions queries.

## Installation

`npm install typeorm-express-query-builder`

## How it works?

![](https://raw.githubusercontent.com/rjlopezdev/typeorm-express-query-builder/master/typeorm-express-pipeline.png)

## Usage

Use QueryBuilder export from package and pass your `req.query` as an argument:

```typescript
import QueryBuilder from 'typeorm-express-query-builder'

const builder = new QueryBuilder(req.query)
const builtQuery = builder.build()
// Now your query is built, pass it to your TypeORM repository
const results = await fooRepository.find(builtQuery)
```

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

## Different ways of retrieve data

### GET, POST method by url query string

`GET foo/?name__contains=foo&role__in=admin,common&age__gte=18&page=3&limit=10`

`POST foo/?name__contains=foo&role__in=admin,common&age__gte=18&page=3&limit=10`

```javascript
app.get('/foo', (req, res) => {
  const queryBuilder = new QueryBuilder(req.query) // => Parsed into req.query
  const built = queryBuilder.build()
})
```

### POST method by body

```javascript
POST foo/, body: {
  "name__contains": "foo",
  "role__in": "admin,common",
  "age__gte": 18,
  "page": 3,
  "limit": 10
}
```

```javascript
app.post('/foo', (req, res) => {
  const queryBuilder = new QueryBuilder(req.body) // => Parsed into req.body
  const built = queryBuilder.build()
})
```

## Available Lookups

| Lookup         | Behaviour                                                   | Example                |
| -------------- | ----------------------------------------------------------- | ---------------------- |
| _(none)_       | Return entries that match with value                        | `foo=raul`             |
| **contains**   | Return entries that contains value                          | `foo__contains=lopez`  |
| **startswith** | Return entries that starts with value                       | `foo__startswith=r`    |
| **endswith**   | Return entries that ends with value                         | `foo__endswith=dev`    |
| **isnull**     | Return entries with null value                              | `foo__isnull`          |
| **lt**         | Return entries with value less than or equal to provided    | `foo__lt=18`           |
| **lte**        | Return entries with value less than provided                | `foo__lte=18`          |
| **gt**         | Returns entries with value greater than provided            | `foo__gt=18`           |
| **gte**        | Return entries with value greater than or equal to provided | `foo__gte=18`          |
| **in**         | Return entries that match with values in list               | `foo__in=admin,common` |
| **between**    | Return entries in range                                     | `foo__between=1,27`    |

**Notice**: you can use negative logic prefixing lookup with `__not`.

_Example:_
`foo__not__contains=value`

## Options

### Pagination

| Option     | Default  | Behaviour                                                   | Example            |
| ---------- | :------: | ----------------------------------------------------------- | ------------------ |
| pagination | **true** | If _true_, paginate results. If _false_, disable pagination | `pagination=false` |
| page       |  **1**   | Return entries for page `page`                              | `page=2`           |
| limit      |  **25**  | Return entries for page `page` paginated by size `limit`    | `limit=15`         |

### Ordering

| Option | Default | Behaviour                                                | Example                     |
| ------ | :-----: | -------------------------------------------------------- | --------------------------- |
| order  |    -    | Order for fields:<br>`+`: Ascendant <br> `-`: Descendant | `order=+foo,-name,+surname` |

### Selection

| Option | Default | Behaviour                                                           | Example                          |
| ------ | :-----: | ------------------------------------------------------------------- | -------------------------------- |
| select |    -    | Fields to select as response. If no provided, it select all fields. | `select=name,surname,foo.nested` |
| with   |    -    | Entity relations to attach to query                                 | `with=posts,comments`            |

## Profile

If you need to disable some capabilities, you can do using shortcuts to `enable|disable` by default or provide a custom Profile.

A Profile describe capabilities that can be used by clients & its behaviour.

```typescript
const qb = new QueryBuilder(req.query, 'enabled' | 'disabled' | ConfigProgile)
```

### ConfigProfile

`ConfigProfile` object looks like:

```typescript
const customProfile: ConfigProfile = {
  options: {
    pagination: {
      status: 'enabled',
      paginate: true,
      itemsPerPage: 25,
    },
    ordering: {
      status: 'enabled',
    },
    relations: {
      status: 'enabled',
    },
    select: {
      status: 'enabled',
    },
  },
  policy: 'skip',
}
```

| Field   |  Default  | Behaviour                                                  | Type             |
| ------- | :-------: | ---------------------------------------------------------- | ---------------- |
| options | 'enabled' | Profile options                                            | `ProfileOptions` |
| policy  |  'skip'   | Policy to apply in cases client try use `disabled` options | `FindPolicyType` |
