import { HttpMethod, normaliseHttpMethod } from './method';

describe('normaliseHttpMethod()', (): void => {
  type TestCase = {
    readonly input: string;
    readonly expected: Uppercase<HttpMethod>;
  };

  it.each<TestCase>([
    { input: 'delete', expected: 'DELETE' },
    { input: 'Delete', expected: 'DELETE' },
    { input: 'DELETE', expected: 'DELETE' },
  ])('with $input, normalises to $expected', (data): void => {
    expect(
      normaliseHttpMethod(data.input as HttpMethod),
    ).toStrictEqual<Uppercase<HttpMethod>>(data.expected);
  });
});
