export function includes<T>(array: T[], value: unknown, fromIndex = 0): boolean {
  const startIndex: number = fromIndex < 0 ? array.length + fromIndex : fromIndex;

  for (let i = startIndex; i < array.length; i++) {
    if (array[i] === value) return true
  }
  return false;
}
