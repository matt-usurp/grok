import { KeyValueNotValidError } from './value';

describe('KeyValueNotValidError', (): void => {
  it('with given key, constructs error', (): void => {
    const error = new KeyValueNotValidError('foobar');

    expect(error.name).toStrictEqual('KeyValueNotValidError');
    expect(error.message).toStrictEqual('The value for key [foobar] is not valid');
    expect(error.key).toStrictEqual('foobar');
  });
});
