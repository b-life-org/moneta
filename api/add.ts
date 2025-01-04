import { UNEQUAL_CURRENCIES_MESSAGE } from "../messages.ts";
import { Moneta } from "../mod.ts";
import { assert } from "../helpers/assert.ts";
import { normalizeScale } from "./normalizeScale.ts";
import { haveSameCurrency } from "./index.ts";

/**
 * Add two Moneta object
 * @param m1 Moneta object
 * @param extras Moneta object, one or more object
 * @returns monata object
 * @example // To add many Moneta object
import { Moneta, add, USD } from "jsr:moneta"

const d1 = new Moneta({ amount: 300, currency: USD });
const d2 = new Moneta({ amount: 200, currency: USD });
const d3 = new Moneta({ amount: 100, currency: USD });

const addMany = (addends) => addends.reduce(add);

addMany([d1, d2, d3]); // a Moneta object with amount 600
 */
export const add = (augend: Moneta, addend: Moneta): Moneta => {
  const condition = haveSameCurrency([augend, addend]);
  assert(condition, UNEQUAL_CURRENCIES_MESSAGE);

  const [newAugend, newAddend] = normalizeScale([augend, addend]);
  const amount = newAugend.amount + newAddend.amount;
  const currency = newAugend.currency;
  const scale = newAugend.scale;

  return new Moneta({ amount, currency, scale });
};
