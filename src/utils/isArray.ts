/**
 * isArray function
 * @param maybeArray object to check
 * @returns
 */
export function isArray<TType>(
  maybeArray: TType | readonly TType[],
): maybeArray is readonly TType[] {
  return Array.isArray(maybeArray);
}
