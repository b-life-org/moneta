import { Moneta } from "../../mod.ts";
import { isDecimal } from "./isDecimal.ts";

/**
 * Print a Moneta object as a string with it currency and amount with decimal.
 * @param m Moneta object to print.
 * @returns
 */
export const toString = (m: Moneta): string => {
  const currency = m.currency;

  if (isDecimal(m)) {
    return `${currency.code} ${m.toDecimal()}`;
  } else {
    return `${currency.code} ${m.amount.toString()}`;
  }
};
