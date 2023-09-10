import { LookupBuilderFactory } from '../lookup-builder-factory';
import { LookupFilter } from '../lookup.enum';
import { ExactLookup } from '../lookups';

describe('LookupBuilderFactory', () => {
  it('should return builder when valid lookup is provided', async () => {
    const lookupBuilderFactory = new LookupBuilderFactory();
    const builder = lookupBuilderFactory.build({ lookup: LookupFilter.EXACT });
    expect(builder).toBeInstanceOf(ExactLookup);
  });
  it('should throw an error when invalid lookup is provided', async () => {
    const lookupBuilderFactory = new LookupBuilderFactory();
    const b = () => lookupBuilderFactory.build({ lookup: 'invalid' as never });
    expect(b).toThrow('Unsupported lookup invalid');
  });
});
