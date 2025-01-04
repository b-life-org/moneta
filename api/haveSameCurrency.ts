import type { Moneta } from "../mod.ts";
import { computeBase } from "../utils/index.ts";

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
