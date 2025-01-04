import { DivideOperation } from "../types/types.ts";
import { absolute } from "../utils/absolute.ts";
import { isHalf } from "../utils/isHalf.ts";
import { down, up  } from "./index.ts";


/**
 * Divide and round towards "nearest neighbor" unless both neighbors are
 * equidistant, in which case round up.
 *
 * Rounding up happens when:
 * - The quotient is half (e.g., -1.5, 1.5).
 * - The quotient is positive and greater than half (e.g., 1.6).
 * - The quotient is negative and less than half (e.g., -1.4).
 *
 * @param amount - The amount to divide.
 * @param factor - The factor to divide by.
 *
 * @returns The rounded amount.
 */
export const halfUp: DivideOperation = (amount, factor) => {
  const zero = 0n;
  const factorBigInt = BigInt(factor)
  const remainder = absolute(amount % factorBigInt);
  const difference = factorBigInt - remainder;
  const isLessThanHalf = difference> remainder;
  const isPositive = amount> zero;

  if (
    isHalf(amount, factor) ||
    (isPositive && !isLessThanHalf) ||
    (!isPositive && isLessThanHalf)
  ) {
    return up(amount, factor);
  }

  return down(amount, factor);
};
