import { never } from './core/assert-never';
import { okey, okeys, okv, okvr } from './core/object';
import * as index from './index';

describe('index', (): void => {
  describe('exports', (): void => {
    // core/assert-never
    it('exports never', () => expect(index.never).toStrictEqual(never));

    // core/object
    it('exports okey', () => expect(index.okey).toStrictEqual(okey));
    it('exports okeys', () => expect(index.okeys).toStrictEqual(okeys));
    it('exports okv', () => expect(index.okv).toStrictEqual(okv));
    it('exports okvr', () => expect(index.okvr).toStrictEqual(okvr));
  });
})
