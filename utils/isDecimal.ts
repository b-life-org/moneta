import { Moneta } from "../mod.ts";

export const isDecimal = (m: Moneta):boolean =>{
  const currency = m.currency;
  const base = currency.base;

 return base === 10
}
