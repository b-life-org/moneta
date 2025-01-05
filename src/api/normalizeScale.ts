import { Moneta } from "../../mod.ts";
import { transformScale } from "./transformScale.ts";

export type NormalizeScaleParams = readonly [
  monetaObjects: ReadonlyArray<Moneta>,
];

/**
 * Normalize a set of Moneta objects to the highest scale of the set.
 *
 * Normalizing to a higher scale means that the internal amount value increases by orders of magnitude.
 *
 * @param monetaObjects Moneta objects in a array to normalize
 * @returns
 * @example // Normalize objects to the same scale
 *
 * import { Moneta, normalizeScale, USD } from "jsr:@b-life-org/moneta"
 *
 * const d1 = new Moneta({ amount: 100n, currency: USD, scale: 2 });
 * const d2 = new Moneta({ amount: 2000n, currency: USD, scale: 3 });
 *
 * const [one, two] = normalizeScale([d1, d2]);
 *
 * one; // a Moneta object with amount 1000 and scale 3
 * two; // a Moneta object with amount 2000 and scale 3
 */
export const normalizeScale = (
  ...[monetaObjects]: NormalizeScaleParams
): Moneta[] => {
  const highestScale = monetaObjects.reduce((highest, current) => {
    return Math.max(highest, current.scale);
  }, 0);

  return monetaObjects.map((d) => {
    const scale = d.scale;

    return scale !== highestScale ? transformScale(d, highestScale) : d;
  });
};
