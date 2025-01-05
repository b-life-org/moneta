import { DivideOperation } from "../types/types.ts";

/**
 * Divide and round down.
 *
 * Rounding down happens whenever the quotient is not an integer.
 *
 * @param amount - The amount to divide.
 * @param factor - The factor to divide by.
 *
 * @returns The rounded amount.
 */
export const down: DivideOperation = (amount, factor) => {
  const zero = 0n;
  const isPositive = amount > zero;
  const quotient = amount / BigInt(factor);
  const remainder = amount % BigInt(factor);
  const isInteger = remainder === zero;

  if (isPositive || isInteger) {
    return quotient;
  }

  return quotient - 1n;
};
