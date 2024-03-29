import { never } from './core/assert-never';
import { noop } from './core/function';
import { okey, okv, okvr } from './core/object';
import { provide, union } from './core/value';
import type { Grok } from './index';
import * as index from './index';

describe('exports', (): void => {
  // core/assert-never
  it('exports never', () => expect(index.never).toStrictEqual(never));

  // core/function
  it('exports noop', () => expect(index.noop).toStrictEqual(noop));

  // core/object
  it('exports okv', () => expect(index.okv).toStrictEqual(okv));
  it('exports okvr', () => expect(index.okvr).toStrictEqual(okvr));
  it('exports okey', () => expect(index.okey).toStrictEqual(okey));

  // core/value
  it('exports union', () => expect(index.union).toStrictEqual(union));
  it('exports provide', () => expect(index.provide).toStrictEqual(provide));
});

/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * @ignore
 */
export namespace Test_Grok {
  /**
   * {@link Grok.If}
   */
  export namespace Test_If {
    /**
     * {@link Grok.If}
     */
    export namespace Test_If {
      type Case_WithTrue = Grok.Assert.IsTrue<Grok.If<true, true, false>>;

      type Case_WithFalse = Grok.Assert.IsFalse<Grok.If<false, true, false>>;
    }

    /**
     * {@link Grok.If.IsAny}
     */
    export namespace Test_If_IsAny {
      type Case_WithAny = Grok.Assert.IsTrue<Grok.If.IsAny<any, true, false>>;
      type Case_WithNever = Grok.Assert.IsFalse<Grok.If.IsAny<never, true, false>>;
      type Case_WithUnknown = Grok.Assert.IsFalse<Grok.If.IsAny<unknown, true, false>>;
      type Case_WithUndefined = Grok.Assert.IsFalse<Grok.If.IsAny<undefined, true, false>>;
      type Case_WithVoid = Grok.Assert.IsFalse<Grok.If.IsAny<void, true, false>>;

      type Case_WithBoolean = Grok.Assert.IsFalse<Grok.If.IsAny<boolean, true, false>>;
      type Case_WithBooleanTrue = Grok.Assert.IsFalse<Grok.If.IsAny<true, true, false>>;
      type Case_WithBooleanFalse = Grok.Assert.IsFalse<Grok.If.IsAny<false, true, false>>;

      type Case_WithNumber = Grok.Assert.IsFalse<Grok.If.IsAny<number, true, false>>;
      type Case_WithNumberInteger = Grok.Assert.IsFalse<Grok.If.IsAny<123, true, false>>;
      type Case_WithNumberFloat = Grok.Assert.IsFalse<Grok.If.IsAny<1.234, true, false>>;

      type Case_WithString = Grok.Assert.IsFalse<Grok.If.IsAny<string, true, false>>;
      type Case_WithStringLiteral = Grok.Assert.IsFalse<Grok.If.IsAny<'test', true, false>>;
    }

    /**
     * {@link Grok.If.IsNever}
     */
    export namespace Test_If_IsNever {
      type Case_WithAny = Grok.Assert.IsFalse<Grok.If.IsNever<any, true, false>>;
      type Case_WithNever = Grok.Assert.IsTrue<Grok.If.IsNever<never, true, false>>;
      type Case_WithUnknown = Grok.Assert.IsFalse<Grok.If.IsNever<unknown, true, false>>;
      type Case_WithUndefined = Grok.Assert.IsFalse<Grok.If.IsNever<undefined, true, false>>;
      type Case_WithVoid = Grok.Assert.IsFalse<Grok.If.IsNever<void, true, false>>;

      type Case_WithBoolean = Grok.Assert.IsFalse<Grok.If.IsNever<boolean, true, false>>;
      type Case_WithBooleanTrue = Grok.Assert.IsFalse<Grok.If.IsNever<true, true, false>>;
      type Case_WithBooleanFalse = Grok.Assert.IsFalse<Grok.If.IsNever<false, true, false>>;

      type Case_WithNumber = Grok.Assert.IsFalse<Grok.If.IsNever<number, true, false>>;
      type Case_WithNumberInteger = Grok.Assert.IsFalse<Grok.If.IsNever<123, true, false>>;
      type Case_WithNumberFloat = Grok.Assert.IsFalse<Grok.If.IsNever<1.234, true, false>>;

      type Case_WithString = Grok.Assert.IsFalse<Grok.If.IsNever<string, true, false>>;
      type Case_WithStringLiteral = Grok.Assert.IsFalse<Grok.If.IsNever<'test', true, false>>;
    }

