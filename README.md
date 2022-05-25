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

## Constraint Helpers

- `Grok.Constraint.ObjectLike` (defined as `Record<string, unknown>`)
- `Grok.Constraint.FunctionLike` (defined as `(...args: any[]) => any`)
- `Grok.Constraint.Anything` (defined as alias for `any`)

## Utility Helpers

- `Maybe` to add `undefined` (opposite of `NonNullable` in `typescript` core)
- `Nullable` to add `null` (opposite of `NonNullable` in `typescript` core)
- `Mutable` to remove `readonly` (opposite of `Readonly` in `typescript` core)
- `Provider<T>` to represent a function like `() => T`

## Functional Helpers

- `never()` a `never` assertion
- `okv()` a key accessor
- `okvr()` a key accessor with validation and requirements
- `okey()` a type `keyof` assistance
- `union()` a union value enforcement
- 'provide()` a helper for creation `Provider<T>`

## Testing Helpers

- `fn()` a mocking utility for functions of `T`
- `instance()` a mocking utility for objects of `T`
- `partial()` a `Partial<T>` to `T` disguise

# Documentation

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

// custom validator function is provided checking values are not null also
// mapping.age is verified, an error is thrown if its undefined or null (validator function)
okvr(mapping, ['age'], (v) => v !== null)

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

### `okey`

Allows for type-safe strings that are keys of an object.
A functional variant of the `<keyof SomeObject>'name' which cannot be used with `JSX`.

```ts
import { okey } from '@matt-usurp/grok';
// or
import { okey } from '@matt-usurp/grok/core/object';

declare const mapping: {
  readonly name: string;
  readonly age?: number;
}

// the same
<keyof typeof mapping>'name';
okey<typeof mapping>('name');
```

### `union`

A unique utility for times where you want to convert a union of strings to a `string[]` at runtime.
This is done by forcing the values to be defined through a mapping that can be enforced at compile time.
Unlike using `MyUnion[]` which does not enforce all values are present within the array.

```ts
import { union } from '@matt-usurp/grok';
// or
import { union } from '@matt-usurp/grok/core/value';

type MyUnion = 'name' | 'age';

const values = union<MyUnion>({
  name: undefined,
  age: undefined,
});

values; // ['name', 'age']
```

### `provide`

A utility that creates functions that are compatible with a `Provider<T>`.
A `Provider<T>` is a essentially a value wrapped in a function with no parameters.

```ts
import { provide } from '@matt-usurp/grok'
// or
import { provide } from '@matt-usurp/grok/core/value';

const age = provide(30)

age(); // 30
```

## Testing Helpers

A series of helpers and utlities for enriching your testing experience with `jest` or `ts-jest`.

### `fn`

An extension on `jest.fn()` that allows you to pass your function type as the generic and it will resolve the arguments and result for you.

```ts
import { fn } from '@matt-usurp/grok/testing';

type MyFunction = (age: number) => boolean;

const mock = fn<MyFunction>();

mock; // Mock<boolean, [age: number]>

expect(mock).toBeCalledTimes(0);
```

### `instance`

A utiltity that disguises an object as the given type `T`. Optionally you can provide a `string[]` of functions and they will be automatically set using `fn()` above.

> Note, this is a disguise and all properties are `undefined` unless set manually after calling.
> This function is inteded to minimise the amount of type casting and boiler plate needed for creating simplistic mocks of complex classes or types.

```ts
import { instance } from '@matt-usurp/grok/testing';

class Person {
  public readonly name: string;
  public readonly age: number;

  public speak(): void { .. };
  public walk(steps: number): boolean { .. };
};

const value = instance<Person>([
  'speak',
]);

value; // { speak: Mock }
value.speak(); // returns undefined

expect(value.speak).toBeCalledTimes(1);
```

### `partial`

This is a utility that works similar to `instance()` but in a more simplified way, it can be better expressed through the type `<T>(in: Partial<T>) => T`.
Again, this is intended for use with testing where a full `T` is needed but your test is asserting just a `Partial<T>`.

> This is intended more of a utility around types not less about functionality.

```ts
import { partial } from '@matt-usurp/grok/testing';

type Person = {
  readonly name: string;
  readonly age: number;
  readonly gender: unknown;
}

const value = partial<Person>({
  name: 'Tony Stark',
});

value; // Person
value.name; // 'Tony Stark'
value.age; // undefined
```
