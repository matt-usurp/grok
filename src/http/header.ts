/**
 * The representation of a HTTP header key (names).
 * In all cases a header keys (names) are case-insestive strings.
 *
 * @see https://www.rfc-editor.org/rfc/rfc9110.html#name-header-fields
 */
export type HttpHeaderKey = string;

/**
 * The representation of a HTTP header value.
 * In all cases a header value is encoded as a string.
 */
export type HttpHeaderValue = string;

/**
 * A mapping of HTTP header values of key {@link Key} (defaulting to string).
 * In most cases headers cannot be guaranteed so this is considered {@link Partial}.
 */
export type HttpHeaderMapping<Key extends HttpHeaderKey = HttpHeaderKey> = Partial<Record<Key, HttpHeaderValue>>;

/**
 * Ensures the given value is an object that can be used as {@link HttpHeaderMapping}.
 * If not an empty object is returned, allowing for easier header merges.
 */
export const ensureHttpHeaderMapping = <Headers extends HttpHeaderMapping>(value: unknown): Headers => {
  if (typeof value === 'object' && value !== null) {
    return value as Headers;
  }

  return {} as Headers;
};

/**
 * Normalise the given {@link HttpHeaderKey} of type {@link Key}.
 *
 * This will convert the key's casing to lowercase.
 */
export const normaliseHttpHeaderKey = <Key extends HttpHeaderKey>(key: HttpHeaderKey): Lowercase<Key> => {
  return key.toLowerCase() as Lowercase<Key>;
};

/**
 * A normalised {@link HttpHeaderMapping} of type {@link Headers}.
 *
 * See {@link normaliseHttpHeaderMapping} for information what normalisation is in this case.
 * This is just a type that replicates the functionality of that function.
 */
export type HttpHeaderMappingNormalised<Headers extends HttpHeaderMapping> = {
  [K in Lowercase<keyof Headers>]: Headers[K];
}

/**
 * Normalise the given {@link HttpHeaderMapping} of type {@link Headers}.
 *
 * To normalise a header mapping we convert every key within the mapping to lowercase.
 * This is because keys are not case sensitive and will allow for a more consistent interaction with header mappings.
 */
export const normaliseHttpHeaderMapping = <Headers extends HttpHeaderMapping>(headers: Headers): HttpHeaderMappingNormalised<Headers> => {
  return Object.fromEntries(
    Object.entries(headers).map(([key, value]) => {
      return [
        normaliseHttpHeaderKey(key),
        value,
      ];
    }),
  ) as HttpHeaderMappingNormalised<Headers>;
};