    /**
     * {@link Grok.If.IsUnknown}
     */
    export namespace Test_If_IsUnknown {
      type Case_WithAny = Grok.Assert.IsFalse<Grok.If.IsUnknown<any, true, false>>;
      type Case_WithNever = Grok.Assert.IsFalse<Grok.If.IsUnknown<never, true, false>>;
      type Case_WithUnknown = Grok.Assert.IsTrue<Grok.If.IsUnknown<unknown, true, false>>;
      type Case_WithUndefined = Grok.Assert.IsFalse<Grok.If.IsUnknown<undefined, true, false>>;
      type Case_WithVoid = Grok.Assert.IsFalse<Grok.If.IsUnknown<void, true, false>>;

      type Case_WithBoolean = Grok.Assert.IsFalse<Grok.If.IsUnknown<boolean, true, false>>;
      type Case_WithBooleanTrue = Grok.Assert.IsFalse<Grok.If.IsUnknown<true, true, false>>;
      type Case_WithBooleanFalse = Grok.Assert.IsFalse<Grok.If.IsUnknown<false, true, false>>;

      type Case_WithNumber = Grok.Assert.IsFalse<Grok.If.IsUnknown<number, true, false>>;
      type Case_WithNumberInteger = Grok.Assert.IsFalse<Grok.If.IsUnknown<123, true, false>>;
      type Case_WithNumberFloat = Grok.Assert.IsFalse<Grok.If.IsUnknown<1.234, true, false>>;

      type Case_WithString = Grok.Assert.IsFalse<Grok.If.IsUnknown<string, true, false>>;
      type Case_WithStringLiteral = Grok.Assert.IsFalse<Grok.If.IsUnknown<'test', true, false>>;
    }

    /**
     * {@link Grok.If.IsUndefined}
     */
    export namespace Test_If_IsUndefined {
      type Case_WithAny = Grok.Assert.IsFalse<Grok.If.IsUndefined<any, true, false>>;
      type Case_WithNever = Grok.Assert.IsFalse<Grok.If.IsUndefined<never, true, false>>;
      type Case_WithUnknown = Grok.Assert.IsFalse<Grok.If.IsUndefined<unknown, true, false>>;
      type Case_WithUndefined = Grok.Assert.IsTrue<Grok.If.IsUndefined<undefined, true, false>>;
      type Case_WithVoid = Grok.Assert.IsTrue<Grok.If.IsUndefined<void, true, false>>;

      type Case_WithBoolean = Grok.Assert.IsFalse<Grok.If.IsUndefined<boolean, true, false>>;
      type Case_WithBooleanTrue = Grok.Assert.IsFalse<Grok.If.IsUndefined<true, true, false>>;
      type Case_WithBooleanFalse = Grok.Assert.IsFalse<Grok.If.IsUndefined<false, true, false>>;

      type Case_WithNumber = Grok.Assert.IsFalse<Grok.If.IsUndefined<number, true, false>>;
      type Case_WithNumberInteger = Grok.Assert.IsFalse<Grok.If.IsUndefined<123, true, false>>;
      type Case_WithNumberFloat = Grok.Assert.IsFalse<Grok.If.IsUndefined<1.234, true, false>>;

      type Case_WithString = Grok.Assert.IsFalse<Grok.If.IsUndefined<string, true, false>>;
      type Case_WithStringLiteral = Grok.Assert.IsFalse<Grok.If.IsUndefined<'test', true, false>>;
    }

    /**
     * {@link Grok.If.IsBoolean}
     */
    export namespace Test_If_IsBoolean {
      type Case_WithAny = Grok.Assert.IsFalse<Grok.If.IsBoolean<any, true, false>>;
      type Case_WithNever = Grok.Assert.IsFalse<Grok.If.IsBoolean<never, true, false>>;
      type Case_WithUnknown = Grok.Assert.IsTrue<Grok.If.IsBoolean<unknown, true, false>>;
      type Case_WithUndefined = Grok.Assert.IsFalse<Grok.If.IsBoolean<undefined, true, false>>;
      type Case_WithVoid = Grok.Assert.IsFalse<Grok.If.IsBoolean<void, true, false>>;

      type Case_WithBoolean = Grok.Assert.IsTrue<Grok.If.IsBoolean<boolean, true, false>>;
      type Case_WithBooleanTrue = Grok.Assert.IsFalse<Grok.If.IsBoolean<true, true, false>>;
      type Case_WithBooleanFalse = Grok.Assert.IsFalse<Grok.If.IsBoolean<false, true, false>>;

      type Case_WithNumber = Grok.Assert.IsFalse<Grok.If.IsBoolean<number, true, false>>;
      type Case_WithNumberInteger = Grok.Assert.IsFalse<Grok.If.IsBoolean<123, true, false>>;
      type Case_WithNumberFloat = Grok.Assert.IsFalse<Grok.If.IsBoolean<1.234, true, false>>;

      type Case_WithString = Grok.Assert.IsFalse<Grok.If.IsBoolean<string, true, false>>;
      type Case_WithStringLiteral = Grok.Assert.IsFalse<Grok.If.IsBoolean<'test', true, false>>;
    }

