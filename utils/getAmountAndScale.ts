import { ScaledAmount } from "../types/types.ts";
import { isScaledAmount } from "./isScaledAmount.ts";

export function getAmountAndScale(value: ScaledAmount | number) {
  if (isScaledAmount(value)) {
    return { amount: value.amount, scale: value?.scale ?? 0 };
  }

  return { amount: BigInt(value), scale: 0 };
}
