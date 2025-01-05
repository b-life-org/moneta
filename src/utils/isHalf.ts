import { absolute } from "./absolute.ts";

/**
 * is Half ie same distance between two integers
 * @param input
 * @param total
 * @returns boolean
 */
export const isHalf = (input: bigint, total: number): boolean => {
  const totalBigInt = BigInt(total);
  const remainder = absolute(input % totalBigInt);
  const difference = totalBigInt - remainder;

  return difference === remainder;
};
