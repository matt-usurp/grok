# Grok

> An expressive series of utilities for language like types.

The type meta programming within `TypeScript` can be very powerful, especially if you treat it as a "meta language" on top of your code.
The goal of `Grok` is to introduce the "language" element that could exist by providing a series of pre-defined type helpers that function similar to language syntax.

## Example

Grok in its simplist form is about abstract some complexities around nesting `extends`.
For example we have a simple `if statement` expressed in vanilla types and `Grok`.

```ts
type MyValue = SomeInput extends 'foobar' ? SomeTrue : SomeFalse;
type MyValue = Grok.If<Grok.Value.IsExtending<SomeInput, 'foobar'>, SomeTrue, SomeFalse>;
```

This example seems trivial and maybe not needed, the added bonus here is the verbosity of `Grok` type heleprs that literally read what the purpose of this statement is meant for.
Now, complexity is added as more `extends` are needed.

```ts
type MyValue = (
  SomeInput extends 'foobar'
    ? (
      AnotherInput extends 'worldbar'
        ? SomeTrue
        : SomeFalse
    )
    : SomeFalse
);

type MyValue = (
  Grok.If<
    Grok.Value.IsExtending<SomeInput, 'foobar'>,
    Grok.If<
      Grok.Value.IsExtending<AnotherInput, 'worldbar'>,
      SomeTrue,
      SomeFalse
    >,
    SomeFalse,
  >
);

// or

type MyValue = (
  Grok.If<
    Grok.And<
      Grok.Value.IsExtending<SomeInput, 'foobar'>,
      Grok.Value.IsExtending<AnotherInput, 'worldbar'>
    >
    SomeTrue,
    SomeFalse
  >
)
```

## Syntax Helpers

- `Grok.If`
- `Grok.And`
- `Grok.Or`
- `Grok.Not`

## Value Helpers

- `Grok.Value.IsAny`
- `Grok.Value.IsNever`
- `Grok.Value.IsExtending`
- `Grok.Value.IsExactly`
- `Grok.Value.IsTrue`
- `Grok.Value.IsFalse`

## Functional Helpers

A series of modular functional helpers and utilities are available also.
These are all exported from the main entrypoint and as a modular path export that will allow for better tree shaking.

### `never`

For use with [union exhaustiveness checking](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#union-exhaustiveness-checking) which will cause TypeScript to error when the given value is not of type `never`.
This function simply throws an error of `NeverReachAssertionError` when compiled which should be caught by your error reporting tool of choice.

```ts
import { never } from '@matt-usurp/grok';
// or
import { never } from '@matt-usurp/grok/core/assert-never';

declare const union: 1 | 2

if (union === 1 || union === 2) {
  // do something
}

never(union);
```

Introducing a new value to `union` will cause `never` to raise an error at build time.

### `okv`

An accessor utility for retreiving values from object sources by key.
This is a factory that returns a function that can be called multiple times to retrieve values from the source by key.

> There is a runtime safe version of this called `okvr`!

```ts
import { okv } from '@matt-usurp/grok';
// or
import { okv } from '@matt-usurp/grok/core/object';

declare const mapping: {
  readonly name: string;
  readonly age?: number;
}

okv(mapping)('name') // mapping.name [string]
okv(mapping)('age', 26) // mapping.age or 26 if undefined
```

### `okvr`

A runtime safe version of `okv()` that will throw errors when keys are not available in the given source object.

```ts
import { okvr } from '@matt-usurp/grok';
// or
import { okvr } from '@matt-usurp/grok/core/object';

declare const mapping: {
  readonly name: string;
  readonly age?: number;
}

// mapping.name must not be undefined
okvr(mapping)('name')

// mapping.name will be replaced with fallback if undefined
// an error is thrown if fallback was undefined also.
okvr(mapping)('name', fallback)

// mapping.age is verified, an error is thrown if its undefined
// mapping.name can be undefined, and fallback can be used.
okvr(mapping, ['age'])('name', fallback)
```

The `okvr` function is perfect for accessing keys against `process.env` when working in the context of Node.

```ts
const env = okvr(process.env);

env('SOME_AVAILABLE_VAR');
env('SOME_UNDEFINED_VAR', fallback);
env('ANOTHER_UNDEFINED_VAR'); // throws
```
