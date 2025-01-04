import { Moneta } from "../mod.ts";

/**
 * Same as toJSON
 * Function to be compatible with dinero.js
 * @param montetaObject
 * @returns
 */
export const toSnapshot = (montetaObject: Moneta) => {
  return {
    amount: montetaObject.amount,
    currency: montetaObject.currency,
    scale: montetaObject.scale,
  };
};
