/**
 * A symbol that is used for uniquly identifying an inherit action.
 */
export const inherit = Symbol('grok:inherit');

/**
 * A symbol type representing {@link inherit}.
 */
export type InheritActionType = typeof inherit;
