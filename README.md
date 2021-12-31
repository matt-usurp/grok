# Grok

An expressive series of type helpers and utilities.

An alternative way of writing types with a more familiar api.
Use programming language like syntax to construct complex types that can be understood by anyone.

## Example

```ts
type Resolve<V> = Grok.If<Grok.Value.IsAny<V>, never, V>;
```
