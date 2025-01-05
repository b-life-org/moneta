import { DivideOperation } from "../types/types.ts";
import { absolute } from "../utils/absolute.ts";
import { isHalf } from "../utils/isHalf.ts";
import { sign } from "../utils/sign.ts";
import { halfUp, up } from "./index.ts";

/**
 * Divide and round towards "nearest neighbor" unless both neighbors are
 * equidistant, in which case round away from zero.
 *
 * @param amount - The amount to divide.
 * @param factor - The factor to divide by.
 *
 * @returns The rounded amount.
 */
export const halfAwayFromZero: DivideOperation = (
  amount,
  factor,
) => {
  if (!isHalf(amount, factor)) {
    return halfUp(amount, factor);
  }

  return sign(amount) * up(absolute(amount), factor);
};
