import { never } from './core/assert-never';
import { okv, okvr } from './core/object';
import * as index from './index';

describe('index', (): void => {
  describe('exports', (): void => {
    it('exports never', () => expect(index.never).toStrictEqual(never));
    it('exports okv', () => expect(index.okv).toStrictEqual(okv));
    it('exports okvr', () => expect(index.okvr).toStrictEqual(okvr));
  });
})
