import { Grok, Maybe } from '../index';
import { HttpHeaderMapping } from './header';
import { createHttpTransport, HttpTransport, HttpTransportForFactory } from './transport';

describe('createHttpTransport()', (): void => {
  it('with transport, barebones', (): void => {
    type Transport = HttpTransport<200, undefined, undefined>;

    expect(
      createHttpTransport<Transport>({
        status: 200,
      }),
    ).toStrictEqual<Transport>({
      status: 200,
      headers: undefined,
      body: undefined,
    });
  });

  it('with transport, with body', (): void => {
    type Transport = HttpTransport<200, 'something', undefined>;

    expect(
      createHttpTransport<Transport>({
        status: 200,
        body: 'something',
      }),
    ).toStrictEqual<Transport>({
      status: 200,
      headers: undefined,
      body: 'something',
    });
  });
});

/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unused-vars */

type TestHttpHeaderMapping = {
  readonly 'header:key:a': 'header:value:a';
  readonly 'header:key:b': 'header:value:b';
};

/**
 * @internal {@link HttpTransportForFactory}
 */
export namespace Test_HttpTransportForFactory {
  /**
   * @internal {@link HttpTransportForFactory}
   */
  export namespace Test_HttpTransportForFactory_DefaultState {
    export type Value = (
      HttpTransportForFactory<
        HttpTransport<200>
      >
    );

    export type Case_WithStatusCode = Grok.Assert.IsTrue<Grok.Value.IsExactly<Value['status'], 200>>;
    export type Case_WithStatusCodeOptional = Grok.Assert.IsFalse<Grok.Record.IsKeyOptional<Value, 'status'>>;

    export type Case_WithBody = Grok.Assert.IsTrue<Grok.Value.IsExactly<Value['body'], undefined>>;
    export type Case_WithBodyOptional = Grok.Assert.IsTrue<Grok.Record.IsKeyOptional<Value, 'body'>>;

    export type Case_WithHeaders = Grok.Assert.IsTrue<Grok.Value.IsExactly<Value['headers'], Maybe<HttpHeaderMapping>>>;
    export type Case_WithHeadersOptional = Grok.Assert.IsTrue<Grok.Record.IsKeyOptional<Value, 'headers'>>;

    const implementation: Value = {
      status: 200,
    };
  }

  /**
   * @internal {@link HttpTransportForFactory}
   */
  export namespace Test_HttpTransportForFactory_WithHeaders_SetUndefined {
    export type Value = (
      HttpTransportForFactory<
        HttpTransport<
          202,
          'test:body',
          undefined
        >
      >
    );

    export type Case_WithStatusCode = Grok.Assert.IsTrue<Grok.Value.IsExactly<Value['status'], 202>>;
    export type Case_WithStatusCodeOptional = Grok.Assert.IsFalse<Grok.Record.IsKeyOptional<Value, 'status'>>;

    export type Case_WithBody = Grok.Assert.IsTrue<Grok.Value.IsExactly<Value['body'], 'test:body'>>;
    export type Case_WithBodyOptional = Grok.Assert.IsFalse<Grok.Record.IsKeyOptional<Value, 'body'>>;

    export type Case_WithHeaders = Grok.Assert.IsTrue<Grok.Value.IsExactly<Value['headers'], undefined>>;
    export type Case_WithHeadersOptional = Grok.Assert.IsTrue<Grok.Record.IsKeyOptional<Value, 'headers'>>;

    const implementation: Value = {
      status: 202,
      body: 'test:body',
    };
  }

  /**
   * @internal {@link HttpTransportForFactory}
   */
  export namespace Test_HttpTransportForFactory_WithBody_SetUndefined {
    export type Value = (
      HttpTransportForFactory<
        HttpTransport<
          202,
          undefined,
          TestHttpHeaderMapping
        >
      >
    );

    export type Case_WithStatusCode = Grok.Assert.IsTrue<Grok.Value.IsExactly<Value['status'], 202>>;
    export type Case_WithStatusCodeOptional = Grok.Assert.IsFalse<Grok.Record.IsKeyOptional<Value, 'status'>>;

    export type Case_WithBody = Grok.Assert.IsTrue<Grok.Value.IsExactly<Value['body'], undefined>>;
    export type Case_WithBodyOptional = Grok.Assert.IsTrue<Grok.Record.IsKeyOptional<Value, 'body'>>;

    export type Case_WithHeaders = Grok.Assert.IsTrue<Grok.Value.IsExactly<Value['headers'], TestHttpHeaderMapping>>;
    export type Case_WithHeadersOptional = Grok.Assert.IsFalse<Grok.Record.IsKeyOptional<Value, 'headers'>>;

    const implementation: Value = {
      status: 202,

      headers: {
        'header:key:a': 'header:value:a',
        'header:key:b': 'header:value:b',
      },
    };
  }

  /**
   * @internal {@link HttpTransportForFactory}
   */
  export namespace Test_HttpTransportForFactory_WithBodyAndHeaders_SetUndefined {
    export type Value = (
      HttpTransportForFactory<
        HttpTransport<
          202,
          undefined,
          undefined
        >
      >
    );

