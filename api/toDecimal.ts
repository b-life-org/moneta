import { assert } from "../helpers/assert.ts";
import { NON_DECIMAL_CURRENCY_MESSAGE } from "../messages.ts";
import { Moneta } from "../mod.ts";
import { Formatter,Transformer  } from "../types/types.ts";
import { absolute, computeBase, isArray } from "../utils/index.ts";
import { toUnits } from "./toUnits.ts";

export type ToDecimalParams<TOutput> = readonly [
  monetaObject: Moneta,
  transformer?: Transformer<TOutput, string>
];


/**
 * Get the amount of a Moneta object in a stringified decimal representation.
*
* The number of decimal places depends on the scale of your object—or, when unspecified, the exponent of its currency.
 * @param m 
 * @returns 
 */
export const toDecimal = <TOutput>(
  ...[monetaObject, transformer]: ToDecimalParams<TOutput>
) => {
  const { currency, scale } = monetaObject;

  const base = computeBase(currency.base);

  const isMultiBase = isArray(currency.base);
  const isBaseTen = base % 10 === 0;
  const isDecimal = !isMultiBase && isBaseTen;

  assert(isDecimal, NON_DECIMAL_CURRENCY_MESSAGE);

  const units = toUnits<bigint>(monetaObject);

  const getDecimalFn = getDecimal(monetaObject.formatter);
  // deno-lint-ignore ban-ts-comment
  // @ts-ignore
  const value = getDecimalFn(units, scale);

  if (!transformer) {
    return value;
  }

  return transformer({ value, currency });
};

function getDecimal(formatter: Formatter) {

  return (units: readonly bigint[], scale: number) => {
    const whole = formatter.toString(units[0]);
    const fractional = formatter.toString(absolute(units[1]));

    const decimal = `${whole}.${fractional.padStart(scale, '0')}`;

    const leadsWithZero = units[0] === 0n;
    const isNegative = units[1]< 0n;

    // A leading negative zero is a special case because the `toString`
    // formatter won't preserve its negative sign (since 0 === -0).
    return leadsWithZero && isNegative ? `-${decimal}` : decimal;
  };
}
