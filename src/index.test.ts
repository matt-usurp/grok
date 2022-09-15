import { never } from './core/assert-never';
import { noop } from './core/function';
import { inherit } from './core/inherit';
import { okey, okv, okvr } from './core/object';
import { provide, union } from './core/value';
import type { Grok } from './index';
import * as index from './index';

describe('exports', (): void => {
  // core/assert-never
  it('exports never', () => expect(index.never).toStrictEqual(never));

  // core/function
  it('exports noop', () => expect(index.noop).toStrictEqual(noop));

  // core/inherit
  it('exports iherit', (): void => expect(index.inherit).toStrictEqual(inherit));

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
   * {@link Grok.Inherit}
   */
  export namespace Test_Inherit {
    const TestSymbol = Symbol('test:inherit');

    export namespace Test_Inherit_IsUnique {
      type Case_WithInherit = Grok.Assert.IsTrue<Grok.Value.IsExactly<Grok.Inherit, Grok.Inherit>>;
      type Case_WithNoneInheritSymbol = Grok.Assert.IsFalse<Grok.Value.IsExactly<Grok.Inherit, typeof TestSymbol>>;
    }

    export namespace Test_Inherit_Merge {
      type Case_WithNormalOverlap = Grok.Assert.IsTrue<Grok.Value.IsExactly<Grok.Inherit.Merge<{ a: 1 }, { a: 1 }>, { a: 1 }>>;
      type Case_WithNormalOverlapIndividual = Grok.Assert.IsTrue<Grok.Value.IsExactly<Grok.Inherit.Merge<{ a: 1 }, { a: 2 }>, { a: 1 }>>;

      type Case_WithInheritOverlap = Grok.Assert.IsTrue<Grok.Value.IsExactly<Grok.Inherit.Merge<{ a: Grok.Inherit }, { a: Grok.Inherit }>, { a: Grok.Inherit }>>;
      type Case_WithInheritFromLeft = Grok.Assert.IsTrue<Grok.Value.IsExactly<Grok.Inherit.Merge<{ a: 1 }, { a: Grok.Inherit }>, { a: 1 }>>;
      type Case_WithInheritFromRight = Grok.Assert.IsTrue<Grok.Value.IsExactly<Grok.Inherit.Merge<{ a: Grok.Inherit }, { a: 1 }>, { a: 1 }>>;
    }

    export namespace Test_Inherit_Normalise {
      type Case_WithAny = Grok.Assert.IsTrue<Grok.Value.IsInherit<Grok.Inherit.Normalise<any>>>;
      type Case_WithInherit = Grok.Assert.IsTrue<Grok.Value.IsInherit<Grok.Inherit.Normalise<Grok.Inherit>>>;

      type Case_WithUndefined = Grok.Assert.IsFalse<Grok.Value.IsInherit<Grok.Inherit.Normalise<undefined>>>;
      type Case_WithVoid = Grok.Assert.IsFalse<Grok.Value.IsInherit<Grok.Inherit.Normalise<void>>>;
      type Case_WithNever = Grok.Assert.IsFalse<Grok.Value.IsInherit<Grok.Inherit.Normalise<never>>>;
    }
  }

  /**
   * {@link Grok.If}
   */
  export namespace Test_If {
    export namespace Test_If {
      type Case_WithTrue = Grok.Assert<'pass', Grok.If<true, 'pass', 'fail'>>;

      type Case_WithFalse = Grok.Assert<'fail', Grok.If<false, 'pass', 'fail'>>;
    }

    export namespace Test_If_IsAny {
      type Case_WithAny = Grok.Assert<'pass', Grok.If.IsAny<any, 'pass', 'fail'>>;

      type Case_WithUndefined = Grok.Assert<'fail', Grok.If.IsAny<undefined, 'pass', 'fail'>>;
      type Case_WithBoolean = Grok.Assert<'fail', Grok.If.IsAny<false, 'pass', 'fail'>>;
      type Case_WithNumber = Grok.Assert<'fail', Grok.If.IsAny<123, 'pass', 'fail'>>;
      type Case_WithString = Grok.Assert<'fail', Grok.If.IsAny<'test', 'pass', 'fail'>>;

      type Case_WithUnknown = Grok.Assert<'fail', Grok.If.IsAny<unknown, 'pass', 'fail'>>;
      type Case_WithVoid = Grok.Assert<'fail', Grok.If.IsAny<void, 'pass', 'fail'>>;
      type Case_WithNever = Grok.Assert<'fail', Grok.If.IsAny<never, 'pass', 'fail'>>;
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
     * {@link Grok.Value.IsInherit}
     */
    export namespace Test_Value_IsInherit {
      type Case_WithInherit = Grok.Assert.IsTrue<Grok.Value.IsInherit<Grok.Inherit>>;

      type Case_WithBoolean = Grok.Assert.IsFalse<Grok.Value.IsInherit<true>>;
      type Case_WithUndefined = Grok.Assert.IsFalse<Grok.Value.IsInherit<undefined>>;
      type Case_WithUnknown = Grok.Assert.IsFalse<Grok.Value.IsInherit<unknown>>;
      type Case_WithAny = Grok.Assert.IsFalse<Grok.Value.IsInherit<any>>;
    }

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

      type Case_WithUndefined = Grok.Assert.IsFalse<Grok.Value.IsAny<undefined>>;
      type Case_WithVoid = Grok.Assert.IsFalse<Grok.Value.IsAny<void>>;
      type Case_WithBoolean = Grok.Assert.IsFalse<Grok.Value.IsAny<false>>;
      type Case_WithNumber = Grok.Assert.IsFalse<Grok.Value.IsAny<123>>;
      type Case_WithString = Grok.Assert.IsFalse<Grok.Value.IsAny<'test'>>;

      type Case_WithUnknown = Grok.Assert.IsFalse<Grok.Value.IsAny<unknown>>;
      type Case_WithNever = Grok.Assert.IsFalse<Grok.Value.IsAny<never>>;
    }

    /**
     * {@link Grok.Value.IsNever}
     */
    export namespace Test_Value_IsAny {
      type Case_WithNever = Grok.Assert.IsTrue<Grok.Value.IsNever<never>>;

      type Case_WithUndefined = Grok.Assert.IsFalse<Grok.Value.IsNever<undefined>>;
      type Case_WithVoid = Grok.Assert.IsFalse<Grok.Value.IsNever<void>>;
      type Case_WithBoolean = Grok.Assert.IsFalse<Grok.Value.IsNever<false>>;
      type Case_WithNumber = Grok.Assert.IsFalse<Grok.Value.IsNever<123>>;
      type Case_WithString = Grok.Assert.IsFalse<Grok.Value.IsNever<'test'>>;

      type Case_WithUnknown = Grok.Assert.IsFalse<Grok.Value.IsNever<unknown>>;
      type Case_WithAny = Grok.Assert.IsFalse<Grok.Value.IsNever<any>>;

    /**
     * {@link Grok.Value.IsUnkown}
     */
    export namespace Test_Value_IsUnkown {
      type Case_WithInherit = Grok.Assert.IsFalse<Grok.Value.IsUnkown<Grok.Inherit>>;
      type Case_WithAny = Grok.Assert.IsFalse<Grok.Value.IsUnkown<any>>;
      type Case_WithNever = Grok.Assert.IsFalse<Grok.Value.IsUnkown<never>>;
      type Case_WithUnknown = Grok.Assert.IsTrue<Grok.Value.IsUnkown<unknown>>;
      type Case_WithUndefined = Grok.Assert.IsFalse<Grok.Value.IsUnkown<undefined>>;
      type Case_WithVoid = Grok.Assert.IsFalse<Grok.Value.IsUnkown<void>>;

      type Case_WithBoolean = Grok.Assert.IsFalse<Grok.Value.IsUnkown<boolean>>;
      type Case_WithBooleanTrue = Grok.Assert.IsFalse<Grok.Value.IsUnkown<true>>;
      type Case_WithBooleanFalse = Grok.Assert.IsFalse<Grok.Value.IsUnkown<false>>;

      type Case_WithNumber = Grok.Assert.IsFalse<Grok.Value.IsUnkown<number>>;
      type Case_WithNumberInteger = Grok.Assert.IsFalse<Grok.Value.IsUnkown<123>>;
      type Case_WithNumberFloat = Grok.Assert.IsFalse<Grok.Value.IsUnkown<1.234>>;

      type Case_WithString = Grok.Assert.IsFalse<Grok.Value.IsUnkown<string>>;
      type Case_WithStringLiteral = Grok.Assert.IsFalse<Grok.Value.IsUnkown<'test'>>;
    }

    /**
     * {@link Grok.Value.IsBoolean}
     */
    export namespace Test_Value_IsBoolean {
      type Case_WithBoolean = Grok.Assert.IsTrue<Grok.Value.IsBoolean<boolean>>;

      type Case_WithTrue = Grok.Assert.IsFalse<Grok.Value.IsBoolean<true>>;
      type Case_WithFalse = Grok.Assert.IsFalse<Grok.Value.IsBoolean<false>>;

      type Case_WithUndefined = Grok.Assert.IsFalse<Grok.Value.IsBoolean<undefined>>;
      type Case_WithVoid = Grok.Assert.IsFalse<Grok.Value.IsBoolean<void>>;
      type Case_WithNumber = Grok.Assert.IsFalse<Grok.Value.IsBoolean<123>>;
      type Case_WithString = Grok.Assert.IsFalse<Grok.Value.IsBoolean<'test'>>;
    }

    /**
     * {@link Grok.Value.IsTrue}
     */
    export namespace Test_Value_IsTrue {
      type Case_WithTrue = Grok.Assert.IsTrue<Grok.Value.IsTrue<true>>;

      type Case_WithFalse = Grok.Assert.IsFalse<Grok.Value.IsTrue<false>>;

      type Case_WithUndefined = Grok.Assert.IsFalse<Grok.Value.IsTrue<undefined>>;
      type Case_WithVoid = Grok.Assert.IsFalse<Grok.Value.IsTrue<void>>;
      type Case_WithNumber = Grok.Assert.IsFalse<Grok.Value.IsTrue<123>>;
      type Case_WithString = Grok.Assert.IsFalse<Grok.Value.IsTrue<'test'>>;

      type Case_WithAny = Grok.Assert.IsFalse<Grok.Value.IsTrue<any>>;
      type Case_WithUnknown = Grok.Assert.IsFalse<Grok.Value.IsTrue<unknown>>;
      type Case_WithNever = Grok.Assert.IsFalse<Grok.Value.IsTrue<never>>;
    }

    /**
     * {@link Grok.Value.IsFalse}
     */
    export namespace Test_Value_IsFalse {
      type Case_WithFalse = Grok.Assert.IsTrue<Grok.Value.IsFalse<false>>;

      type Case_WithTrue = Grok.Assert.IsFalse<Grok.Value.IsFalse<true>>;

      type Case_WithUndefined = Grok.Assert.IsFalse<Grok.Value.IsFalse<undefined>>;
      type Case_WithVoid = Grok.Assert.IsFalse<Grok.Value.IsFalse<void>>;
      type Case_WithNumber = Grok.Assert.IsFalse<Grok.Value.IsFalse<123>>;
      type Case_WithString = Grok.Assert.IsFalse<Grok.Value.IsFalse<'test'>>;

      type Case_WithAny = Grok.Assert.IsFalse<Grok.Value.IsFalse<any>>;
      type Case_WithUnknown = Grok.Assert.IsFalse<Grok.Value.IsFalse<unknown>>;
      type Case_WithNever = Grok.Assert.IsFalse<Grok.Value.IsFalse<never>>;
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
