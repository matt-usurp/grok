import { cleanse, ensure, normalise } from './environment';

describe('cleanse()', (): void => {
  it('with value, no-whitespace, return value', (): void => {
    expect(
      cleanse('another planet'),
    ).toStrictEqual('another planet');
  });

  it('with value, extra whitespace, return trimmed', (): void => {
    expect(
      cleanse(' hello world '),
    ).toStrictEqual('hello world');
  });
});

describe('normalise()', (): void => {
  it('with value, given undefined, return undefined', (): void => {
    expect(
      normalise(undefined),
    ).toStrictEqual(undefined);
  });

  it('with value, given string, empty, return undefined', (): void => {
    expect(
      normalise(''),
    ).toStrictEqual(undefined);
  });

  it('with value, given string, blanks, return undefined', (): void => {
    expect(
      normalise('  '),
    ).toStrictEqual(undefined);
  });

  it('with value, given string, non-empty, return string', (): void => {
    expect(
      normalise('something'),
    ).toStrictEqual('something');
  });
});

describe('ensure()', (): void => {
  it('with value, given undefined, return false', (): void => {
    expect(
      ensure(undefined),
    ).toStrictEqual(false);
  });

  it('with value, given string, empty, return false', (): void => {
    expect(
      ensure(''),
    ).toStrictEqual(false);
  });

  it('with value, given string, blanks, return false', (): void => {
    expect(
      ensure('   '),
    ).toStrictEqual(false);
  });

  it('with value, given string, non-empty, return true', (): void => {
    expect(
      ensure('another'),
    ).toStrictEqual(true);
  });
});
