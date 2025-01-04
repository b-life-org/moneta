import { Moneta } from "../mod.ts";
import { isDecimal } from "./isDecimal.ts";

export const toString = (m: Moneta):string =>{
  const currency = m.currency;

  if (isDecimal(m)) {
    return `${currency.code} ${m.toDecimal()}`;
  } else {
    return `${currency.code} ${m.amount.toString()}`;
  }
}