    /**
     * {@link Grok.If.IsTrue}
     */
    export namespace Test_If_IsTrue {
      type Case_WithAny = Grok.Assert.IsFalse<Grok.If.IsTrue<any, true, false>>;
      type Case_WithNever = Grok.Assert.IsFalse<Grok.If.IsTrue<never, true, false>>;
      type Case_WithUnknown = Grok.Assert.IsFalse<Grok.If.IsTrue<unknown, true, false>>;
      type Case_WithUndefined = Grok.Assert.IsFalse<Grok.If.IsTrue<undefined, true, false>>;
      type Case_WithVoid = Grok.Assert.IsFalse<Grok.If.IsTrue<void, true, false>>;

      type Case_WithBoolean = Grok.Assert.IsFalse<Grok.If.IsTrue<boolean, true, false>>;
      type Case_WithBooleanTrue = Grok.Assert.IsTrue<Grok.If.IsTrue<true, true, false>>;
      type Case_WithBooleanFalse = Grok.Assert.IsFalse<Grok.If.IsTrue<false, true, false>>;

      type Case_WithNumber = Grok.Assert.IsFalse<Grok.If.IsTrue<number, true, false>>;
      type Case_WithNumberInteger = Grok.Assert.IsFalse<Grok.If.IsTrue<123, true, false>>;
      type Case_WithNumberFloat = Grok.Assert.IsFalse<Grok.If.IsTrue<1.234, true, false>>;

      type Case_WithString = Grok.Assert.IsFalse<Grok.If.IsTrue<string, true, false>>;
      type Case_WithStringLiteral = Grok.Assert.IsFalse<Grok.If.IsTrue<'test', true, false>>;
    }

    /**
     * {@link Grok.If.IsFalse}
     */
    export namespace Test_If_IsFalse {
      type Case_WithAny = Grok.Assert.IsFalse<Grok.If.IsFalse<any, true, false>>;
      type Case_WithNever = Grok.Assert.IsFalse<Grok.If.IsFalse<never, true, false>>;
      type Case_WithUnknown = Grok.Assert.IsFalse<Grok.If.IsFalse<unknown, true, false>>;
      type Case_WithUndefined = Grok.Assert.IsFalse<Grok.If.IsFalse<undefined, true, false>>;
      type Case_WithVoid = Grok.Assert.IsFalse<Grok.If.IsFalse<void, true, false>>;

      type Case_WithBoolean = Grok.Assert.IsFalse<Grok.If.IsFalse<boolean, true, false>>;
      type Case_WithBooleanTrue = Grok.Assert.IsFalse<Grok.If.IsFalse<true, true, false>>;
      type Case_WithBooleanFalse = Grok.Assert.IsTrue<Grok.If.IsFalse<false, true, false>>;

      type Case_WithNumber = Grok.Assert.IsFalse<Grok.If.IsFalse<number, true, false>>;
      type Case_WithNumberInteger = Grok.Assert.IsFalse<Grok.If.IsFalse<123, true, false>>;
      type Case_WithNumberFloat = Grok.Assert.IsFalse<Grok.If.IsFalse<1.234, true, false>>;

      type Case_WithString = Grok.Assert.IsFalse<Grok.If.IsFalse<string, true, false>>;
      type Case_WithStringLiteral = Grok.Assert.IsFalse<Grok.If.IsFalse<'test', true, false>>;
    }
  }

  /**
   * {@link Grok.And}
   */
  export namespace Test_And {
    type Case_WithTrue = Grok.Assert.IsTrue<Grok.And<[true]>>;
    type Case_WithTrueTrue = Grok.Assert.IsTrue<Grok.And<[true, true]>>;
    type Case_WithTrueTrueTrue = Grok.Assert.IsTrue<Grok.And<[true, true, true]>>;

    // @ts-expect-error And<[]> should expect at least one element.
    type Case_WithEmpty = Grok.Assert.IsFalse<Grok.And<[]>>;

    type Case_WithFalse = Grok.Assert.IsFalse<Grok.And<[false]>>;
    type Case_WithTrueFalse = Grok.Assert.IsFalse<Grok.And<[true, false]>>;
    type Case_WithFalseTrue = Grok.Assert.IsFalse<Grok.And<[false, true]>>;
    type Case_WithFalseFalse = Grok.Assert.IsFalse<Grok.And<[false, false]>>;
    type Case_WithFalseFalseTrue = Grok.Assert.IsFalse<Grok.And<[false, false, true]>>;
  }

  /**
   * {@link Grok.Or}
   */
  export namespace Test_Or {
    type Case_WithTrue = Grok.Assert.IsTrue<Grok.Or<[true]>>;
    type Case_WithTrueTrue = Grok.Assert.IsTrue<Grok.Or<[true, true]>>;
    type Case_WithTrueFalse = Grok.Assert.IsTrue<Grok.Or<[true, false]>>;
    type Case_WithFalseTrue = Grok.Assert.IsTrue<Grok.Or<[false, true]>>;
    type Case_WithFalseFalseTrue = Grok.Assert.IsTrue<Grok.Or<[false, false, true]>>;

