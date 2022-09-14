import { inherit, isInherit } from './inherit';

describe('isInherit()', (): void => {
  it('with inherit symbol, return true', (): void => {
    expect(
      isInherit(inherit),
    ).toStrictEqual(true);
  });

  it('with random symbol, return true', (): void => {
    expect(
      isInherit(Symbol()),
    ).toStrictEqual(false);
  });
});