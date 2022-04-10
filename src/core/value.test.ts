import { KeyValueNotValidError } from './value';

describe('KeyValueNotValidError', (): void => {
  it('with single key, builds single key error', (): void => {
    const error = new KeyValueNotValidError('foobar');

    expect(error.name).toStrictEqual('KeyValueNotValidError');
    expect(error.message).toStrictEqual('The value for key [foobar] is not valid');
    expect(error.keys).toStrictEqual(['foobar']);
  });

  it('with multiple keys, builds multiple key error', (): void => {
    const error = new KeyValueNotValidError([
      'foobar',
      'another',
      'something',
    ]);

    expect(error.name).toStrictEqual('KeyValueNotValidError');
    expect(error.message).toStrictEqual('The value for keys [foobar, another, something] is not valid');
    expect(error.keys).toStrictEqual([
      'foobar',
      'another',
      'something',
    ]);
  });
});
