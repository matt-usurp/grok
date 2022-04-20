import { fn, instance, partial } from './testing';

describe('fn()', (): void => {
  it('with given type, returns mockable function with same types', (): void => {
    type MyFunction = (active: boolean) => null[];

    const value = fn<MyFunction>();
    const result = value(false);

    expect(value).toBeCalledTimes(1);
    expect(value).toBeCalledWith(false);

    expect(result).toStrictEqual(undefined);
  });

  it('with given type, returns mockable function with same type, default implementation provided', (): void => {
    type MyFunction = (active: boolean) => null[];

    const value = fn<MyFunction>(() => {
      return [
        null,
        null,
        null,
      ];
    });

    const result = value(false);

    expect(value).toBeCalledTimes(1);
    expect(value).toBeCalledWith(false);

    expect(result).toStrictEqual([
      null,
      null,
      null,
    ]);
  });
});

describe('instance()', (): void => {
  it('with given type, returns empty object with same type', (): void => {
    type MyInstance = {
      name: string;
      age: number;
      speak: () => void;
      walk: (steps: number) => boolean;
    };

    const value = instance<MyInstance>();

    expect(value).toBeInstanceOf(Object);

    expect(value.name).toStrictEqual(undefined);
    expect(value.age).toStrictEqual(undefined);
    expect(value.speak).toStrictEqual(undefined);
    expect(value.walk).toStrictEqual(undefined);
  });

  it('with given type, given function names, returns object with same type, functions mocked', (): void => {
    type MyInstance = {
      name: string;
      age: number;
      speak: () => void;
      walk: (steps: number) => boolean;
    };

    const value = instance<MyInstance>([
      'speak',
      'walk',
    ]);

    expect(value).toBeInstanceOf(Object);

    expect(value.name).toStrictEqual(undefined);
    expect(value.age).toStrictEqual(undefined);
    expect(value.speak).not.toStrictEqual(undefined);
    expect(value.walk).not.toStrictEqual(undefined);

    expect(value.speak).toBeCalledTimes(0);
    expect(value.walk).toBeCalledTimes(0);

    value.speak();

    expect(value.speak).toBeCalledTimes(1);
    expect(value.walk).toBeCalledTimes(0);

    value.speak();
    value.walk(50);

    expect(value.speak).toBeCalledTimes(2);
    expect(value.walk).toBeCalledTimes(1);
    expect(value.walk).toBeCalledWith(50);
  });
});

describe('partial()', (): void => {
  it('with object, creates partial object, disguised', (): void => {
    type TestObject = {
      readonly name: string;
      readonly age: string;
    };

    const value = partial<TestObject>({
      name: 'foo',
    });

    expect(value.name).toStrictEqual('foo');
    expect(value.age).toStrictEqual(undefined);
  });
});
