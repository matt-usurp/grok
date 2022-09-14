import { never } from './core/assert-never';
import { noop } from './core/function';
import type { InheritActionType } from './core/inherit';
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
   * {@link Grok.Inherit}
   */
  export namespace Test_Inherit {
    const TestSymbol = Symbol('test');
    type TestSymbolKind = typeof TestSymbol;

    export namespace Test_Inherit_Unique {
      type Test<T extends Grok.Inherit> = T;

      type Case_WithInherit = Test<InheritActionType>;
      type Case_WithInheritAlias = Test<Grok.Inherit>;

      // @ts-expect-error Should only allow the inherit symbol.
      type Case_WithNoneInheritSymbol = Test<TestSymbolKind>;
    }
  }

  /**
   * {@link Grok.If}
   */
  export namespace Test_If {
    export namespace Test_If {
      type Case_WithTrue = Grok.Testing.Assert<'pass', Grok.If<true, 'pass', 'fail'>>;

      type Case_WithFalse = Grok.Testing.Assert<'fail', Grok.If<false, 'pass', 'fail'>>;
    }

    export namespace Test_If_IsAny {
      type Case_WithAny = Grok.Testing.Assert<'pass', Grok.If.IsAny<any, 'pass', 'fail'>>;

      type Case_WithUndefined = Grok.Testing.Assert<'fail', Grok.If.IsAny<undefined, 'pass', 'fail'>>;
      type Case_WithBoolean = Grok.Testing.Assert<'fail', Grok.If.IsAny<false, 'pass', 'fail'>>;
      type Case_WithNumber = Grok.Testing.Assert<'fail', Grok.If.IsAny<123, 'pass', 'fail'>>;
      type Case_WithString = Grok.Testing.Assert<'fail', Grok.If.IsAny<'test', 'pass', 'fail'>>;

      type Case_WithUnknown = Grok.Testing.Assert<'fail', Grok.If.IsAny<unknown, 'pass', 'fail'>>;
      type Case_WithVoid = Grok.Testing.Assert<'fail', Grok.If.IsAny<void, 'pass', 'fail'>>;
      type Case_WithNever = Grok.Testing.Assert<'fail', Grok.If.IsAny<never, 'pass', 'fail'>>;
    }
  }

  export namespace Test_And {
    type Case_WithTrue = Grok.Testing.AssertTrue<Grok.And<[true]>>;
    type Case_WithTrueTrue = Grok.Testing.AssertTrue<Grok.And<[true, true]>>;
    type Case_WithTrueTrueTrue = Grok.Testing.AssertTrue<Grok.And<[true, true, true]>>;

    // @ts-expect-error And<[]> should expect at least one element.
    type Case_WithEmpty = Grok.Testing.AssertFalse<Grok.And<[]>>;

    type Case_WithFalse = Grok.Testing.AssertFalse<Grok.And<[false]>>;
    type Case_WithTrueFalse = Grok.Testing.AssertFalse<Grok.And<[true, false]>>;
    type Case_WithFalseTrue = Grok.Testing.AssertFalse<Grok.And<[false, true]>>;
    type Case_WithFalseFalse = Grok.Testing.AssertFalse<Grok.And<[false, false]>>;
    type Case_WithFalseFalseTrue = Grok.Testing.AssertFalse<Grok.And<[false, false, true]>>;
  }

  export namespace Test_Or {
    type Case_WithTrueTrue = Grok.Testing.AssertTrue<Grok.Or<true, true>>;
    type Case_WithTrueFalse = Grok.Testing.AssertTrue<Grok.Or<true, false>>;
    type Case_WithFalseTrue = Grok.Testing.AssertTrue<Grok.Or<false, true>>;

    type Case_WithFalseFalse = Grok.Testing.AssertFalse<Grok.Or<false, false>>;
  }

  /**
   * {@link Grok.Value}
   */
  export namespace Test_Value {
    export namespace Test_Value_IsInherit {
      type Case_WithInherit = Grok.Testing.AssertTrue<Grok.Value.IsInherit<Grok.Inherit>>;
      type Case_WithInheritAlias = Grok.Testing.AssertTrue<Grok.Value.IsInherit<InheritActionType>>;

      type Case_WithBoolean = Grok.Testing.AssertFalse<Grok.Value.IsInherit<true>>;
      type Case_WithUndefined = Grok.Testing.AssertFalse<Grok.Value.IsInherit<undefined>>;
      type Case_WithUnknown = Grok.Testing.AssertFalse<Grok.Value.IsInherit<unknown>>;
      type Case_WithAny = Grok.Testing.AssertFalse<Grok.Value.IsInherit<any>>;
    }

    export namespace Test_Value_IsAny {
      type Case_WithAny = Grok.Testing.AssertTrue<Grok.Value.IsAny<any>>;

      type Case_WithUndefined = Grok.Testing.AssertFalse<Grok.Value.IsAny<undefined>>;
      type Case_WithVoid = Grok.Testing.AssertFalse<Grok.Value.IsAny<void>>;
      type Case_WithBoolean = Grok.Testing.AssertFalse<Grok.Value.IsAny<false>>;
      type Case_WithNumber = Grok.Testing.AssertFalse<Grok.Value.IsAny<123>>;
      type Case_WithString = Grok.Testing.AssertFalse<Grok.Value.IsAny<'test'>>;

      type Case_WithUnknown = Grok.Testing.AssertFalse<Grok.Value.IsAny<unknown>>;
      type Case_WithNever = Grok.Testing.AssertFalse<Grok.Value.IsAny<never>>;
    }

    export namespace Test_Value_IsTrue {
      type Case_WithTrue = Grok.Testing.AssertTrue<Grok.Value.IsTrue<true>>;

      type Case_WithFalse = Grok.Testing.AssertFalse<Grok.Value.IsTrue<false>>;

      type Case_WithUndefined = Grok.Testing.AssertFalse<Grok.Value.IsTrue<undefined>>;
      type Case_WithVoid = Grok.Testing.AssertFalse<Grok.Value.IsTrue<void>>;
      type Case_WithNumber = Grok.Testing.AssertFalse<Grok.Value.IsTrue<123>>;
      type Case_WithString = Grok.Testing.AssertFalse<Grok.Value.IsTrue<'test'>>;

      type Case_WithAny = Grok.Testing.AssertFalse<Grok.Value.IsTrue<any>>;
      type Case_WithUnknown = Grok.Testing.AssertFalse<Grok.Value.IsTrue<unknown>>;
      type Case_WithNever = Grok.Testing.AssertFalse<Grok.Value.IsTrue<never>>;
    }

    export namespace Test_Value_IsFalse {
      type Case_WithFalse = Grok.Testing.AssertTrue<Grok.Value.IsFalse<false>>;

      type Case_WithTrue = Grok.Testing.AssertFalse<Grok.Value.IsFalse<true>>;

      type Case_WithUndefined = Grok.Testing.AssertFalse<Grok.Value.IsFalse<undefined>>;
      type Case_WithVoid = Grok.Testing.AssertFalse<Grok.Value.IsFalse<void>>;
      type Case_WithNumber = Grok.Testing.AssertFalse<Grok.Value.IsFalse<123>>;
      type Case_WithString = Grok.Testing.AssertFalse<Grok.Value.IsFalse<'test'>>;

      type Case_WithAny = Grok.Testing.AssertFalse<Grok.Value.IsFalse<any>>;
      type Case_WithUnknown = Grok.Testing.AssertFalse<Grok.Value.IsFalse<unknown>>;
      type Case_WithNever = Grok.Testing.AssertFalse<Grok.Value.IsFalse<never>>;
    }
  }
}
