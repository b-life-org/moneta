import { Moneta } from "../../mod.ts";
import { haveSameAmount, haveSameCurrency } from "./index.ts";

/**
 * Are Moneta objects equal ?
 * @param m1 a Moneta object
 * @param m2 a Moneta object
 * @returns true if equal
 */
export const equal = (m1: Moneta, m2: Moneta): boolean => {
  return haveSameCurrency([m1, m2]) && haveSameAmount([m1, m2]);
};
