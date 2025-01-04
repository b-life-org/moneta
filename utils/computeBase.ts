import { isArray } from "./index.ts";

export const computeBase = (base: number | readonly number[]) => {
  if (isArray(base)) {
    return base.reduce((acc, curr) => acc * curr);
  }

  return base;
};
