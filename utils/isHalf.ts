import { absolute } from "./absolute.ts";

export const isHalf = (input: bigint, total: number) => {
      const remainder = absolute(input % BigInt(total));
      const difference = BigInt(total) - remainder;
  
      return difference === remainder;
    };