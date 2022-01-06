import { ObjectKeyMissingError, okv, okvr } from './object';

const empty: Record<string, unknown> = {} as unknown as Record<string, unknown>;
const source = {
  name: 'jane',
  age: 25,
};

describe('core/object', (): void => {
  describe('ObjectKeyMissingError', (): void => {
    it('with single key, builds single key error', (): void => {
      const error = new ObjectKeyMissingError('foobar');

      expect(error.name).toStrictEqual('ObjectKeyMissingError');
      expect(error.message).toStrictEqual('Missing key [foobar] in the source object');
      expect(error.key).toStrictEqual('foobar');
    });

    it('with multiple keys, builds multiple key error', (): void => {
      const error = new ObjectKeyMissingError([
        'foobar',
        'another',
        'something',
      ]);

      expect(error.name).toStrictEqual('ObjectKeyMissingError');
      expect(error.message).toStrictEqual('Missing keys [foobar, another, something] in source object');
      expect(error.key).toStrictEqual([
        'foobar',
        'another',
        'something',
      ]);
    });
  });

  describe('okv()', (): void => {
    it('with source empty, key missing, returns undefined', (): void => {
      expect(
        okv(empty)('some-key'),
      ).toStrictEqual(undefined);
    });

    it('with source empty, key missing, fallback defined, returns fallback', (): void => {
      expect(
        okv(empty)('another-key', 'some-fallback'),
      ).toStrictEqual('some-fallback');
    });

    it('with source, key missing, returns undefined', (): void => {
      expect(
        okv(source)('unknown-key' as 'name'),
      ).toStrictEqual(undefined);
    });

    it('with source, key missing, fallback defined, returns fallback', (): void => {
      expect(
        okv(source)('missing-key' as 'name', 'fallback-value'),
      ).toStrictEqual('fallback-value');
    });

    it('with source, key found, returns value', (): void => {
      expect(
        okv(source)('name'),
      ).toStrictEqual('jane');

      expect(
        okv(source)('age'),
      ).toStrictEqual(25);
    });
  });

  describe('okvr()', (): void => {
    it('with source empty, enforcement all, key missing, throws error', (): void => {
      expect(
        () => okvr(empty)('missing-key'),
      ).toThrowError(ObjectKeyMissingError);
    });

    it('with source empty, enforcement all, key missing, fallback defined, returns fallback', (): void => {
      expect(
        okvr(empty)('missing-key', 'another-fallback'),
      ).toStrictEqual('another-fallback');
    });

    it('with source empty, enforcement string[], throws error', (): void => {
      expect(
        () => okvr(empty, ['name']),
      ).toThrowError(ObjectKeyMissingError);
    });

    it('with source, enforcement string[], key missing, throws error', (): void => {
      expect(
        () => okvr(source, ['something']),
      ).toThrowError(ObjectKeyMissingError);
    });

    it('with source, enforcement string[], keys available, key missing, fallback defined, returns fallback', (): void => {
      expect(
        okvr(source, ['name'])('missing-key' as 'name', 'another-fallback'),
      ).toStrictEqual('another-fallback');
    });

    it('with source, enforcement string[], keys available, key found, returns value', (): void => {
      expect(
        okvr(source, ['name', 'age'])('name'),
      ).toStrictEqual('jane');
    });
  });
});
