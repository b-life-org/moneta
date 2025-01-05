import { assertEquals } from "@std/assert";
import { up } from "../index.ts";
import * as fc from "npm:fast-check";

Deno.test("up - decimal factors", async (t) => {
  await t.step("does not round with a positive integer quotient", () => {
    assertEquals(up(20n, 10), 2n);
  });

  await t.step("does not round with a negative integer quotient", () => {
    assertEquals(up(-20n, 10), -2n);
  });

  await t.step("does not round with a zero quotient", () => {
    assertEquals(up(0n, 10), 0n);
  });

  await t.step("rounds up with a positive half quotient", () => {
    assertEquals(up(15n, 10), 2n);
  });

  await t.step("rounds up with a negative half quotient", () => {
    assertEquals(up(-15n, 10), -1n);
  });

  await t.step("rounds up with any positive float quotient", () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 9 }), (a) => {
        assertEquals(up(BigInt(a), 10), 1n);
      }),
    );
  });

  await t.step("rounds up with any negative float quotient", () => {
    fc.assert(
      fc.property(fc.integer({ min: -9, max: -1 }), (a) => {
        assertEquals(up(BigInt(a), 10), 0n);
      }),
    );
  });
});

Deno.test("up - non-decimal factors", async (t) => {
  await t.step("does not round with a positive integer quotient", () => {
    assertEquals(up(20n, 5), 4n);
  });

  await t.step("does not round with a negative integer quotient", () => {
    assertEquals(up(-20n, 5), -4n);
  });

  await t.step("does not round with a zero quotient", () => {
    assertEquals(up(0n, 5), 0n);
  });

  await t.step("rounds up with a positive half quotient", () => {
    assertEquals(up(3n, 2), 2n);
  });

  await t.step("rounds up with a negative half quotient", () => {
    assertEquals(up(-3n, 2), -1n);
  });

  await t.step("rounds up with any positive float quotient", () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 4 }), (a) => {
        assertEquals(up(BigInt(a), 5), 1n);
      }),
    );
  });

  await t.step("rounds up with any negative float quotient", () => {
    fc.assert(
      fc.property(fc.integer({ min: -4, max: -1 }), (a) => {
        assertEquals(up(BigInt(a), 5), -0n);
      }),
    );
  });
});