    type Case_WithFalse = Grok.Assert.IsFalse<Grok.Or<[false]>>;
    type Case_WithFalseFalse = Grok.Assert.IsFalse<Grok.Or<[false, false]>>;
    type Case_WithFalseFalseFalse = Grok.Assert.IsFalse<Grok.Or<[false, false, false]>>;
  }

  /**
   * {@link Grok.Has}
   */
  export namespace Test_Has {
    type Case_WithTrue = Grok.Assert.IsTrue<Grok.Has<true, [true]>>;
    type Case_WithTrueFalse =Grok.Assert.IsTrue<Grok.Has<true, [true, false]>>;
    type Case_WithFalseTrueFalse = Grok.Assert.IsTrue<Grok.Has<true, [false, true, false]>>;

    type Case_WithBoolean = Grok.Assert.IsFalse<Grok.Has<1, [false, true, false]>>;
    type Case_WithOne = Grok.Assert.IsTrue<Grok.Has<1, [1]>>;
    type Case_WithOneTwo = Grok.Assert.IsTrue<Grok.Has<1, [1, 2]>>;
    type Case_WithOneTwoThree = Grok.Assert.IsTrue<Grok.Has<1, [1, 2, 3]>>;
  }

  /**
   * {@link Grok.Merge}
   */
  export namespace Test_Merge {
    type Case_NameAge = Grok.Assert.IsTrue<Grok.Value.IsExactly<Grok.Merge<{ name: string }, { age: number }>, { name: string; age: number }>>;
    type Case_NameAny = Grok.Assert.IsTrue<Grok.Value.IsExactly<Grok.Merge<{ name: string }, any>, { name: string }>>;
    type Case_AnyAge = Grok.Assert.IsTrue<Grok.Value.IsExactly<Grok.Merge<any, { age: number }>, { age: number }>>;
    type Case_AnyAny = Grok.Assert.IsNever<Grok.Merge<any, any>>;

    type Case_WithOverlapIndividual = Grok.Assert.IsNever<Grok.Merge<{ a: 1 }, { a: 2 }>>;
  }

  /**
   * {@link Grok.Union}
   */
  export namespace Test_Union {
    /**
     * {@link Grok.Union}
     */
    export namespace Test_Union {
      type Case_WithOneTwo = Grok.Assert.IsTrue<Grok.Value.IsExactly<Grok.Union<1, 2>, 1 | 2>>;
      type Case_WithOneAny = Grok.Assert.IsTrue<Grok.Value.IsExactly<Grok.Union<1, any>, 1>>;
      type Case_WithAnyTwo = Grok.Assert.IsTrue<Grok.Value.IsExactly<Grok.Union<any, 2>, 2>>;
      type Case_WithAnyAny = Grok.Assert.IsNever<Grok.Union<any, any>>;
    }

    /**
     * {@link Grok.Union.FromArray}
     */
    export namespace Test_Union_FromArray {
      type Case_WithEmpty = Grok.Assert.IsNever<Grok.Union.FromArray<[]>>;

      type Case_WithOne = Grok.Assert<1, Grok.Union.FromArray<[1]>>;
      type Case_WithOneTwo = Grok.Assert<1 | 2, Grok.Union.FromArray<[1, 2]>>;
      type Case_WithOneTwoThree = Grok.Assert<1 | 2 | 3, Grok.Union.FromArray<[1, 2, 3]>>;
    }

    /**
     * {@link Grok.Union.Has}
     */
    export namespace Test_Union_Has {
      type Case_WithoutValue = (
        Grok.Assert.IsFalse<
          Grok.Value.IsTrue<
            Grok.Union.Has<1 | 2, 3>
          >
        >
      );

      type Case_WithValueExact = (
        Grok.Assert.IsTrue<
          Grok.Value.IsTrue<
            Grok.Union.Has<1, 1>
          >
        >
      );

      type Case_WithValue = (
        Grok.Assert.IsTrue<
          Grok.Value.IsTrue<
            Grok.Union.Has<1 | 2, 2>
          >
        >
      );
    }

    /**
     * {@link Grok.Union.FromArray}
     */
    export namespace Test_Union_RemoveValue {
      type Case_WithoutValue = (
        Grok.Assert.IsTrue<
          Grok.Value.IsExactly<
            Grok.Union.RemoveValue<1 | 2, 3>,
            1 | 2
          >
        >
      );

      type Case_WithValue = (
        Grok.Assert.IsTrue<
          Grok.Value.IsExactly<
            Grok.Union.RemoveValue<1 | 2, 2>,
            1
          >
        >
      );
    }
  }

