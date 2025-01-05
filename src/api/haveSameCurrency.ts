import type { Moneta } from "../../mod.ts";
import { computeBase } from "../utils/index.ts";

/**
 * Check whether a set of Moneta objects have the same currency.
 * @param monetaObjects Moneta objects in a array
 * @returns boolean
 * @example // Compare two objects with the same currency
 * import { Moneta, haveSameCurrency, USD } from "jsr:@b-life-org/moneta"
 *
 * const d1 = new Moneta({ amount: 1000n, currency: USD });
 * const d2 = new Moneta({ amount: 2000n, currency: USD });
 *
 * haveSameCurrency([d1, d2]); // true
 *
 * @example // Compare two objects with different currencies
 * import { Moneta, haveSameCurrency, USD, EUR } from "jsr:@b-life-org/moneta"
 *
 * const d1 = new Moneta({ amount: 1000n, currency: USD });
 * const d2 = new Moneta({ amount: 10000n, currency: EUR });
 *
 * haveSameCurrency([d1, d2]); // false
 */
export const haveSameCurrency = (
  monetaObjects: ReadonlyArray<Moneta>,
): boolean => {
  const [firstMoneta, ...otherMonetas] = monetaObjects;
  const { currency: comparator } = firstMoneta;
  const comparatorBase = computeBase(comparator.base);

  return otherMonetas.every((d) => {
    const { currency: subject } = d;
    const subjectBase = computeBase(subject.base);

    return (
      subject.code === comparator.code &&
      subjectBase === comparatorBase &&
      subject.exponent === comparator.exponent
    );
  });
};
