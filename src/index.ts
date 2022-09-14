import * as inherit from './core/inherit';
export { never } from './core/assert-never';
export { noop } from './core/function';
export { inherit } from './core/inherit';
export { okey, okv, okvr } from './core/object';
export { provide, union } from './core/value';

/**
 * A utility to add `undefined` as a possible value to {@link T}.
 */
export type Maybe<T> = T | undefined;

/**
 * A utility to add `null` as a possible value to {@link T}.
 */
export type Nullable<T> = T | null;

/**
 * A utility to remove `readonly` modifiers from the given {@link T}.
 */
export type Mutable<T extends Grok.Constraint.ObjectLike> = {
  -readonly [P in keyof T]: T[P];
}

/**
 * A function that when called returns the type {@link T}.
 */
export type Provider<T> = () => T;

/**
 * Grok is an expressive series of type helpers and utilities.
 */
export namespace Grok {
  /**
   * A value type for a symbol that represents a unique action.
   *
   * For more information see {@link inherit.InheritActionType InheritActionType}.
   */
  export import Inherit = inherit.InheritActionType;

  // --
  // -- Logic & Control Flow
  // --

  /**
   * A logical `if-statement` that returns {@link Then} when {@link Condition} is true and {@link Else} when {@link Condition} is false.
   *
   * @type {Condition} The boolean expression that determines the returned value.
   * @type {Then} The value returned when the expression resolves to true.
   * @type {Else} The value returned when the expression resolves to false.
   */
  export type If<Condition extends boolean, Then, Else> = (
    Condition extends true
      ? Then
      : Else
  );

  export namespace If {
    /**
     * A local `if-statement` that returns {@link Then} when {@link Value} is `any` and {@link Else} when it is not.
     *
     * A syntax shortcut for {@link Grok.If} and {@link Grok.Value.IsAny}.
     */
    export type IsAny<Value, Then, Else> = (
      Grok.If<
        Grok.Value.IsAny<Value>,
        Then,
        Else
      >
    );
  }

  /**
   * A logical `AND` gate that returns `true` when all values of {@link Arguments} are `true`.
   */
  export type And<Arguments extends Grok.Constraint.ArrayWithOneOrMore<boolean>> = (
    Arguments extends true[]
      ? true
      : false
  );

  /**
   * A logical `OR` gate that returns `true` when any value of {@link Arguments} is `true`.
   */
   export type Or<Arguments extends Grok.Constraint.ArrayWithOneOrMore<boolean>> = (
    Grok.Has<true, Arguments>
  );

  /**
   * A logical `NOT` gate that negates the {@link Value}.
   */
  export type Not<Value extends boolean> = (
    Value extends true
      ? false
      : true
  );

  /**
   * A value check that looks for {@link Needle} in {@link Haystack}.
   */
  export type Has<Needle, Haystack extends Grok.Constraint.ArrayWithOneOrMore<Grok.Constraint.Anything>> = (
    Needle extends Grok.Union.FromArray<Haystack>
      ? true
      : false
  );

  // --
  // -- Value Constraints
  // --

  export namespace Constraint {
    /**
     * A constraint type that conforms to anything.
     */
    export type Anything = any;

    /**
     * A constraint type that conforms to any object like type or value.
     */
    export type ObjectLike = Record<string, unknown>;

    /**
     * A constraint type that conforms to any function like type or value.
     */
    export type FunctionLike = (...args: any) => any;

    /**
     * A constraint type that requires the value be an array with one (or more) {@link T}
     */
    export type ArrayWithOneOrMore<T> = [T, ...T[]];
  }

  // --
  // -- Values & Operations
  // --

  /**
   * A safe merge (`&`) operation that will ignore TypeScript `any`.
   */
  export type Merge<UnknownValue, KnownValue> = (
    Grok.If<
      Grok.Value.IsAny<UnknownValue>,
      KnownValue,
      KnownValue & UnknownValue
    >
  );

  /**
   * A safe union (`|`) operation that will ignore TypeScript `any`.
   */
  export type Union<UnknownValue, KnownValue> = (
    Grok.If<
      Grok.Value.IsAny<UnknownValue>,
      KnownValue,
      KnownValue | UnknownValue
    >
  );

  export namespace Union {
    /**
     * Convert the given `any[]` {@link T} to a union of its values.
     */
    export type FromArray<T extends Grok.Constraint.Anything[]> = T[number];
  }

  /**
   * Value validators and check helpers.
   */
  export namespace Value {
    /**
     * A value check to validate {@link T} is the {@link Grok.Inherit} type.
     */
    export type IsInherit<T> = (
      Grok.If.IsAny<T, false, Grok.Value.IsExactly<T, Grok.Inherit>>
    );

    /**
     * A value check to validate that `A` extends `B`.
     */
    export type IsExtending<A, B> = (
      A extends B
        ? true
        : false
    );

    /**
     * A value check to validate that `A` and `B` are the exact same.
     */
    export type IsExactly<A, B> = (
      A extends B
        ? (
          B extends A
            ? true
            : false
        )
        : false
    );

    /**
     * A value check against the TypeScript `any` type.
     * Done by abusing an assertion that will fail unless merged with something that expands it.
     * When the value given is `any` then check will pass meaning `any` was most likely used.
     */
    export type IsAny<V> = (
      0 extends (1 & V)
        ? true
        : false
    );

    /**
     * A value check against the TypeScript `never` type.
     * Done by abusing tuples and their values that can not be `never`, therefore the value is ignored.
     * When the value is `never` the tuple lengths will be different and therefore not match.
     */
    export type IsNever<V> = (
      [V] extends [never]
        ? true
        : false
    );

    /**
     * Check the {@link Value} is the `boolean` type.
     *
     * This will return `false` for both `true` and `false`, this needs to be the union of both.
     *
     * Helpful for testing if an `extends` statement is truthy in both directions.
     * For example, `boolean extends true ? true : false` will resolve to `true` and `false`.
     */
    export type IsBoolean<Value> = (
      boolean extends Value
        ? true
        : false
    );

    /**
     * Check the {@link Value} is the boolean `true`.
     */
    export type IsTrue<Value> = (
      Grok.And<[
        Grok.Not<Grok.Value.IsAny<Value>>,
        Grok.Not<Grok.Value.IsNever<Value>>,
        Grok.Value.IsExactly<Value, true>,
      ]>
    );

    /**
     * Check the {@link Value} is the boolean `false`.
     */
    export type IsFalse<Value> = (
      Grok.And<[
        Grok.Not<Grok.Value.IsAny<Value>>,
        Grok.Not<Grok.Value.IsNever<Value>>,
        Grok.Value.IsExactly<Value, false>,
      ]>
    );
  }

  /**
   * Type testing assertions and utility types.
   *
   * These can be used within unit-like test cases for types, the constraints enforce the case is correct at build time.
   */
  export namespace Testing {
    /**
     * Assertion type that checks that {@link A} is the same as {@link B}.
     *
     * As an assertion type, the return value of this utility should be ignored.
     */
    export type Assert<A, B extends A> = B;

    /**
     * Assertion type that checks that {@link T} is `true`.
     *
     * As an assertion type, the return value of this utility should be ignored.
     */
    export type AssertTrue<T extends true> = T;

    /**
     * Assertion type that checks that {@link T} is `false`.
     *
     * As an assertion type, the return value of this utility should be ignored.
     */
    export type AssertFalse<T extends false> = T;

    /**
     * Assertion type that checks that {@link T} is `never`.
     *
     * As an assertion type, the return value of this utility should be ignored.
     */
    export type AssertNever<T extends never> = T;
  }
}
