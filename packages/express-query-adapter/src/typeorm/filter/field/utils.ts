export function getParsedPrimitiveValue(value: string): unknown {
  if (!value) return value;
  if (value === 'null') return null;
  if (value === 'undefined') return undefined;

  // check if value is a boolean
  if (value === 'true') return true;
  if (value === 'false') return false;

  // check if value is a number
  if (!isNaN(Number(value))) return Number(value);

  // check if value is a date
  const isoDateRegex =
    /^(?:[+-]?\d{4}(?!\d{2}\b))(?:(-?)(?:(?:0[1-9]|1[0-2])(?:\1(?:[12]\d|0[1-9]|3[01]))?|W(?:[0-4]\d|5[0-2])(?:-?[1-7])?|(?:00[1-9]|0[1-9]\d|[12]\d{2}|3(?:[0-5]\d|6[1-6])))(?:[T\s](?:(?:(?:[01]\d|2[0-3])(?:(:?)[0-5]\d)?|24:?00)(?:[.,]\d+(?!:))?)?(?:\2[0-5]\d(?:[.,]\d+)?)?(?:[zZ]|(?:[+-])(?:[01]\d|2[0-3]):?(?:[0-5]\d)?)?)?)?$/;
  if (isoDateRegex.test(value)) return new Date(value);

  return value;
}

export function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
