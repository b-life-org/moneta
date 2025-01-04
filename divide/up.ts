import { DivideOperation } from "../types/types.ts";

/**
 * Divide and round up.
 *
 * Rounding up happens whenever the quotient is not an integer.
 *
 * @param amount - The amount to divide.
 * @param factor - The factor to divide by.
 * @param calculator - The calculator to use.
 *
 * @returns The rounded amount.
 */
export const up: DivideOperation = (amount, factor) => {
  const zero = 0n;
  const isPositive = amount> zero;
  const quotient = amount / BigInt(factor);
  const remainder = amount % BigInt(factor);
  const isInteger = remainder === zero;

  if (!isInteger && isPositive) {
    return quotient + 1n;
  }

  return quotient;
};