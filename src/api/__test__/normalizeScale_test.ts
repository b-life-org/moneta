import { assertEquals } from "@std/assert";
import { USD } from "../../currencies/index.ts";
import { Moneta, normalizeScale, toSnapshot } from "../../../mod.ts";

Deno.test("normalizeScale: number", async (t) => {
  await t.step(
    "returns an array of Moneta objects with normalized scale and converted amount",
    () => {
      const d1 = new Moneta({ amount: 100n, currency: USD, scale: 2 });
      const d2 = new Moneta({ amount: 1000n, currency: USD, scale: 3 });

      const [firstDineroObject, secondDineroObject] = normalizeScale([d1, d2]);

      assertEquals(toSnapshot(firstDineroObject), {
        amount: 1000n,
        currency: USD,
        scale: 3,
      });
      assertEquals(toSnapshot(secondDineroObject), {
        amount: 1000n,
        currency: USD,
        scale: 3,
      });
    },
  );
});
