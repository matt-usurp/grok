import { noop } from './function';

describe('noop()', (): void => {
  it('when called does nothing', (): void => {
    noop();
  });
});
