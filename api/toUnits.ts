import { Moneta } from "../mod.ts";
import { getDivisors, isArray } from "../utils/index.ts";
import { Transformer  } from "../types/types.ts";

export type ToUnitsParams< TOutput> = readonly [
    monetaObject: Moneta,
    transformer?: Transformer<TOutput, readonly bigint[]>
  ];

export const toUnits= <TOutput>(
    ...[monetaObject, transformer]: ToUnitsParams<TOutput>
  ) => {
    const { amount, currency, scale } = monetaObject;

    const bases = isArray(currency.base) ? currency.base : [currency.base];
    const divisors = getDivisors(bases.map((base) => base ** scale));
    const value = divisors.reduce<readonly bigint[]>(
      (amounts, divisor, index) => {
        const amountLeft = amounts[index];

        const quotient = amountLeft / BigInt(divisor);
        const remainder = amountLeft % BigInt(divisor);

        return [...amounts.filter((_, i) => i !== index), quotient, remainder];
      },
      [amount]
    );

    if (!transformer) {
      return value;
    }

    return transformer({ value, currency });
  };
