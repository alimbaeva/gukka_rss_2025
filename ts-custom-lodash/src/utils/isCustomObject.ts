type CustomObject<T> = Record<string, T>;

export function isCustomObject<T>(obj: unknown): obj is CustomObject<T> {
  if (obj && typeof obj === 'object') return Object.getPrototypeOf(obj) === Object.prototype;
  return false;
}
