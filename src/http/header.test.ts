import { ensureHttpHeaderMapping, HttpHeaderMapping, HttpHeaderMappingNormalised, normaliseHttpHeaderKey, normaliseHttpHeaderMapping } from './header';

describe('ensureHttpHeaderMapping()', (): void => {
  it('with undefined, return empty header object', (): void => {
    expect(
      ensureHttpHeaderMapping(undefined),
    ).toStrictEqual<HttpHeaderMapping>({});
  });

  it('with null, return empty header object', (): void => {
    expect(
      ensureHttpHeaderMapping(null),
    ).toStrictEqual<HttpHeaderMapping>({});
  });

  it('with header object, return same header object', (): void => {
    expect(
      ensureHttpHeaderMapping({
        foo: 'bar',
      }),
    ).toStrictEqual<HttpHeaderMapping>({
      foo: 'bar',
    });
  });
});

describe('normaliseHttpHeaderKey()', (): void => {
  type TestCase = {
    readonly input: string;
    readonly expected: Lowercase<string>;
  };

  it.each<TestCase>([
    { input: 'CONTENT-TYPE', expected: 'content-type' },
    { input: 'Content-Type', expected: 'content-type' },
    { input: 'content-type', expected: 'content-type' },
  ])('with $input, converts to $expected', (data): void => {
    expect(
      normaliseHttpHeaderKey(data.input),
    ).toStrictEqual<Lowercase<string>>(data.expected)
  });
});

describe('normaliseHttpHeaderMapping()', (): void => {
  it('with header mapping, with upper case keys, normalises', (): void => {
    type HeaderMapping = {
      readonly 'CONTENT-TYPE': string;
      readonly 'CONTENT-LENGTH': string;
    };

    expect(
      normaliseHttpHeaderMapping<HeaderMapping>({
        'CONTENT-TYPE': 'application/json',
        'CONTENT-LENGTH': '30',
      }),
    ).toStrictEqual<HttpHeaderMappingNormalised<HeaderMapping>>({
      'content-type': 'application/json',
      'content-length': '30',
    });
  });

  it('with header mapping, with pascal case keys, normalises', (): void => {
    type HeaderMapping = {
      readonly 'Content-Type': string;
      readonly 'Content-Length': string;
    };

    expect(
      normaliseHttpHeaderMapping<HeaderMapping>({
        'Content-Type': 'application/json',
        'Content-Length': '30',
      }),
    ).toStrictEqual<HttpHeaderMappingNormalised<HeaderMapping>>({
      'content-type': 'application/json',
      'content-length': '30',
    });
  });

  it('with header mapping, with lower case keys, does nothing', (): void => {
    type HeaderMapping = {
      readonly 'content-type': string;
      readonly 'content-length': string;
    };

    expect(
      normaliseHttpHeaderMapping<HeaderMapping>({
        'content-type': 'application/json',
        'content-length': '30',
      }),
    ).toStrictEqual<HttpHeaderMappingNormalised<HeaderMapping>>({
      'content-type': 'application/json',
      'content-length': '30',
    });
  });
});
