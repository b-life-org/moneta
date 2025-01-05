/**
 * Replacer BigInt with string for JSON.stringify
 * @param _key
 * @param value
 * @returns
 */
export function bigIntReplacer(_key: string, value: unknown): unknown {
  if (typeof value === "bigint") {
    return value.toString() + "n";
  }
  return value;
}

/**
 * Revive BigInt from string for JSON.parse
 * @param _key
 * @param value
 * @returns
 */
export function bigIntReviver(_key: string, value: unknown): unknown {
  if (typeof value === "string" && /^\d+n$/.test(value)) {
    return BigInt(value.slice(0, -1));
  }
  return value;
}
