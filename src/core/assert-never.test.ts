import { never, NeverReachAssertionError } from './assert-never';

describe('core/assert-never', (): void => {
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
    it('with no parameter, throws error', (done): void => {
      try {
        never();
      } catch (caught: unknown) {
        expect(caught).toBeInstanceOf(Error);

        const error: Error = caught as Error;

        expect(error.name).toStrictEqual('NeverReachAssertionError');
        expect(error.message).toStrictEqual('A never reach assertion was executed');

        done();

        return;
      }

      done.fail('Expected an error to have been thrown!');
    });

    it('with parameter, string, throws error', (done): void => {
      try {
        never('baz-joe' as never);
      } catch (caught: unknown) {
        expect(caught).toBeInstanceOf(Error);

        const error: Error = caught as Error;

        expect(error.name).toStrictEqual('NeverReachAssertionError');
        expect(error.message).toStrictEqual('A never reach assertion was executed with given value: "baz-joe"');

        done();

        return;
      }

      done.fail('Expected an error to have been thrown!');
    });

    it('with parameter, number, throws error', (done): void => {
      try {
        never(123 as never);
      } catch (caught: unknown) {
        expect(caught).toBeInstanceOf(Error);

        const error: Error = caught as Error;

        expect(error.name).toStrictEqual('NeverReachAssertionError');
        expect(error.message).toStrictEqual('A never reach assertion was executed with given value: 123');

        done();

        return;
      }

      done.fail('Expected an error to have been thrown!');
    });
  });
});