  /**
   * {@link Grok.Record}
   */
  export namespace Test_Record {
    /**
     * {@link Grok.Record.RemoveValue}
     */
    export namespace Test_Record_RemoveValue {
      export type Case_WithoutValue = (
        Grok.Assert.IsTrue<
          Grok.Value.IsExactly<
            Grok.Record.RemoveValue<{ a: 1 }, 2>,
            { a: 1 }
          >
        >
      );

      export type Case_WithValue = (
        Grok.Assert.IsTrue<
          Grok.Value.IsExactly<
            Grok.Record.RemoveValue<{ a: 1 | 2 }, 2>,
            { a: 1 }
          >
        >
      );

      export type Case_WithOptionalFlag_ValueStillHasUndefined = (
        Grok.Assert<
          Grok.Record.RemoveValue<{ a?: 1 }, undefined>['a'],
          undefined
        >
      );
    }

    /**
     * {@link Grok.Record.ReplaceAny}
     */
    export namespace Test_Record_ReplaceAny {
      type Case_WithRecord_HasNoAny = (
        Grok.Assert.IsTrue<
          Grok.Value.IsExactly<
            Grok.Record.ReplaceAny<{ a: 1; b: 2 }, undefined>,
            { a: 1; b: 2 }
          >
        >
      );

      type Case_WithRecord_HasSingleAny = (
        Grok.Assert.IsTrue<
          Grok.Value.IsExactly<
            Grok.Record.ReplaceAny<{ a: any; b: 2 }, undefined>,
            { a: undefined; b: 2 }
          >
        >
      );

      type Case_WithRecord_HasMultipleAny = (
        Grok.Assert.IsTrue<
          Grok.Value.IsExactly<
            Grok.Record.ReplaceAny<{ a: any; b: any; c: 3 }, undefined>,
            { a: undefined; b: undefined; c: 3 }
          >
        >
      );
    }

    /**
     * {@link Grok.Record.IsKeyOptional}
     */
    export namespace Test_Record_IsKeyOptional {
      type Case_WithRecord_HasNoOptionalFlag_ReturnFalse = (
        Grok.Assert.IsFalse<
          Grok.Record.IsKeyOptional<
            { a: true },
            'a'
          >
        >
      );

      type Case_WithRecord_HasNoOptionalFlag_KeyValueHasUndefined_ReturnFalse = (
        Grok.Assert.IsFalse<
          Grok.Record.IsKeyOptional<
            { a: true | undefined },
            'a'
          >
        >
      );

      type Case_WithRecord_HasOptionalFlag_ReturnTrue = (
        Grok.Assert.IsTrue<
          Grok.Record.IsKeyOptional<
            { a?: true },
            'a'
          >
        >
      );

      type Case_WithRecord_HasOptionalFlag_KeyValueHasUndefined_ReturnTrue = (
        Grok.Assert.IsTrue<
          Grok.Record.IsKeyOptional<
            { a?: true | undefined },
            'a'
          >
        >
      );

      type Case_WithRecord_HasNoOptionalFlag_KeyValueHasAny_ReturnTrue = (
        Grok.Assert.IsFalse<
          Grok.Record.IsKeyOptional<
            { a: any },
            'a'
          >
        >
      );

      type Case_WithRecord_HasOptionalFlag_KeyValueHasAny_ReturnTrue = (
        Grok.Assert.IsTrue<
          Grok.Record.IsKeyOptional<
            { a?: any },
            'a'
          >
        >
      );
    }
  }

  /**
   * {@link Grok.Constraint}
   */
  export namespace Test_Constraint {
    /**
     * {@link Grok.Constraint.ArrayWithOneOrMore}
     */
    export namespace Test_Constraint_ArrayWithOneOrMore {
      type Case_WithEmpty = Grok.Assert.IsFalse<Grok.Value.IsExtending<[], Grok.Constraint.ArrayWithOneOrMore<number>>>;
      type Case_WithOne = Grok.Assert.IsTrue<Grok.Value.IsExtending<[1], Grok.Constraint.ArrayWithOneOrMore<number>>>;
      type Case_WithOneTwo = Grok.Assert.IsTrue<Grok.Value.IsExtending<[1, 2], Grok.Constraint.ArrayWithOneOrMore<number>>>;
      type Case_WithOneTwoThree = Grok.Assert.IsTrue<Grok.Value.IsExtending<[1, 2, 3], Grok.Constraint.ArrayWithOneOrMore<number>>>;
    }
  }

  /**
   * {@link Grok.Value}
   */
  export namespace Test_Value {
    /**
     * {@link Grok.Value.IsExtending}
     */
    export namespace Test_Value_IsExtending {
      type Case_WithOneOne = Grok.Assert.IsTrue<Grok.Value.IsExtending<1, 1>>;
      type Case_WithOneTwo = Grok.Assert.IsFalse<Grok.Value.IsExtending<1, 2>>;
      type Case_WithTwoOne = Grok.Assert.IsFalse<Grok.Value.IsExtending<2, 1>>;

