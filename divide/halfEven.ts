import { DivideOperation } from "../types/types.ts";
import { isEven, isHalf } from "../utils/index.ts";
import { halfUp } from "./index.ts";

/**
 * Divide and round towards "nearest neighbor" unless both neighbors are
 * equidistant, in which case round to the nearest even integer.
 *
 * @param amount - The amount to divide.
 * @param factor - The factor to divide by.
 *
 * @returns The rounded amount.
 */
export const halfEven: DivideOperation = (amount, factor) => {
  const rounded = halfUp(amount, factor);

  if (!isHalf(amount, factor)) {
    return rounded;
  }

  return isEven(rounded) ? rounded : rounded - 1n;
};
