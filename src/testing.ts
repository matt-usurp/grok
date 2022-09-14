import { MockedFunction as ViteMockFunction } from 'vitest';
import type { Grok } from './index';

/**
 * A mock of the given function.
 */
export type FunctionMock<T extends Grok.Constraint.FunctionLike> = ViteMockFunction<T>;

/**
 * Create a function mock using `vi.fn` from given type {@link T}.
 *
 * The value of this is a mock that has all the correct typings from the given {@link T}.
 * This means all mock implementations must be strictly the same types at build time, which generic jest mocks fail.
 */
export const fn = <T extends Grok.Constraint.FunctionLike>(value?: T): FunctionMock<T> => {
  return vitest.fn(value!) as FunctionMock<T>;
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
 * A simplistic implemntation of a mock that satisfies the types but doesn't define the properties.
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

/**
 * A partial object that is disguised to be the full object.
 *
 * This function is intended for testing and will cause errors within production code.
 */
export const partial = <T>(value: Partial<T>): T => {
  return value as T;
}
