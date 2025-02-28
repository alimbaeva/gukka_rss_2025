export function isCustomArray(obj: unknown): obj is [string, unknown] {
  if (obj && typeof obj === 'object') return obj.constructor === Array;
  return false
}
