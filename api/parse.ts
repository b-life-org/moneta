import { bigIntReviver } from "../helpers/JSONbigint.ts";
import { Moneta } from "../mod.ts";
import { Currency } from "../types/types.ts";

export const parse = (text:string):Moneta => {
    const json =  JSON.parse(text, bigIntReviver)
    const amount = json?.amount || 0n;
    const currency = json.currency as Currency;
    const scale = json?.scale || 0

    return new Moneta({amount, currency, scale})
  }