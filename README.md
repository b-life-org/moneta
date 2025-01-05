<p align="center">
  Moneta JS
</p>

<p align="center">
Moneta lets you create, calculate, and format money safely in JavaScript and
TypeScript. Amount type is only bigint.

Fork from v2.dinerojs.com/

</p>

---

## 📦 Install

```sh
deno add jsr:@b-life-org/moneta

or

npx jsr add @b-life-org/moneta
```

## ⚡️ Quick start

`Moneta` objects are minimal. Every function in `Moneta` is side-effect free,
allowing you only to bundle exactly what you use.

All amounts use are in `bigint`

```ts
import { add, EUR, Moneta } from "jsr:@b-life-org/moneta";

const d1 = new Moneta({ amount: 300n, currency: EUR });
const d2 = new Moneta({ amount: 200n, currency: EUR });

add(d1, d2); // a Moneta object with amount 500
```

## Money in javascript

Money is complex, and the primitives of the language aren't enough to properly
represent it. Moneta is a JavaScript library that lets you express monetary
values, but also perform mutations, conversions, comparisons, formatting, and
overall make money manipulation easier and safer in your application.

## Compatibility

Moneta objects have the same structure as Dinero.js. Functions are also the
same. Switching from one to another is easier.

## Links

- [Dinero.js](https://v2.dinerojs.com/docs)
- [Martin Fowler's money pattern](https://martinfowler.com/eaaCatalog/money.html)
- [Money PHP](https://www.moneyphp.org/en/stable/#)

## 📜 License

[MIT](LICENSE)
