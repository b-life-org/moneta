import { isArray } from "./index.ts";

/**
 * Compute the base of a currency
 * @param base
 * @returns
 */
export const computeBase = (base: number | readonly number[]): number => {
  if (isArray(base)) {
    return base.reduce((acc, curr) => acc * curr);
  }

  return base;
};