    export type Case_WithStatusCode = Grok.Assert.IsTrue<Grok.Value.IsExactly<Value['status'], 202>>;
    export type Case_WithStatusCodeOptional = Grok.Assert.IsFalse<Grok.Record.IsKeyOptional<Value, 'status'>>;

    export type Case_WithBody = Grok.Assert.IsTrue<Grok.Value.IsExactly<Value['body'], undefined>>;
    export type Case_WithBodyOptional = Grok.Assert.IsTrue<Grok.Record.IsKeyOptional<Value, 'body'>>;

    export type Case_WithHeaders = Grok.Assert.IsTrue<Grok.Value.IsExactly<Value['headers'], undefined>>;
    export type Case_WithHeadersOptional = Grok.Assert.IsTrue<Grok.Record.IsKeyOptional<Value, 'headers'>>;

    const implementation: Value = {
      status: 202,
    };
  }

  /**
   * @internal {@link HttpTransportForFactory}
   */
  export namespace Test_HttpTransportForFactory_WithAllValuesDefined {
    export type Value = (
      HttpTransportForFactory<
        HttpTransport<
          202,
          'test:body',
          TestHttpHeaderMapping
        >
      >
    );

    export type Case_WithStatusCode = Grok.Assert.IsTrue<Grok.Value.IsExactly<Value['status'], 202>>;
    export type Case_WithStatusCodeOptional = Grok.Assert.IsFalse<Grok.Record.IsKeyOptional<Value, 'status'>>;

    export type Case_WithBody = Grok.Assert.IsTrue<Grok.Value.IsExactly<Value['body'], 'test:body'>>;
    export type Case_WithBodyOptional = Grok.Assert.IsFalse<Grok.Record.IsKeyOptional<Value, 'body'>>;

    export type Case_WithHeaders = Grok.Assert.IsTrue<Grok.Value.IsExactly<Value['headers'], TestHttpHeaderMapping>>;
    export type Case_WithHeadersOptional = Grok.Assert.IsFalse<Grok.Record.IsKeyOptional<Value, 'headers'>>;

    const implementation: Value = {
      status: 202,
      body: 'test:body',

      headers: {
        'header:key:a': 'header:value:a',
        'header:key:b': 'header:value:b',
      },
    };
  }

  /**
   * @internal {@link HttpTransportForFactory}
   */
  export namespace Test_HttpTransportForFactory_WithBody_SetAny {
    export type Value = (
      HttpTransportForFactory<
        HttpTransport<
          202,
          any, // eslint-disable-line @typescript-eslint/no-explicit-any
          TestHttpHeaderMapping
        >
      >
    );

    export type Case_WithStatusCode = Grok.Assert.IsTrue<Grok.Value.IsExactly<Value['status'], 202>>;
    export type Case_WithStatusCodeOptional = Grok.Assert.IsFalse<Grok.Record.IsKeyOptional<Value, 'status'>>;

    export type Case_WithBody = Grok.Assert.IsTrue<Grok.Value.IsAny<Value['body']>>;
    export type Case_WithBodyOptional = Grok.Assert.IsTrue<Grok.Record.IsKeyOptional<Value, 'body'>>;

    export type Case_WithHeaders = Grok.Assert.IsTrue<Grok.Value.IsExactly<Value['headers'], TestHttpHeaderMapping>>;
    export type Case_WithHeadersOptional = Grok.Assert.IsFalse<Grok.Record.IsKeyOptional<Value, 'headers'>>;

    const implementation: Value = {
      status: 202,

      headers: {
        'header:key:a': 'header:value:a',
        'header:key:b': 'header:value:b',
      },
    };
  }

  /**
   * @internal {@link HttpTransportForFactory}
   */
  export namespace Test_HttpTransportForFactory_WithHeaders_SetAny {
    export type Value = (
      HttpTransportForFactory<
        HttpTransport<
          202,
          'test:body',
          any // eslint-disable-line @typescript-eslint/no-explicit-any
        >
      >
    );

    export type Case_WithStatusCode = Grok.Assert.IsTrue<Grok.Value.IsExactly<Value['status'], 202>>;
    export type Case_WithStatusCodeOptional = Grok.Assert.IsFalse<Grok.Record.IsKeyOptional<Value, 'status'>>;

    export type Case_WithBody = Grok.Assert.IsTrue<Grok.Value.IsExactly<Value['body'], 'test:body'>>;
    export type Case_WithBodyOptional = Grok.Assert.IsFalse<Grok.Record.IsKeyOptional<Value, 'body'>>;

    export type Case_WithHeaders = Grok.Assert.IsTrue<Grok.Value.IsAny<Value['headers']>>;
    export type Case_WithHeadersOptional = Grok.Assert.IsTrue<Grok.Record.IsKeyOptional<Value, 'headers'>>;

    const implementation: Value = {
      status: 202,
      body: 'test:body',
    };
  }
}
