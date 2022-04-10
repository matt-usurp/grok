import type { ValueValidatorFunction } from '../core/value';

export type EnvironmentValue = string | undefined;
export type EnvironmentMapping = Record<string, EnvironmentValue>;

/**
 * Attempt to cleanse an environment variable string.
 */
export const cleanse = (value: string): string => {
  return value.trim();
}

/**
 * Attempt to normalise a value that was retrieved from environment variables.
 * These values can be in a series of states that might indicate undefined, this attempts to resolve that.
 */
export const normalise = (value: EnvironmentValue): EnvironmentValue => {
  if (value === undefined) {
    return undefined;
  }

  const cleansed = cleanse(value);

  if (cleansed === '') {
    return undefined;
  }

  return cleansed;
};

/**
 * A value validator to ensure environment variables are actually defined.
 */
export const ensure: ValueValidatorFunction<string | undefined> = (value) => {
  return normalise(value) !== undefined;
};