      type Case_WithTrueBoolean = Grok.Assert.IsTrue<Grok.Value.IsExtending<true, boolean>>;
      type Case_WithFalseBoolean = Grok.Assert.IsTrue<Grok.Value.IsExtending<false, boolean>>;
      type Case_WithBooleanBoolean = Grok.Assert.IsTrue<Grok.Value.IsExtending<boolean, boolean>>;

      type Case_WithBooleanTrue = Grok.Assert.IsFalse<Grok.Value.IsExtending<boolean, true>>;
      type Case_WithBooleanFalse = Grok.Assert.IsFalse<Grok.Value.IsExtending<boolean, false>>;
    }

    /**
     * {@link Grok.Value.IsExactly}
     */
    export namespace Test_Value_IsExactly {
      type Case_WithOneOne = Grok.Assert.IsTrue<Grok.Value.IsExactly<1, 1>>;
      type Case_WithOneTwo = Grok.Assert.IsFalse<Grok.Value.IsExactly<1, 2>>;
      type Case_WithTwoOne = Grok.Assert.IsFalse<Grok.Value.IsExactly<2, 1>>;

      type Case_WithTrueTrue = Grok.Assert.IsTrue<Grok.Value.IsExactly<true, true>>;
      type Case_WithTrueFalse = Grok.Assert.IsFalse<Grok.Value.IsExactly<true, false>>;
      type Case_WithFalseTrue = Grok.Assert.IsFalse<Grok.Value.IsExactly<false, true>>;
      type Case_WithBooleanBoolean = Grok.Assert.IsTrue<Grok.Value.IsExactly<boolean, boolean>>;
      type Case_WithBooleanTrue = Grok.Assert.IsFalse<Grok.Value.IsExactly<boolean, true>>;
      type Case_WithBooleanFalse = Grok.Assert.IsFalse<Grok.Value.IsExactly<boolean, false>>;
      type Case_WithTrueBoolean = Grok.Assert.IsFalse<Grok.Value.IsExactly<true, boolean>>;
      type Case_WithFalseBoolean = Grok.Assert.IsFalse<Grok.Value.IsExactly<false, boolean>>;
    }

    /**
     * {@link Grok.Value.IsAny}
     */
    export namespace Test_Value_IsAny {
      type Case_WithAny = Grok.Assert.IsTrue<Grok.Value.IsAny<any>>;
      type Case_WithNever = Grok.Assert.IsFalse<Grok.Value.IsAny<never>>;
      type Case_WithUnknown = Grok.Assert.IsFalse<Grok.Value.IsAny<unknown>>;
      type Case_WithUndefined = Grok.Assert.IsFalse<Grok.Value.IsAny<undefined>>;
      type Case_WithVoid = Grok.Assert.IsFalse<Grok.Value.IsAny<void>>;

      type Case_WithBoolean = Grok.Assert.IsFalse<Grok.Value.IsAny<boolean>>;
      type Case_WithBooleanTrue = Grok.Assert.IsFalse<Grok.Value.IsAny<true>>;
      type Case_WithBooleanFalse = Grok.Assert.IsFalse<Grok.Value.IsAny<false>>;

      type Case_WithNumber = Grok.Assert.IsFalse<Grok.Value.IsAny<number>>;
      type Case_WithNumberInteger = Grok.Assert.IsFalse<Grok.Value.IsAny<123>>;
      type Case_WithNumberFloat = Grok.Assert.IsFalse<Grok.Value.IsAny<1.234>>;

      type Case_WithString = Grok.Assert.IsFalse<Grok.Value.IsAny<string>>;
      type Case_WithStringLiteral = Grok.Assert.IsFalse<Grok.Value.IsAny<'test'>>;
    }

    /**
     * {@link Grok.Value.IsNever}
     */
    export namespace Test_Value_IsNever {
      type Case_WithAny = Grok.Assert.IsFalse<Grok.Value.IsNever<any>>;
      type Case_WithNever = Grok.Assert.IsTrue<Grok.Value.IsNever<never>>;
      type Case_WithUnknown = Grok.Assert.IsFalse<Grok.Value.IsNever<unknown>>;
      type Case_WithUndefined = Grok.Assert.IsFalse<Grok.Value.IsNever<undefined>>;
      type Case_WithVoid = Grok.Assert.IsFalse<Grok.Value.IsNever<void>>;

      type Case_WithBoolean = Grok.Assert.IsFalse<Grok.Value.IsNever<boolean>>;
      type Case_WithBooleanTrue = Grok.Assert.IsFalse<Grok.Value.IsNever<true>>;
      type Case_WithBooleanFalse = Grok.Assert.IsFalse<Grok.Value.IsNever<false>>;

