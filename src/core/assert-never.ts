/**
 * An error that can be used in never reach assertions.
 * The given value is optional, if provided its JSON encoded as part of the message.
 */
export class NeverReachAssertionError extends Error {
  public constructor(value?: unknown) {
    const message = 'A never reach assertion was executed';

    if (value === undefined) {
      super(message);
    } else {
      const json = JSON.stringify(value);

      super(`${message} with given value: ${json}`);
    }

    this.name = 'NeverReachAssertionError';
  }
}

/**
 * Assert a line is never reached.
 *
 * When executed a {@link NeverReachAssertionError} is thrown.
 * The given value will mentioned in the thrown error (encoded as json).
 */
export const never = (value?: never): void => {
  throw new NeverReachAssertionError(value);
};
