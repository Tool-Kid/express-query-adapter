import { Between, FindOptionsUtils } from 'typeorm';
import { LookupBuilder } from '../lookup';
import { getParsedPrimitiveValue } from '../utils';
import { TypeORMQueryDialect } from '../../../query-dialect';

export class BetweenLookup extends LookupBuilder {
  build(prop: string, value: string): Record<string, FindOptionsUtils> {
    const [value1, value2] = value.split(',');

    if (this.dialect === TypeORMQueryDialect.MONGODB) {
      return {
        [prop]: {
          $gte: getParsedPrimitiveValue(value1),
          $lte: getParsedPrimitiveValue(value2),
        },
      };
    } else {
      const isoDateRegex =
        /^(?:[+-]?\d{4}(?!\d{2}\b))(?:(-?)(?:(?:0[1-9]|1[0-2])(?:\1(?:[12]\d|0[1-9]|3[01]))?|W(?:[0-4]\d|5[0-2])(?:-?[1-7])?|(?:00[1-9]|0[1-9]\d|[12]\d{2}|3(?:[0-5]\d|6[1-6])))(?:[T\s](?:(?:(?:[01]\d|2[0-3])(?:(:?)[0-5]\d)?|24:?00)(?:[.,]\d+(?!:))?)?(?:\2[0-5]\d(?:[.,]\d+)?)?(?:[zZ]|(?:[+-])(?:[01]\d|2[0-3]):?(?:[0-5]\d)?)?)?)?$/;
      const isDate = isoDateRegex.test(value1) && isoDateRegex.test(value2);
      const { from, to } = isDate
        ? { from: new Date(value1), to: new Date(value2) }
        : { from: +value1, to: +value2 };
      return { [prop]: Between(from, to) };
    }
  }
}
