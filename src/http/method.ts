export namespace HttpMethod {
  export type Options = 'OPTIONS';
  export type Head = 'HEAD';
  export type Get = 'GET';
  export type Put = 'PUT';
  export type Post = 'POST';
  export type Patch = 'PATCH';
  export type Delete = 'DELETE';
}

/**
 * A union of support HTTP methods.
 */
export type HttpMethod = (
  | HttpMethod.Options
  | HttpMethod.Head
  | HttpMethod.Get
  | HttpMethod.Put
  | HttpMethod.Post
  | HttpMethod.Patch
  | HttpMethod.Delete
);

/**
 * Normalise the given {@link HttpHeaderKey} of type {@link Method}.
 *
 * This will convert the key's casing to uppercase.
 */
export const normaliseHttpMethod = <Method extends HttpMethod>(method: HttpMethod): Uppercase<Method> => {
  return method.toUpperCase() as Uppercase<Method>;
};
