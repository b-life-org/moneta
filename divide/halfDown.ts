import { DivideOperation } from "../types/types.ts";
import { isHalf } from "../utils/isHalf.ts";
import { halfUp, down  } from "./index.ts";

/**
 * Divide and round towards "nearest neighbor" unless both neighbors are
 * equidistant, in which case round down.
 *
 * Rounding down happens when:
 * - The quotient is half (e.g., -1.5, 1.5).
 * - The quotient is positive and less than half (e.g., 1.4).
 * - The quotient is negative and greater than half (e.g., -1.6).
 *
 * @param amount - The amount to divide.
 * @param factor - The factor to divide by.
 *
 * @returns The rounded amount.
 */
export const halfDown: DivideOperation = (amount, factor) => {

  if (isHalf(amount, factor)) {
    return down(amount, factor);
  }

  return halfUp(amount, factor);
};
