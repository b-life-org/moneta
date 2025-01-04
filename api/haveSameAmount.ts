import type { Moneta } from "../mod.ts";
import { normalizeScale } from "./normalizeScale.ts";

export type HaveSameAmountParams = readonly [
  monetaObjects: ReadonlyArray<Moneta>,
];

export const haveSameAmount = (
  ...[monetaObjects]: HaveSameAmountParams
) => {
  const [firstMoneta, ...otherMonetas] = normalizeScale(monetaObjects);
  const { amount: comparatorAmount } = firstMoneta;

  return otherMonetas.every((d) => {
    const { amount: subjectAmount } = d;

    return subjectAmount === comparatorAmount;
  });
};
