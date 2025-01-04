import { Moneta } from "../mod.ts";
import { computeBase, countTrailingZeros } from "../utils/index.ts";
import { transformScale } from "./transformScale.ts";

export type TrimScaleParams = readonly [monetaObject: Moneta];

/**
 * Trim a Moneta object's scale as much as possible, down to the currency exponent.
 * @param monetaObject Moneta object to trim.
 * @returns Moneta object
 * @example Trim an object down to its currency exponent's scale
 * const m = new Moneta({ amount: 500000n, currency: EUR, scale: 5 });

 console.log(trimScale(m)); // a Moneta object with amount 500 and scale 2
 */
export const trimScale = (...[monetaObject]: TrimScaleParams) => {
  const { amount, currency, scale } = monetaObject;
  const base = computeBase(currency.base);

  const trailingZerosLength = countTrailingZeros(amount, base);
  const difference = scale - trailingZerosLength;
  const newScale = Math.max(difference, currency.exponent);

  console.log("newScale", trailingZerosLength, newScale, scale, difference);

  if (newScale === scale) {
    return monetaObject;
  }
  console.log("newScale", newScale);
  return transformScale(monetaObject, newScale);
};
