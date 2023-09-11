<p align="center">
  <img src="https://raw.githubusercontent.com/Tool-Kid/express-query-adapter/main/logo.png" alt="Express Query Adapter logo" width="250" height="187">
</p>

<h1 align="center"> Express Query Adapter </h1>

<p align="center">
  Easily transform an Express req.query into your favourite query tool
  <br>
  <br>
  <img src="https://circleci.com/gh/rjlopezdev/express-query-adapter/tree/main.svg?style=svg">
  <br>
  <br>
  <img src="https://img.shields.io/badge/maintainer-rjlopezdev-orange.svg?link=https://github.com/rjlopezdev">
  <br>
  <a href="https://codecov.io/gh/rjlopezdev/express-query-adapter">
  <img src="https://codecov.io/gh/rjlopezdev/express-query-adapter/branch/main/graph/badge.svg" />
  </a>
  <img src="https://badge.fury.io/js/@tool-kid%2Fexpress-query-adapter.svg">
  <img src="https://img.shields.io/badge/license-MIT-green.svg">
  <br>
  <br>
  <a href="CONTRIBUTING.md"> Contributing </a>
  ·
  <a href="LICENSE"> License </a>
</p>

# Installation

`npm install @tool-kid/express-query-adapter`

# How it works?

![](https://raw.githubusercontent.com/Tool-Kid/express-query-adapter/main/express-adapter-pipeline.png)

# Usage

Use `getQueryBuilder` exported from package and pass your `req.query` as an argument:

```typescript
import { getQueryBuilder } from '@tool-kid/express-query-adapter';

const builder = await getQueryBuilder({ adapter: 'typeorm' });
const builtQuery = builder.build(req.query);
// Now your query is built, pass it to your favourite tool
const results = await fooRepository.find(builtQuery);
```

# Adapters
- [TypeORM](#typeorm)
## TypeORM

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
  const qb = await getQueryBuilder({ adapter: 'typeorm' });
  const built = qb.build(req.query); // => Parsed into req.query
});
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
  const qb = await getQueryBuilder({ adapter: 'typeorm' });
  const built = qb.build(req.query); // => Parsed into req.body
});
```

## Available Lookups

| Lookup          | Behaviour                                                   | Example                |
| --------------- | ----------------------------------------------------------- | ---------------------- |
| _(none)_        | Return entries that match with value                        | `foo=raul`             |
| **contains**    | Return entries that contains value                          | `foo__contains=lopez`  |
| **startswith**  | Return entries that starts with value                       | `foo__startswith=r`    |
| **endswith**    | Return entries that ends with value                         | `foo__endswith=dev`    |
| **icontains**   | Return entries that contains value and ignoring case        | `foo__icontains=Lopez` |
| **istartswith** | Return entries that starts with value and ignoring case     | `foo__istartswith=R`   |
| **iendswith**   | Return entries that ends with value and ignoring case       | `foo__iendswith=Dev`   |
| **isnull**      | Return entries with null value                              | `foo__isnull`          |
| **lt**          | Return entries with value less than or equal to provided    | `foo__lt=18`           |
| **lte**         | Return entries with value less than provided                | `foo__lte=18`          |
| **gt**          | Returns entries with value greater than provided            | `foo__gt=18`           |
| **gte**         | Return entries with value greater than or equal to provided | `foo__gte=18`          |
| **in**          | Return entries that match with values in list               | `foo__in=admin,common` |
| **between**     | Return entries in range (numeric, dates)                    | `foo__between=1,27`    |

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

# Dialect

It is now possible to pass an optional dialect parameter, which will handle exceptional cases that do not work with the query generated by default. For the Typeorm adapter, for example, it is possible to pass `"mongodb"` dialect to generate mongodb queries. This is necessary because mongodb does not support Typeorm's built-in find operators.

## Example

Given the following url query string for dialect `"mongodb"`:

`foo/?name__contains=foo&role__in=3,admin,common&age__gte=18&page=3&limit=10`

It will be transformed into:

```typescript
{
  where: {
    foo: { $regex: /foo/ },
    $or: [
          { role: { $in: ['3', 'admin', 'common'] } },
          { role: { $in: [3, 'admin', 'common'] } },
    ],
    age: { $gte: 18 }
  },
  skip: 20,
  take: 10
}
```

# Profile

If you need to disable some capabilities, you can do using shortcuts to `enable|disable` by default or provide a custom Profile.

A Profile describe capabilities that can be used by clients & its behaviour.

```typescript
const qb = getQueryBuilder({ adapter: 'typeorm', profile: 'enabled' | 'disabled' | ConfigProgile });
const builtQuery = builder.build(req.query);
```

## ConfigProfile

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
};
```

| Field   |  Default  | Behaviour                                                  | Type             |
| ------- | :-------: | ---------------------------------------------------------- | ---------------- |
| options | 'enabled' | Profile options                                            | `ProfileOptions` |
| policy  |  'skip'   | Policy to apply in cases client try use `disabled` options | `FindPolicyType` |
