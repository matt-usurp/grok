import { never } from './core/assert-never';
import { okey, okv, okvr } from './core/object';
import * as index from './index';

describe('index', (): void => {
  describe('exports', (): void => {
    // core/assert-never
    it('exports never', () => expect(index.never).toStrictEqual(never));

    // core/object
    it('exports okey', () => expect(index.okey).toStrictEqual(okey));
    it('exports okv', () => expect(index.okv).toStrictEqual(okv));
    it('exports okvr', () => expect(index.okvr).toStrictEqual(okvr));
  });
})
