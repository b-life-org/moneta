import type { Moneta } from "../../mod.ts";
import { normalizeScale } from "./normalizeScale.ts";

export type HaveSameAmountParams = readonly [
  monetaObjects: ReadonlyArray<Moneta>,
];

/**
 * Check whether a set of Moneta objects have the same amount.
 * @param monetaObjects moneta objects in a array
 * @returns
 * @example // Compare two objects with different amount
 * import { Moneta, haveSameAmount, USD } from "jsr:@b-life-org/moneta"
 *
 * const d1 = new Moneta({ amount: 1000n, currency: USD });
 * const d2 = new Moneta({ amount: 2000n, currency: USD });
 *
 * haveSameAmount([d1, d2]); // false
 *
 * @example // Compare two objects with the same amount once normalized
 * import { Moneta, haveSameAmount, USD } from "jsr:@b-life-org/moneta"
 *
 * const d1 = new Moneta({ amount: 1000n, currency: USD });
 * const d2 = new Moneta({ amount: 10000n, currency: USD, scale: 3  });
 *
 * haveSameAmount([d1, d2]); // true
 */
export const haveSameAmount = (
  ...[monetaObjects]: HaveSameAmountParams
): boolean => {
  const [firstMoneta, ...otherMonetas] = normalizeScale(monetaObjects);
  const { amount: comparatorAmount } = firstMoneta;

  return otherMonetas.every((d) => {
    const { amount: subjectAmount } = d;

    return subjectAmount === comparatorAmount;
  });
};
