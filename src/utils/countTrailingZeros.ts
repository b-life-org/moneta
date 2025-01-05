/**
 * Number of trailing zeros to add for a money amount
 * @param input amount
 * @param base currency base
 * @returns
 */
export const countTrailingZeros = (input: bigint, base: number): number => {
  if (0n === input) {
    return 0;
  }

  let i = 0;
  let temp = input;
  const baseBigInt = BigInt(base);

  while (temp % baseBigInt === 0n) {
    temp = temp / baseBigInt;
    i++;
  }

  return i;
};
