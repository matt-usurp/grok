import { Grok } from '../index';
import { KeyValueNotValidError, ValueValidatorFunction } from './value';

/**
 * An error thrown when the object is missing a required key.
 */
export class ObjectKeyMissingError extends Error {
  public readonly keys: string[];

  public constructor(keys: string | string[]) {
    let message = '';

    if (typeof keys === 'string') {
      message = `Missing key [${keys}] in the source object`;
    } else {
      message = `Missing keys [${keys.join(', ')}] in source object`;
    }

    super(message);

    this.name = 'ObjectKeyMissingError';

    if (typeof keys === 'string') {
      this.keys = [keys];
    } else {
      this.keys = keys;
    }
  }
}

export type ObjectKeyValueAccessor<M extends Grok.Constraint.ObjectLike> = <K extends keyof M>(key: K, fallback?: M[K]) => M[K];

export type ObjectKeyValueFactory = <M extends Grok.Constraint.ObjectLike>(source: Partial<M>) => ObjectKeyValueAccessor<M>;
export type ObjectKeyValueFactoryWithEnforcement = <M extends Grok.Constraint.ObjectLike>(source: Partial<M>, enforce?: string[], validator?: ValueValidatorFunction<any>) => ObjectKeyValueAccessor<M>;

/**
 * Retrieve values by key from an object with type safety.
 *
 * ```
 * okv(source)(key)
 * okv(source)(key, fallback)
 * ```
 *
 * Firstly, this is a `ObjectKeyValueFactory` so requires the `source` be passed as the only parameter.
 * This will result in a `ObjectKeyValueAccessor` that is composed with the `source` and can be used to access the keys.
 *
 * The `ObjectKeyValueAccessor` itself accepts a `key` as the first parameter which is essentially `source[key]`.
 * This `key` parameter is typed as `keyof source` so type safety is enforced at build time.
 *
 * An optional `fallback` parameter can be supplied that acts as the "default" should the value be `undefined`.
 *
 * A runtime safe version of this (that throws errors) is available as {@link okvr}.
 */
export const okv: ObjectKeyValueFactory = (source) => {
  return (key, fallback) => {
    return (source[key] ?? fallback) as unknown as any;
  }
};

/**
 * Retrieve values by key from an object with type safety and runtime safety.
 *
 * ```
 * okve(source)(key)
 * okve(source)(key, fallback)
 * ```
 *
 * Firstly, this is a `ObjectKeyValueFactoryWithEnforcement` so requires the `source` to be passed as the first parameter.
 * The second parameter can be an optional `string[]` that will target that requirement checks at those keys alone.
 * Otherwise all keys are required and will throw a `ObjectKeyMissingError`.
 * The result is a `ObjectKeyValueAccessor` that is composed with the `source` and can be used to access the keys.
 *
 * When the `enforcement` parameter is a `string[]` is provided the requirement check is done instantly.
 * Otherwise they requirement check is done when the `key` is provided to the accessor.
 */
export const okvr: ObjectKeyValueFactoryWithEnforcement = (source, enforcement, validator) => {
  let globally = false;
  let enforcements: string[] = [];

  if (Array.isArray(enforcement)) {
    enforcements = enforcement;
  } else {
    globally = true;
  }

  if (enforcements.length > 0) {
    const missing: string[] = [];
    const invalid: string[] = [];

    for (const key of enforcements) {
      const value = source[key];

      if (value === undefined) {
        missing.push(key);
      } else if (validator !== undefined && validator(value) === false) {
        invalid.push(key);
      }
    }

    if (missing.length > 0) {
      throw new ObjectKeyMissingError(missing);
    }

    if (invalid.length > 0) {
      throw new KeyValueNotValidError(invalid);
    }
  }

  return (key, fallback) => {
    const value = source[key] ?? fallback;

    if (globally === true && value === undefined) {
      throw new ObjectKeyMissingError(key);
    }

    if (globally === true || enforcements.includes(key) === true) {
      if (validator !== undefined && validator(value) === false) {
        throw new KeyValueNotValidError(key);
      }
    }

    return value as unknown as any;
  }
};

/**
 * Enforce the given value is a key in the type {@link T}.
 * Functionally this passes the given value back but enforces the value the `keyof T` at build time.
 *
 * ```
 * key<SomeMapping>('foo') // 'foo'
 * ```
 *
 * An alternative to this is using the the `<>` cast on a string.
 * This is not available within a JSX/TSX file so thats the reason this helper exists.
 *
 * ```
 * <keyof SomeMapping>'foo'
 * ```
 */
export const okey = <T extends Grok.Constraint.ObjectLike>(key: keyof T): keyof T => key;
