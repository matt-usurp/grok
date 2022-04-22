import { KeyValueNotValidError, union } from './value';

const source = {
  name: 'jane',
  age: 25,
};

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

describe('union()', (): void => {
  it('with union, enforces all values, returns keys', (): void => {
    expect(
      union<keyof typeof source>({
        name: undefined,
        age: undefined,
      }),
    ).toStrictEqual([
      'name',
      'age',
    ]);
  });
});
