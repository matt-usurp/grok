import { Grok } from '../index';

/**
 * A symbol that is used for uniquly identifying an inherit action.
 */
export const inherit = Symbol('grok:inherit');

/**
 * Check the given {@link value} is the {@link inherit} symbol.
 */
export const isInherit = (value: unknown): value is Grok.Inherit => {
  return value === inherit;
};
