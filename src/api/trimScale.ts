import { Moneta } from "../../mod.ts";
import { computeBase, countTrailingZeros } from "../utils/index.ts";
import { transformScale } from "./transformScale.ts";

export type TrimScaleParams = readonly [monetaObject: Moneta];

/**
 * Trim a Moneta object's scale as much as possible, down to the currency exponent.
 * @param monetaObject Moneta object to trim.
 * @returns Moneta object
 * @example // Trim an object down to its currency exponent's scale
 * import { Moneta, trimScale, EUR } from "jsr:@b-life-org/moneta"
 * const m = new Moneta({ amount: 500000n, currency: EUR, scale: 5 });
 *
 * trimScale(m); // a Moneta object with amount 500 and scale 2
 *
 * @example // Trim an object down to the safest possible scale
 * import { Moneta, trimScale, EUR } from "jsr:@b-life-org/moneta"
 *
 * const d = new Moneta({ amount: 99950, currency: USD, scale: 4 });
 *
 * trimScale(d); // a Dinero object with amount 9995 and scale 3
 */
export const trimScale = (...[monetaObject]: TrimScaleParams): Moneta => {
  const { amount, currency, scale } = monetaObject;
  const base = computeBase(currency.base);

  const trailingZerosLength = countTrailingZeros(amount, base);
  const difference = scale - trailingZerosLength;
  const newScale = Math.max(difference, currency.exponent);

  if (newScale === scale) {
    return monetaObject;
  }

  return transformScale(monetaObject, newScale);
};
