import { computeBase, Moneta } from "../../mod.ts";
import { DivideOperation } from "../types/types.ts";
import { down } from "../divide/down.ts";

export type TransformScaleParams = readonly [
  dineroObject: Moneta,
  newScale: number,
  divide?: DivideOperation,
];

/**
 * Transform a Dinero object to a new scale.
 *
 * When transforming to a higher scale, the internal amount value increases by orders of magnitude. If you're using the default Dinero.js implementation (with the number calculator), be careful not to exceed the minimum and maximum safe integers.
 *
 * When transforming to a smaller scale, the amount loses precision. By default, the function rounds down the amount. You can specify how to round by passing a custom divide function.
 *
 * For convenience, Dinero.js provides the following divide functions: up, down, halfUp, halfDown, halfOdd, halfEven (bankers rounding), halfTowardsZero, and halfAwayFromZero.
 * @param monetaObject The Moneta object to transform.
 * @param newScale The new scale to transform to.
 * @param divide A custom divide function.
 * @returns a new Moneta object
 * @example // Transform an object to a new scale
 * import { Moneta, transformScale, USD } from "jsr:@b-life-org/moneta"
 *
 * const d = new Moneta({ amount: 500n, currency: USD, scale: 2 });
 *
 * transformScale(d, 4); // a Moneta object with amount 50000 and scale 4
 *
 * @example // Pass a custom divide function
 * import { Moneta, transformScale, up, USD } from "jsr:@b-life-org/moneta"
 *
 * const d = new Moneta({ amount: 10455n, currency: USD, scale: 3 });
 *
 * transformScale(d, 2, up); // a Moneta object with amount 1046 and scale 2
 */
export const transformScale = (
  ...[monetaObject, newScale, divide]: TransformScaleParams
): Moneta => {
  const { amount, currency, scale } = monetaObject;

  const isLarger = newScale > scale;

  let newAmount = amount;
  const [a, b] = isLarger ? [newScale, scale] : [scale, newScale];
  const base = computeBase(currency.base);
  const factor = base ** (a - b);

  if (isLarger) {
    // multiply
    newAmount *= BigInt(factor);
  } else {
    // divide
    if (divide) {
      newAmount = divide(amount, factor);
    } else {
      newAmount = down(amount, factor);
    }
  }

  return new Moneta({
    amount: newAmount,
    currency,
    scale: newScale,
  });
};
