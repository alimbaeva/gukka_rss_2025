export function push<T>(array: T[], ...items: T[]): number {
  const length: number = array.length;

  for (let i = 0; i < items.length; i++) {
    array[length + i] = items[i]
  }
  return array.length;
}
