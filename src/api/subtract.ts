import { UNEQUAL_CURRENCIES_MESSAGE } from "../../messages.ts";
import { Moneta } from "../../mod.ts";
import { assert } from "../helpers/assert.ts";
import { normalizeScale } from "./normalizeScale.ts";
import { haveSameCurrency } from "./index.ts";

/**
 * Subtract two Moneta objects.
 *
 * You can only subtract objects that share the same currency. The function also normalizes objects to the same scale (the highest) before subtracting them.
 * @param minuend The Moneta object to subtract from.
 * @param subtrahend The Moneta object to subtract from.
 * @returns a new Moneta object
 * @example // Subtract more than two objects
 * import { Moneta, subtract, USD } from "jsr:@b-life-org/moneta"
 *
 * const d1 = new Moneta({ amount: 400n, currency: USD });
 * const d2 = new Moneta({ amount: 200n, currency: USD });
 * const d3 = new Moneta({ amount: 100n, currency: USD });
 *
 * const subtractMany = (subtrahends: Moneta[]) => subtrahends.reduce(subtract);
 *
 * subtractMany([d1, d2, d3]); // a Moneta object with amount 100
 * @example // Subtract objects with a different scale
 * import { Moneta, subtract, USD } from "jsr:@b-life-org/moneta"
 *
 * const d1 = new Moneta({ amount: 500n, currency: USD });
 * const d2 = new Moneta({ amount: 1000n, currency: USD, scale: 3 });
 *
 * subtract(d1, d2); // a Moneta object with amount 4000 and scale 3
 */
export const subtract = (minuend: Moneta, subtrahend: Moneta): Moneta => {
  assert(haveSameCurrency([minuend, subtrahend]), UNEQUAL_CURRENCIES_MESSAGE);

  const [newMinuend, newSubtrahend] = normalizeScale([minuend, subtrahend]);
  const amount = newMinuend.amount - newSubtrahend.amount;
  const currency = newMinuend.currency;
  const scale = newMinuend.scale;

  return new Moneta({ amount, currency, scale });
};
