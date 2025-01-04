import { UNEQUAL_CURRENCIES_MESSAGE } from "../messages.ts";
import { Moneta } from "../mod.ts";
import { assert } from "../helpers/assert.ts";
import { normalizeScale } from "./normalizeScale.ts";
import { haveSameCurrency } from "./index.ts";

/**
 * Subtract 2 Moneta object
 * @param minuend Moneta object
 * @param subtrahend Moneta object to subtract
 * @returns a new Moneta object
 */
export const subtract = (minuend: Moneta, subtrahend: Moneta): Moneta => {
  assert(haveSameCurrency([minuend, subtrahend]), UNEQUAL_CURRENCIES_MESSAGE);

  const [newMinuend, newSubtrahend] = normalizeScale([minuend, subtrahend]);
  const amount = newMinuend.amount - newSubtrahend.amount;
  const currency = newMinuend.currency;
  const scale = newMinuend.scale;

  return new Moneta({ amount, currency, scale });
};