      type Case_WithNumber = Grok.Assert.IsFalse<Grok.Value.IsNever<number>>;
      type Case_WithNumberInteger = Grok.Assert.IsFalse<Grok.Value.IsNever<123>>;
      type Case_WithNumberFloat = Grok.Assert.IsFalse<Grok.Value.IsNever<1.234>>;

      type Case_WithString = Grok.Assert.IsFalse<Grok.Value.IsNever<string>>;
      type Case_WithStringLiteral = Grok.Assert.IsFalse<Grok.Value.IsNever<'test'>>;
    }

    /**
     * {@link Grok.Value.IsUnknown}
     */
    export namespace Test_Value_IsUnknown {
      type Case_WithAny = Grok.Assert.IsFalse<Grok.Value.IsUnknown<any>>;
      type Case_WithNever = Grok.Assert.IsFalse<Grok.Value.IsUnknown<never>>;
      type Case_WithUnknown = Grok.Assert.IsTrue<Grok.Value.IsUnknown<unknown>>;
      type Case_WithUndefined = Grok.Assert.IsFalse<Grok.Value.IsUnknown<undefined>>;
      type Case_WithVoid = Grok.Assert.IsFalse<Grok.Value.IsUnknown<void>>;

      type Case_WithBoolean = Grok.Assert.IsFalse<Grok.Value.IsUnknown<boolean>>;
      type Case_WithBooleanTrue = Grok.Assert.IsFalse<Grok.Value.IsUnknown<true>>;
      type Case_WithBooleanFalse = Grok.Assert.IsFalse<Grok.Value.IsUnknown<false>>;

      type Case_WithNumber = Grok.Assert.IsFalse<Grok.Value.IsUnknown<number>>;
      type Case_WithNumberInteger = Grok.Assert.IsFalse<Grok.Value.IsUnknown<123>>;
      type Case_WithNumberFloat = Grok.Assert.IsFalse<Grok.Value.IsUnknown<1.234>>;

      type Case_WithString = Grok.Assert.IsFalse<Grok.Value.IsUnknown<string>>;
      type Case_WithStringLiteral = Grok.Assert.IsFalse<Grok.Value.IsUnknown<'test'>>;
    }

    /**
     * {@link Grok.Value.IsUndefined}
     */
    export namespace Test_Value_IsUndefined {
      type Case_WithAny = Grok.Assert.IsFalse<Grok.Value.IsUndefined<any>>;
      type Case_WithNever = Grok.Assert.IsFalse<Grok.Value.IsUndefined<never>>;
      type Case_WithUnknown = Grok.Assert.IsFalse<Grok.Value.IsUndefined<unknown>>;
      type Case_WithUndefined = Grok.Assert.IsTrue<Grok.Value.IsUndefined<undefined>>;
      type Case_WithVoid = Grok.Assert.IsTrue<Grok.Value.IsUndefined<void>>;

      type Case_WithBoolean = Grok.Assert.IsFalse<Grok.Value.IsUndefined<boolean>>;
      type Case_WithBooleanTrue = Grok.Assert.IsFalse<Grok.Value.IsUndefined<true>>;
      type Case_WithBooleanFalse = Grok.Assert.IsFalse<Grok.Value.IsUndefined<false>>;

      type Case_WithNumber = Grok.Assert.IsFalse<Grok.Value.IsUndefined<number>>;
      type Case_WithNumberInteger = Grok.Assert.IsFalse<Grok.Value.IsUndefined<123>>;
      type Case_WithNumberFloat = Grok.Assert.IsFalse<Grok.Value.IsUndefined<1.234>>;

      type Case_WithString = Grok.Assert.IsFalse<Grok.Value.IsUndefined<string>>;
      type Case_WithStringLiteral = Grok.Assert.IsFalse<Grok.Value.IsUndefined<'test'>>;

      type Case_WithUnion = Grok.Assert.IsTrue<Grok.Value.IsUndefined<1 | undefined>>;
    }

    /**
     * {@link Grok.Value.IsBoolean}
     */
    export namespace Test_Value_IsBoolean {
      type Case_WithAny = Grok.Assert.IsFalse<Grok.Value.IsBoolean<any>>;
      type Case_WithNever = Grok.Assert.IsFalse<Grok.Value.IsBoolean<never>>;
      type Case_WithUnknown = Grok.Assert.IsTrue<Grok.Value.IsBoolean<unknown>>;
      type Case_WithUndefined = Grok.Assert.IsFalse<Grok.Value.IsBoolean<undefined>>;
      type Case_WithVoid = Grok.Assert.IsFalse<Grok.Value.IsBoolean<void>>;

