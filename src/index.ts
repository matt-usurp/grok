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
     * A syntax shortcut for {@link Grok.If} where {@link Value} is passed through {@link Grok.Value.IsAny}.
     */
    export type IsAny<Value, Then, Else> = (
      Grok.If<Grok.Value.IsAny<Value>, Then, Else>
    );

    /**
     * A syntax shortcut for {@link Grok.If} where {@link Value} is passed through {@link Grok.Value.IsNever}.
     */
    export type IsNever<Value, Then, Else> = (
      Grok.If<Grok.Value.IsNever<Value>, Then, Else>
    );

    /**
     * A syntax shortcut for {@link Grok.If} where {@link Value} is passed through {@link Grok.Value.IsUnknown}.
     */
    export type IsUnknown<Value, Then, Else> = (
      Grok.If<Grok.Value.IsUnknown<Value>, Then, Else>
    );

    /**
     * A syntax shortcut for {@link Grok.If} where {@link Value} is passed through {@link Grok.Value.IsUndefined}.
     */
    export type IsUndefined<Value, Then, Else> = (
      Grok.If<Grok.Value.IsUndefined<Value>, Then, Else>
    );

    /**
     * A syntax shortcut for {@link Grok.If} where {@link Value} is passed through {@link Grok.Value.IsBoolean}.
     */
    export type IsBoolean<Value, Then, Else> = (
      Grok.If<Grok.Value.IsBoolean<Value>, Then, Else>
    );

    /**
     * A syntax shortcut for {@link Grok.If} where {@link Value} is passed through {@link Grok.Value.IsTrue}.
     */
    export type IsTrue<Value, Then, Else> = (
      Grok.If<Grok.Value.IsTrue<Value>, Then, Else>
    );

    /**
     * A syntax shortcut for {@link Grok.If} where {@link Value} is passed through {@link Grok.Value.IsFalse}.
     */
    export type IsFalse<Value, Then, Else> = (
      Grok.If<Grok.Value.IsFalse<Value>, Then, Else>
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
  export type Has<Needle, Haystack extends Grok.Constraint.ArrayWithOneOrMore<any>> = (
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
     *
     * @deprecated
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
   * A safe merge (`&`) operation between {@link A} and {@link B} that will ignore the `any` type.
   *
   * Should either {@link A} or {@link B} be any then the other value is returned on its own.
   * Should {@link A} and {@link B} be `any` then `never` is returned.
   */
  export type Merge<A, B> = (
    Grok.If<
      Grok.And<[
        Grok.Value.IsAny<A>,
        Grok.Value.IsAny<B>,
      ]>,
      never,
      Grok.If<
        Grok.Or<[
          Grok.Value.IsAny<A>,
          Grok.Value.IsAny<B>,
        ]>,
        Grok.If.IsAny<A, B, A>,
        A & B
      >
    >
  );

  /**
   * A safe union (`|`) operation between {@link A} and {@link B} that will ignore the `any` type.
   *
   * Should either {@link A} or {@link B} be any then the other value is returned on its own.
   * Should {@link A} and {@link B} be `any` then `never` is returned.
   */
  export type Union<A, B> = (
    Grok.If<
      Grok.And<[
        Grok.Value.IsAny<A>,
        Grok.Value.IsAny<B>,
      ]>,
      never,
      Grok.If<
        Grok.Or<[
          Grok.Value.IsAny<A>,
          Grok.Value.IsAny<B>,
        ]>,
        Grok.If.IsAny<A, B, A>,
        A | B
      >
    >
  );

  export namespace Union {
    /**
     * Convert the given {@link T} (`any[]`) to a union of its values.
     */
    export type FromArray<T extends any[]> = T[number];

    /**
     * Check the {@link Union} contains the {@link Value}.
     */
    export type Has<Union, Value> = (
      Value extends Union
        ? true
        : false
    )

    /**
     * Remove the {@link Value} from the {@link Union}.
     */
    export type RemoveValue<Union, Value> = (
      Union extends Value
        ? never
        : Union
    );
  }

  /**
   * A series of types for `Record<X, Y>` types.
   */
  export namespace Record {
    /**
     * Remove the type {@link V} from the record type {@link T}.
     */
    export type RemoveValue<T, V> = {
      [K in keyof T]: Grok.Union.RemoveValue<T[K], V>;
    };

    export type IsKeyOptional<Value, Key extends keyof Value> = (
      Grok.If.IsUndefined<
        Value[Key],
        Grok.Not<
          Grok.Value.IsExactly<
            // Removed undefined from all values and picked the keys value.
            // In theory, if this is `?` then undefined should still be here.
            Grok.Record.RemoveValue<Value, undefined>[Key],
            // When compared to the keys value without undefined.
            // There should not be a match, meaning the key is flagged with optional (`?`).
            Grok.Union.RemoveValue<Value[Key], undefined>
          >
        >,
        false
      >
    );
  }

  /**
   * Value validators and check helpers.
   */
  export namespace Value {
    /**
     * Check that {@link A} extends {@link B}.
     */
    export type IsExtending<A, B> = (
      Grok.Core.DetectLogicalFlaw<
        A extends B
          ? true
          : false,
        false
      >
    );

    /**
     * Check that {@link A} and {@link B} are the exact same.
     */
    export type IsExactly<A, B> = (
      Grok.And<[
        Grok.Value.IsExtending<A, B>,
        Grok.Value.IsExtending<B, A>,
      ]>
    );

    /**
     * Check that {@link Value} is the `any` type.
     *
     * Done by abusing an assertion that will fail unless merged with something that expands it.
     * When the {@link Value} given is `any` then check will pass meaning `any` was most likely used.
     */
    export type IsAny<Value> = (
      0 extends (1 & Value)
        ? true
        : false
    );

    /**
     * Check that {@link Value} is the `never` type.
     *
     * Done by abusing tuples and their values that can not be `never`, therefore the value is ignored.
     * When the value is `never` the tuple lengths will be different and therefore not match.
     */
    export type IsNever<Value> = (
      [Value] extends [never]
        ? true
        : false
    );

    /**
     * Check that {@link Value} is the `unknown` type.
     *
     * Done by testing that multiple super types extend it, which is the point of unknown.
     * To be sure its `unknown` we also test that it is not the `any` and `never` types.
     */
    export type IsUnknown<Value> = (
      Grok.And<[
        Grok.Not<Grok.Value.IsAny<Value>>,
        Grok.Not<Grok.Value.IsNever<Value>>,
        boolean extends Value ? true : false,
        number extends Value ? true : false,
        string extends Value ? true : false,
      ]>
    );

    /**
     * Check that {@link Value} is `undefined`.
     */
    export type IsUndefined<Value> = (
      Grok.And<[
        Grok.Not<Grok.Value.IsAny<Value>>,
        Grok.Not<Grok.Value.IsNever<Value>>,
        Grok.Not<Grok.Value.IsUnknown<Value>>,
        Grok.Union.Has<Value, undefined>
      ]>
    );

    /**
     * Check the {@link Value} is the `boolean` type.
     *
     * This will return `false` for both `true` and `false`, this needs to be the union of both.
     */
    export type IsBoolean<Value> = (
      boolean extends Value
        ? (
          Grok.And<[
            Grok.Not<Grok.Value.IsAny<Value>>,
            Grok.Not<Grok.Value.IsNever<Value>>
          ]>
        )
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
   * Core types are used within {@link Grok} to help ensure safe logic or easier syntax.
   */
  export namespace Core {
    /**
     * Detect a logical flaw in {@link Value} and return {@link Fallback}, otherwise return the {@link Value}.
     *
     * A logical flaw is essentially the pure `boolean` type, this indicates an `extends` statement has resolved both its branches.
     * This can be triggered for example with `boolean extends true` which will resolve to both `true` and `false` branches.
     * Within the logical checks we only use booleans, so this is syntax sugar around a simplistic check.
     */
    export type DetectLogicalFlaw<Value extends boolean, Fallback extends boolean> = (
      Grok.If.IsBoolean<Value, Fallback, Value>
    );

    /**
     * Construct a constraint type from the given {@link Value}.
     */
    export type ConstraintFrom<Value extends Grok.Constraint.ObjectLike> = (
      Record<keyof Value, unknown>
    );
  }

  /**
   * Assertion type that checks that {@link A} is the same as {@link B}.
   *
   * As an assertion type, the return value of this utility should be ignored.
   * Although the return value can be used when hovering to see if the test has "passed" at a glance.
   *
   * These can be used within unit-like test cases for types, the constraints enforce the case is correct at build time.
   */
  export type Assert<A, B extends A> = (
    B extends A
      ? 'assertion:passed'
      : 'assertion:failed'
  );

  export namespace Assert {
    /**
     * Assertion type that checks that {@link Value} is `true`.
     *
     * As an assertion type, the return value of this utility should be ignored.
     */
    export type IsTrue<Value extends true> = Grok.Assert<true, Value>;

    /**
     * Assertion type that checks that {@link Value} is `false`.
     *
     * As an assertion type, the return value of this utility should be ignored.
     */
    export type IsFalse<Value extends false> = Grok.Assert<false, Value>;

    /**
     * Assertion type that checks that {@link Value} is `never`.
     *
     * As an assertion type, the return value of this utility should be ignored.
     */
    export type IsNever<Value extends never> = Grok.Assert<never, Value>;
  }
}
