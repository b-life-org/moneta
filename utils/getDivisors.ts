export const getDivisors = (bases: readonly number[]) => {
  return bases.reduce<readonly number[]>((divisors, _, i) => {
    const divisor = bases.slice(i).reduce((acc, curr) => acc * curr);

    return [...divisors, divisor];
  }, []);
};
