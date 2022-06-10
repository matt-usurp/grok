import { never, NeverReachAssertionError } from './assert-never';

describe('NeverReachAssertionError', (): void => {
  it('with no parameter, generates expected error message', (): void => {
    const error = new NeverReachAssertionError();

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toStrictEqual('NeverReachAssertionError');
    expect(error.message).toStrictEqual('A never reach assertion was executed');
  });

  it('with parameter, string, generates expected error message', (): void => {
    const error = new NeverReachAssertionError('foo-baz');

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toStrictEqual('NeverReachAssertionError');
    expect(error.message).toStrictEqual('A never reach assertion was executed with given value: "foo-baz"');
  });

  it('with parameter, object, generates expected error message using json encode', (): void => {
    const error = new NeverReachAssertionError({
      name: 'jane',
      age: 32,
    });

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toStrictEqual('NeverReachAssertionError');
    expect(error.message).toStrictEqual('A never reach assertion was executed with given value: {"name":"jane","age":32}');
  });
});

describe('never()', (): void => {
  it('with no parameter, throws error', async (): Promise<void> => {
    try {
      never();
    } catch (caught: unknown) {
      expect(caught).toBeInstanceOf(Error);

      const error: Error = caught as Error;

      expect(error.name).toStrictEqual('NeverReachAssertionError');
      expect(error.message).toStrictEqual('A never reach assertion was executed');

      return;
    }

    throw new Error('Expected an error to have been thrown!');
  });

  it('with parameter, string, throws error', async (done): Promise<void> => {
    try {
      never('baz-joe' as never);
    } catch (caught: unknown) {
      expect(caught).toBeInstanceOf(Error);

      const error: Error = caught as Error;

      expect(error.name).toStrictEqual('NeverReachAssertionError');
      expect(error.message).toStrictEqual('A never reach assertion was executed with given value: "baz-joe"');

      return;
    }

    throw new Error('Expected an error to have been thrown!');
  });

  it('with parameter, number, throws error', async (): Promise<void> => {
    try {
      never(123 as never);
    } catch (caught: unknown) {
      expect(caught).toBeInstanceOf(Error);

      const error: Error = caught as Error;

      expect(error.name).toStrictEqual('NeverReachAssertionError');
      expect(error.message).toStrictEqual('A never reach assertion was executed with given value: 123');

      return;
    }

    throw new Error('Expected an error to have been thrown!');
  });
});
