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
      type Case_WithTrue = Grok.Testing.AssertTrue<Grok.If<true, true, false>>;

      type Case_WithFalse = Grok.Testing.AssertFalse<Grok.If<false, true, false>>;
    }

    export namespace Test_If_IsAny {
      type Case_WithAny = Grok.Testing.AssertTrue<Grok.If.IsAny<any, true, false>>;

      type Case_WithUndefined = Grok.Testing.AssertFalse<Grok.If.IsAny<undefined, true, false>>;
      type Case_WithBoolean = Grok.Testing.AssertFalse<Grok.If.IsAny<false, true, false>>;
      type Case_WithNumber = Grok.Testing.AssertFalse<Grok.If.IsAny<123, true, false>>;
      type Case_WithString = Grok.Testing.AssertFalse<Grok.If.IsAny<'test', true, false>>;

      type Case_WithUnknown = Grok.Testing.AssertFalse<Grok.If.IsAny<unknown, true, false>>;
      type Case_WithVoid = Grok.Testing.AssertFalse<Grok.If.IsAny<void, true, false>>;
      type Case_WithNever = Grok.Testing.AssertFalse<Grok.If.IsAny<never, true, false>>;
    }
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
      type Case_WithBoolean = Grok.Testing.AssertFalse<Grok.Value.IsAny<false>>;
      type Case_WithNumber = Grok.Testing.AssertFalse<Grok.Value.IsAny<123>>;
      type Case_WithString = Grok.Testing.AssertFalse<Grok.Value.IsAny<'test'>>;

      type Case_WithUnknown = Grok.Testing.AssertFalse<Grok.Value.IsAny<unknown>>;
      type Case_WithVoid = Grok.Testing.AssertFalse<Grok.Value.IsAny<void>>;
      type Case_WithNever = Grok.Testing.AssertFalse<Grok.Value.IsAny<never>>;
    }
  }
}
