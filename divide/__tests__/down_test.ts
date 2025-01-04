import { assertEquals } from "@std/assert";
import { down } from "../index.ts";
import * as fc from "npm:fast-check";

Deno.test("down - decimal factors", async (t) => {
  await t.step("does not round with a positive integer quotient", () => {
    assertEquals(down(20n, 10), 2n);
  });

  await t.step("does not round with a negative integer quotient", () => {
    assertEquals(down(-20n, 10), -2n);
  });

  await t.step("does not round with a zero quotient", () => {
    assertEquals(down(0n, 10), 0n);
  });

  await t.step("rounds down with a positive half quotient", () => {
    assertEquals(down(15n, 10), 1n);
  });

  await t.step("rounds down with a negative half quotient", () => {
    assertEquals(down(-15n, 10), -2n);
  });

  await t.step("rounds down with any positive float quotient", () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 9 }), (a) => {
        assertEquals(down(BigInt(a), 10), 0n);
      }),
    );
  });

  await t.step("rounds down with any negative float quotient", () => {
    fc.assert(
      fc.property(fc.integer({ min: -9, max: -1 }), (a) => {
        assertEquals(down(BigInt(a), 10), -1n);
      }),
    );
  });
});

Deno.test("down - non-decimal factors", async (t) => {
  await t.step("does not round with a positive integer quotient", () => {
    assertEquals(down(20n, 5), 4n);
  });

  await t.step("does not round with a negative integer quotient", () => {
    assertEquals(down(-20n, 5), -4n);
  });

  await t.step("does not round with a zero quotient", () => {
    assertEquals(down(0n, 5), 0n);
  });

  await t.step("rounds down with a positive half quotient", () => {
    assertEquals(down(3n, 2), 1n);
  });

  await t.step("rounds down with a negative half quotient", () => {
    assertEquals(down(-3n, 2), -2n);
  });

  await t.step("rounds down with any positive float", () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 4 }), (a) => {
        assertEquals(down(BigInt(a), 5), 0n);
      }),
    );
  });

  await t.step("rounds down with any negative float", () => {
    fc.assert(
      fc.property(fc.integer({ min: -4, max: -1 }), (a) => {
        assertEquals(down(BigInt(a), 5), -1n);
      }),
    );
  });
});
