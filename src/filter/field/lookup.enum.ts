export enum LookupFilter {
  EXACT = 'exact',
  CONTAINS = 'contains',
  IS_NULL = 'isnull',
  GT = 'gt',
  GTE = 'gte',
  LT = 'lt',
  LTE = 'lte',
  STARTS_WITH = 'startswith',
  ENDS_WITH = 'endswith',
  IN = 'in',
  BETWEEN = 'between',
  NOT = 'not',
}

export enum LookupDelimiter {
  LOOKUP_DELIMITER = '__',
  RELATION_DELIMITER = '.',
}
