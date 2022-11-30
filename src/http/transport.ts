import type { Grok, Maybe } from '../index';
import type { HttpHeaderMapping } from './header';

export type HttpTransportPartStatusCode<Value> = { readonly status: Value };
export type HttpTransportPartHeaders<Value> = { readonly headers: Value };
export type HttpTransportPartBody<Value> = { readonly body: Value };

/**
 * A http response transport data structure.
 */
export type HttpTransport<
  StatusCode extends number,
  Body = undefined,
  Headers extends Maybe<HttpHeaderMapping> = Maybe<HttpHeaderMapping>,
> = (
  & HttpTransportPartStatusCode<StatusCode>
  & HttpTransportPartHeaders<Headers>
  & HttpTransportPartBody<Body>
);

export type HttpTransportKind = (
/* eslint-disable @typescript-eslint/indent */
  HttpTransport<
    number,
    any, // eslint-disable-line @typescript-eslint/no-explicit-any
    any // eslint-disable-line @typescript-eslint/no-explicit-any
  >
/* eslint-enable @typescript-eslint/indent */
);

export type HttpTransportGetStatus<Transport extends HttpTransportKind> = Transport['status'];
export type HttpTransportGetHeaders<Transport extends HttpTransportKind> = Transport['headers'];
export type HttpTransportGetBody<Transport extends HttpTransportKind> = Transport['body'];

export type HttpTransportWithStringBody = HttpTransport<number, string>;
export type HttpTransportWithObjectBody = HttpTransport<number, Grok.Constraint.ObjectLike>;

/**
 * A smart type that will require only elements of the {@link Transport} that are required.
 * Where values are typed as `any` or `undefined` the transport item becomes optional.`
 */
export type HttpTransportForFactory<Transport extends HttpTransportKind> = (
  & HttpTransportPartStatusCode<HttpTransportGetStatus<Transport>>
  & (
  /* eslint-disable @typescript-eslint/indent */
    Grok.If<
      Grok.Or<[
        Grok.Value.IsAny<HttpTransportGetBody<Transport>>,
        Grok.Value.IsUndefined<HttpTransportGetBody<Transport>>,
      ]>,
      Partial<HttpTransportPartBody<HttpTransportGetBody<Transport>>>,
      HttpTransportPartBody<HttpTransportGetBody<Transport>>
    >
  /* eslint-enable @typescript-eslint/indent */
  )
  & (
  /* eslint-disable @typescript-eslint/indent */
    Grok.If<
      Grok.Or<[
        Grok.Value.IsAny<HttpTransportGetHeaders<Transport>>,
        Grok.Value.IsUndefined<HttpTransportGetHeaders<Transport>>,
      ]>,
      Partial<HttpTransportPartHeaders<HttpTransportGetHeaders<Transport>>>,
      HttpTransportPartHeaders<HttpTransportGetHeaders<Transport>>
    >
  /* eslint-enable @typescript-eslint/indent */
  )
);

/**
 * A factory for creating {@link Transport} from only required elements.
 */
export const createHttpTransport = <Transport extends HttpTransportKind>(transport: HttpTransportForFactory<Transport>): Transport => {
  return {
    status: transport.status,
    headers: transport.headers,
    body: transport.body,
  } as Transport;
}
