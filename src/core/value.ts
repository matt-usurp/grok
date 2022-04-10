/**
 * An error thrown when the value of a given key is not considered valid.
 */
export class KeyValueNotValidError extends Error {
  public readonly key: string;

  public constructor(key: string) {
    super(`The value for key [${key}] is not valid`);

    this.name = 'KeyValueNotValidError';
    this.key = key;
  }
}

/**
 * A validator that takes the given value and asserts that it is considered valid.
 */
export type ValueValidatorFunction<T> = (value: T) => boolean;
