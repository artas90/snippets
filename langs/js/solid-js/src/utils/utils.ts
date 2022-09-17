export type Literal = symbol | object;

export const tuple = <T extends Literal[]>(...args: T) => args;
