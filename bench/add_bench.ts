import { add, createDinero, dinero } from "npm:dinero.js@2.0.0-alpha.14";
import { calculator } from "npm:@dinero.js/calculator-bigint@alpha";
import { add as add_moneta } from "../mod.ts";
import { USD } from "../currencies/usd.ts";
import { Moneta } from "../mod.ts";

const USD_Bigint = {
  code: "USD",
  base: 10n,
  exponent: 2n,
};

/*
    Add 2 objects
*/

Deno.bench("Moneta", { group: "add 2 objects" }, () => {
  const d1 = new Moneta({ amount: 500n, currency: USD });
  const d2 = new Moneta({ amount: 100n, currency: USD });

  add_moneta(d1, d2); // a Dinero object with amount 600
});

Deno.bench("Dinero.js : number", { group: "add 2 objects" }, () => {
  const d1 = dinero({ amount: 500, currency: USD });
  const d2 = dinero({ amount: 100, currency: USD });

  add(d1, d2); // a Dinero object with amount 600
});

Deno.bench("Dinero.js : bigint", { group: "add 2 objects" }, () => {
  const dineroBigint = createDinero({ calculator });

  const d1 = dineroBigint({ amount: 500n, currency: USD_Bigint });
  const d2 = dineroBigint({ amount: 100n, currency: USD_Bigint });

  add(d1, d2); // a Dinero object with amount `600n`
});

/*
    Add 1000 objects
*/

Deno.bench("Moneta", { group: "add 1000 objects" }, (b) => {
  const portfolio = [];
  // generate 1000 money objects
  for (let i = 0; i < 1000; i++) {
    portfolio.push({ amount: BigInt(i) * 500n, currency: USD });
  }

  b.start();
  let total = new Moneta({ amount: 0n, currency: USD });
  for (let i = 0; i < 1000; i++) {
    const d = new Moneta(portfolio[i]);
    total = add_moneta(total, d);
  }
  b.end();
});

Deno.bench("Dinero.js", { group: "add 1000 objects" }, (b) => {
  const portfolio = [];
  // generate 1000 money objects
  for (let i = 0; i < 1000; i++) {
    portfolio.push({ amount: i * 500, currency: USD });
  }

  b.start();
  let total = dinero({ amount: 0, currency: USD });
  for (let i = 0; i < 1000; i++) {
    const d = dinero(portfolio[i]);
    total = add(total, d);
  }
  b.end();
});
