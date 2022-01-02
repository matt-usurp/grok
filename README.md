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
