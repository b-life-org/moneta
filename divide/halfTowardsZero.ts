import { DivideOperation } from "../types/types.ts";
import { absolute } from "../utils/absolute.ts";
import { isHalf } from "../utils/isHalf.ts";
import { sign } from "../utils/sign.ts";
import { down, halfUp } from "./index.ts";

/**
 * Divide and round towards "nearest neighbor" unless both neighbors are
 * equidistant, in which case round towards zero.
 *
 * @param amount - The amount to divide.
 * @param factor - The factor to divide by.
 *
 * @returns The rounded amount.
 */
export const halfTowardsZero: DivideOperation = (
  amount,
  factor,
) => {
  if (!isHalf(amount, factor)) {
    return halfUp(amount, factor);
  }

  return sign(amount) * down(absolute(amount), factor);
};
