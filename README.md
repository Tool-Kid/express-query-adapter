<p align="center">
  <img src="logo.jpg" alt="Ngx Guardian logo" width="200" height="200">
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

![](typeorm-express-pipeline.png)


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

## Available Lookups

| Lookup | Behaviour | Example |
| --- | --- | --- |
_(none)_ | Return entries that match with value | `?foo=raul`
__contains__ | Return entries that contains value | `?foo__contains=lopez`
__startswith__ | Return entries that starts with value | `?foo__startswith=r`
__endswith__ | Return entries that ends with value | `?foo__endswith=dev`
__isnull__ | Return entries with null value | `?foo__isnull`
__lt__ | Return entries with value less than or equal to provided | `?foo__lt=18`
__lte__ | Return entries with value less than provided | `?foo__lte=18`
__gt__ | Returns entries with value greater tahn provided | `?foo__gt=18`
__gte__ | Return entries with value greater then or equal to provided | `?foo__gte=18`
__in__ | Return entries that match with values in list | `?foo__in=admin,common`
__between__ | Return entries in range | `?foo__between=1,27`

## Extra options

| Option | Default | Behaviour |
| --- | :---: | --- |
page | __1__ | Entries page
limit | __25__ | Page size
