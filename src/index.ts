export { never } from './core/assert-never';
export { noop } from './core/function';
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

  // --
  // -- Logic & Control Flow
  // --

  /**
   * A logical `IF` that selects from the given values depending on the condition.
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

  /**
   * A logical `AND` gate that returns true when both given values are true.
   */
  export type And<A extends boolean, B extends boolean> = (
    A extends true
      ? (
        B extends true
          ? true
          : false
      )
      : false
  );

  /**
   * A logical `OR` gate that returns true if any of the values are true.
   */
   export type Or<A extends boolean, B extends boolean> = (
    A extends true
      ? true
      : (
        B extends true
          ? true
          : false
      )
  );

  /**
   * A logical `NOT` gate that returns true when given false, and false when given true.
   */
  export type Not<Input extends boolean> = (
    Input extends true
      ? false
      : true
  );

  // --
  // -- Logic & Control Flow
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
  )

  export namespace Value {
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
     * A value check against boolean `true`.
     */
    export type IsTrue<V> = (
      V extends true
        ? true
        : false
    );

    /**
     * A value check against boolean `false`.
     */
    export type IsFalse<V> = (
      V extends false
        ? true
        : false
    );
  }
}
