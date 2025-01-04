import { add } from "./api/add.ts";
import { allocate } from "./api/index.ts";
import { multiply } from "./api/multiply.ts";
import { parse } from "./api/parse.ts";
import { trimScale } from "./api/trimScale.ts";
import { EUR } from "./currencies/eur.ts";
import { Moneta } from "./mod.ts";

const d = new Moneta({ amount: 20n });
const dd = new Moneta({ amount: 100n, currency: EUR });

const a = add(dd, d);
console.log(a);
console.log(a.toDecimal());

const b = multiply(d, { amount: 100n, scale: 2 });
console.log(d.toDecimal());
console.log(b.toDecimal());
console.log(b);
console.log(b);
console.log(trimScale(b).toDecimal());

const c = add(a, b);
console.log(c);
console.log(c.toDecimal());

/*
const t=b.toJSON()
const p = parse(t)
console.log(p)


const ratios = [
  { amount: 505n, scale: 1 },
  { amount: 495n, scale: 1 },
]; // translates to ratios 50.5 and 49.5
const m = new Moneta({ amount: 100n, currency: EUR });

const [m1, m2] = allocate(m, ratios);

console.log(m1); // a Moneta object with amount 505 and scale 3
console.log(m2); // a Moneta object with amount 495 and scale 3



const m = new Moneta({ amount: 1003n, currency: EUR });

const [m1, m2, m3] = allocate(m, [0, 50, 50]);

console.log(m1); // a Dinero object with amount 0
console.log(m2); // a Dinero object with amount 502
console.log(m3); // a Dinero object with amount 501
*/
const m = new Moneta({ amount: 500000n, currency: EUR, scale: 5 });

console.log(trimScale(m)); // a Moneta object with amount 500 and scale 2

const dm = new Moneta({ amount: 400n, currency: EUR });

multiply(dm, 4); // a Moneta object with amount 1600
