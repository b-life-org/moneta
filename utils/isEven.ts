/**
 * Is Even for bigint
 * @param input bigint
 * @returns true if even
 */
export const isEven = (input: bigint): boolean => {
  const zero = 0n;
  const two = 2n;

  return (input % two) === zero;
};
