import { jest } from '@jest/globals';
import type { Grok } from './index';

/**
 * A mock of the given function.
 */
export type FunctionMock<T extends Grok.Constraint.FunctionLike> = jest.Mock<ReturnType<T>, Parameters<T>>;

/**
 * Create a function mock.
 *
 * A wrapper around the Jest functional mock that enforces type safety.
 *
 * The value of this is a mock that has all the correct typings from the given {@link T}.
 * This means all mock implementations must be strictly the same types at build time, which generic jest mocks fail.
 */
export const fn = <T extends Grok.Constraint.FunctionLike>(value?: T): FunctionMock<T> => {
  return jest.fn(value) as FunctionMock<T>;
};

/**
 * A mock of the given instance or object.
 */
export type InstanceMock<T> = T & {
  [K in keyof T]: (
    T[K] extends Grok.Constraint.FunctionLike
      ? FunctionMock<T[K]>
      : T[K]
  );
};

/**
 * Returns all keys of the given object that are functions.
 */
export type InstanceMockFunctions<T> = {
  [K in keyof T]-?: (
    T[K] extends undefined
      ? never
      : (
        T[K] extends Grok.Constraint.FunctionLike
          ? K
          : never
      )
  );
}[keyof T];

/**
 * Create an instance mock.
 *
 * A simplistic impleemntation of a mock that satisfies the types but doesn't define the properties.
 * The given keys allow for instances of {@link FunctionMock} to be created as those keys.
 *
 */
export const instance = <T>(keys?: InstanceMockFunctions<T>[]): InstanceMock<T> => {
  const mock = {} as InstanceMock<T>;

  if (keys === undefined) {
    return mock;
  }

  for (const key of keys) {
    mock[key] = fn() as any;
  }

  return mock;
};
