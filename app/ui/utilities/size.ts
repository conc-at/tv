export type Size = 'xs' | 's' | 'm' | 'l' | 'xl';

const predefined: Size[] = ['xs', 's', 'm', 'l', 'xl'];

export const base = 0.5;
export const sizes = new Map(
  predefined.map((size, index) => [size, base * (index + 1)]),
);
