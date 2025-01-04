import { assertEquals } from "@std/assert";
import { USD } from "../../currencies/index.ts";
import { multiply, toSnapshot } from "../index.ts";
import { Moneta } from "../../mod.ts";

// Number tests
Deno.test("multiply - number: multiplies positive Moneta objects", () => {
  const d = new Moneta({ amount: 400n, currency: USD });

  assertEquals(toSnapshot(multiply(d, 4)), {
    amount: 1600n,
    scale: 2,
    currency: USD,
  });
  assertEquals(toSnapshot(multiply(d, -1)), {
    amount: -400n,
    scale: 2,
    currency: USD,
  });
});

Deno.test("multiply - number: multiplies negative Moneta objects", () => {
  const d = new Moneta({ amount: -400n, currency: USD });

  assertEquals(toSnapshot(multiply(d, 4)), {
    amount: -1600n,
    scale: 2,
    currency: USD,
  });
  assertEquals(toSnapshot(multiply(d, 1)), {
    amount: -400n,
    scale: 2,
    currency: USD,
  });
});

Deno.test("multiply - number: converts multiplied amount to safest scale", () => {
  const d = new Moneta({ amount: 401n, currency: USD });

  const snapshot = toSnapshot(multiply(d, { amount: 2001n, scale: 3 }));
  assertEquals(snapshot, {
    amount: 802401n,
    scale: 5,
    currency: USD,
  });
});
