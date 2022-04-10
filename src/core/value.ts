/**
 * An error thrown when the value of a given key is not considered valid.
 */
export class KeyValueNotValidError extends Error {
  public readonly keys: string[];

  public constructor(keys: string | string[]) {
    let message = '';

    if (typeof keys === 'string') {
      message = `The value for key [${keys}] is not valid`;
    } else {
      message = `The value for keys [${keys.join(', ')}] is not valid`;
    }

    super(message);

    this.name = 'KeyValueNotValidError';

    if (typeof keys === 'string') {
      this.keys = [keys];
    } else {
      this.keys = keys;
    }
  }
}

/**
 * A validator that takes the given value and asserts that it is considered valid.
 */
export type ValueValidatorFunction<T> = (value: T) => boolean;
