import { Currency, Moneta } from "../../mod.ts";

/**
 * JSON snapshot of a Moneta object.
 * Snapshot can't be used to store Moneta objects in a database because amount is a bigint and can't be serialized.
 *
 * Use `toJSON()` to serialize a Moneta object to a JSON string.
 *
 * @param montetaObject  Moneta object to snapshot.
 * @see toJSON()
 * @returns
 */
export const toSnapshot = (montetaObject: Moneta): {
  amount: bigint;
  currency: Currency;
  scale: number;
} => {
  return {
    amount: montetaObject.amount,
    currency: montetaObject.currency,
    scale: montetaObject.scale,
  };
};
