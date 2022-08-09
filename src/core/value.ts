import type { Provider } from '../index';

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

/**
 * A type that enforces all members of union through a mapping.
 *
 * This type is used to enforce all values within an union are defined, this is done by making a mapping of them.
 * The values of this are ignored, but done because its difficult to enforce all values within a union.
 */
export type UnionKeyEnforcementMapping<K extends string> = Record<K, undefined>;

export const union = <T extends string>(keys: UnionKeyEnforcementMapping<T>): T[] => Object.keys(keys) as T[];

/**
 * Create a function that will provide the given value {@link T} when called.
 *
 * This is functional sugar for the type `() => T` and can be used with composition.
 */
export const provide = <T>(value: T): Provider<T> => () => value;
