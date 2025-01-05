/**
 * Absolute value of a bigint
 * @param input bigint
 * @returns absolute bigint
 */
export const absolute = (n: bigint): bigint => (n < 0n) ? -n : n;
