import { EUR } from "../currencies/eur.ts";
import type { Currency, Formatter } from "../types/types.ts";
import { toDecimal } from "../api/toDecimal.ts";
import { toString } from "../utils/toString.ts";
import { bigIntReplacer } from "./JSONbigint.ts";
import { toSnapshot } from "../api/index.ts";

/**
 * When scale is different from 0, it overrides exponent of currency
 */
export class Moneta {
  readonly amount: bigint;
  readonly currency: Currency;
  readonly scale: number;
  readonly formatter: Formatter ;
  

  // Normal signature with defaults
    constructor({ amount = 0n, currency = EUR, scale = currency.exponent }: { amount?: bigint; currency?: Currency; scale?: number }) {
    this.amount = amount;
    this.currency = currency;
    this.scale = scale;
    this.formatter = {
      toNumber: Number,
      toString: String,
    };
  }

  toDecimal() {
    return toDecimal(this);
  }

  toString() {
    return toString(this);
  }

  toJSON():string{
    return JSON.stringify(toSnapshot(this), bigIntReplacer);
  }
}
