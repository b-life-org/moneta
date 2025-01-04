import { Rate, ScaledAmount } from "../types/types.ts";

export function isScaledAmount(
  amount: Rate,
): amount is ScaledAmount {
  return (amount as ScaledAmount)?.hasOwnProperty("amount");
}
