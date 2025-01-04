import { assertEquals } from "@std/assert";
import * as fc from "npm:fast-check";
import { halfOdd } from "../index.ts";

Deno.test("decimal factors", async (t) => {
  await t.step("does not round with a positive integer quotient", () => {
    assertEquals(halfOdd(20n, 10), 2n);
  });

  await t.step("does not round with a negative integer quotient", () => {
    assertEquals(halfOdd(-20n, 10), -2n);
  });

  await t.step("does not round with a zero quotient", () => {
    assertEquals(halfOdd(0n, 10), 0n);
  });

  await t.step(
    "rounds to nearest odd integer with a positive half quotient rounding to an even integer",
    () => {
      assertEquals(halfOdd(15n, 10), 1n);
    },
  );

  await t.step(
    "rounds to nearest odd integer with a positive half quotient rounding to an odd integer",
    () => {
      assertEquals(halfOdd(25n, 10), 3n);
    },
  );

  await t.step(
    "rounds to nearest odd integer with a negative half quotient",
    () => {
      assertEquals(halfOdd(-25n, 10), -3n);
    },
  );

  await t.step("rounds up with any positive float quotient above half", () => {
    fc.assert(
      fc.property(fc.integer({ min: 6, max: 9 }), (a) => {
        assertEquals(halfOdd(BigInt(a), 10), 1n);
      }),
    );
  });

  await t.step("rounds down with any negative quotient above half", () => {
    fc.assert(
      fc.property(fc.integer({ min: -9, max: -6 }), (a) => {
        assertEquals(halfOdd(BigInt(a), 10), -1n);
      }),
    );
  });

  await t.step(
    "rounds down with any positive float quotient below half",
    () => {
      fc.assert(
        fc.property(fc.integer({ min: 1, max: 4 }), (a) => {
          assertEquals(halfOdd(BigInt(a), 10), 0n);
        }),
      );
    },
  );

  await t.step("rounds up with any negative float quotient below half", () => {
    fc.assert(
      fc.property(fc.integer({ min: -4, max: -1 }), (a) => {
        assertEquals(halfOdd(BigInt(a), 10), -0n);
      }),
    );
  });
});

Deno.test("non-decimal factors", async (t) => {
  await t.step("does not round with a positive integer quotient", () => {
    assertEquals(halfOdd(20n, 5), 4n);
  });

  await t.step("does not round with a negative integer quotient", () => {
    assertEquals(halfOdd(-20n, 5), -4n);
  });

  await t.step("does not round with a zero quotient", () => {
    assertEquals(halfOdd(0n, 5), 0n);
  });

  await t.step(
    "rounds to nearest odd integer with a positive half quotient rounding to an even integer",
    () => {
      assertEquals(halfOdd(3n, 2), 1n);
    },
  );

  await t.step(
    "rounds to nearest odd integer with a positive half quotient rounding to an odd integer",
    () => {
      assertEquals(halfOdd(5n, 2), 3n);
    },
  );

  await t.step(
    "rounds to nearest odd integer with a negative half quotient",
    () => {
      assertEquals(halfOdd(-5n, 2), -3n);
    },
  );

  await t.step("rounds up with any positive float quotient above half", () => {
    fc.assert(
      fc.property(fc.integer({ min: 3, max: 4 }), (a) => {
        assertEquals(halfOdd(BigInt(a), 5), 1n);
      }),
    );
  });

  await t.step("rounds down with any negative quotient above half", () => {
    fc.assert(
      fc.property(fc.integer({ min: -4, max: -3 }), (a) => {
        assertEquals(halfOdd(BigInt(a), 5), -1n);
      }),
    );
  });

  await t.step(
    "rounds down with any positive float quotient below half",
    () => {
      fc.assert(
        fc.property(fc.integer({ min: 1, max: 2 }), (a) => {
          assertEquals(halfOdd(BigInt(a), 5), 0n);
        }),
      );
    },
  );

  await t.step("rounds up with any negative float quotient below half", () => {
    fc.assert(
      fc.property(fc.integer({ min: -2, max: -1 }), (a) => {
        assertEquals(halfOdd(BigInt(a), 5), -0n);
      }),
    );
  });
});