      type Case_WithBoolean = Grok.Assert.IsTrue<Grok.Value.IsBoolean<boolean>>;
      type Case_WithBooleanTrue = Grok.Assert.IsFalse<Grok.Value.IsBoolean<true>>;
      type Case_WithBooleanFalse = Grok.Assert.IsFalse<Grok.Value.IsBoolean<false>>;

      type Case_WithNumber = Grok.Assert.IsFalse<Grok.Value.IsBoolean<number>>;
      type Case_WithNumberInteger = Grok.Assert.IsFalse<Grok.Value.IsBoolean<123>>;
      type Case_WithNumberFloat = Grok.Assert.IsFalse<Grok.Value.IsBoolean<1.234>>;

      type Case_WithString = Grok.Assert.IsFalse<Grok.Value.IsBoolean<string>>;
      type Case_WithStringLiteral = Grok.Assert.IsFalse<Grok.Value.IsBoolean<'test'>>;
    }

    /**
     * {@link Grok.Value.IsTrue}
     */
    export namespace Test_Value_IsTrue {
      type Case_WithAny = Grok.Assert.IsFalse<Grok.Value.IsTrue<any>>;
      type Case_WithNever = Grok.Assert.IsFalse<Grok.Value.IsTrue<never>>;
      type Case_WithUnknown = Grok.Assert.IsFalse<Grok.Value.IsTrue<unknown>>;
      type Case_WithUndefined = Grok.Assert.IsFalse<Grok.Value.IsTrue<undefined>>;
      type Case_WithVoid = Grok.Assert.IsFalse<Grok.Value.IsTrue<void>>;

      type Case_WithBoolean = Grok.Assert.IsFalse<Grok.Value.IsTrue<boolean>>;
      type Case_WithBooleanTrue = Grok.Assert.IsTrue<Grok.Value.IsTrue<true>>;
      type Case_WithBooleanFalse = Grok.Assert.IsFalse<Grok.Value.IsTrue<false>>;

      type Case_WithNumber = Grok.Assert.IsFalse<Grok.Value.IsTrue<number>>;
      type Case_WithNumberInteger = Grok.Assert.IsFalse<Grok.Value.IsTrue<123>>;
      type Case_WithNumberFloat = Grok.Assert.IsFalse<Grok.Value.IsTrue<1.234>>;

      type Case_WithString = Grok.Assert.IsFalse<Grok.Value.IsTrue<string>>;
      type Case_WithStringLiteral = Grok.Assert.IsFalse<Grok.Value.IsTrue<'test'>>;
    }

    /**
     * {@link Grok.Value.IsFalse}
     */
    export namespace Test_Value_IsFalse {
      type Case_WithAny = Grok.Assert.IsFalse<Grok.Value.IsFalse<any>>;
      type Case_WithNever = Grok.Assert.IsFalse<Grok.Value.IsFalse<never>>;
      type Case_WithUnknown = Grok.Assert.IsFalse<Grok.Value.IsFalse<unknown>>;
      type Case_WithUndefined = Grok.Assert.IsFalse<Grok.Value.IsFalse<undefined>>;
      type Case_WithVoid = Grok.Assert.IsFalse<Grok.Value.IsFalse<void>>;

      type Case_WithBoolean = Grok.Assert.IsFalse<Grok.Value.IsFalse<boolean>>;
      type Case_WithBooleanTrue = Grok.Assert.IsFalse<Grok.Value.IsFalse<true>>;
      type Case_WithBooleanFalse = Grok.Assert.IsTrue<Grok.Value.IsFalse<false>>;

      type Case_WithNumber = Grok.Assert.IsFalse<Grok.Value.IsFalse<number>>;
      type Case_WithNumberInteger = Grok.Assert.IsFalse<Grok.Value.IsFalse<123>>;
      type Case_WithNumberFloat = Grok.Assert.IsFalse<Grok.Value.IsFalse<1.234>>;

      type Case_WithString = Grok.Assert.IsFalse<Grok.Value.IsFalse<string>>;
      type Case_WithStringLiteral = Grok.Assert.IsFalse<Grok.Value.IsFalse<'test'>>;
    }
  }

  /**
   * {@link Grok.Core}
   */
  export namespace Test_Core {
    /**
     * {@link Grok.Core.ConstraintFrom}
     */
    export namespace Test_Core_ConstraintFrom {
      type Case_WithEmpty = Grok.Assert.IsTrue<Grok.Value.IsExactly<Grok.Core.ConstraintFrom<{}>, {}>>;
      type Case_WithSingleProperty = Grok.Assert.IsTrue<Grok.Value.IsExactly<Grok.Core.ConstraintFrom<{ a: number }>, { a: unknown }>>;
      type Case_WithManyProperty = Grok.Assert.IsTrue<Grok.Value.IsExactly<Grok.Core.ConstraintFrom<{ a: number; b: string; c: unknown }>, { a: unknown; b: unknown; c: unknown }>>;
    }
  }
}
