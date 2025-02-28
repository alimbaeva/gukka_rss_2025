import { push } from './push'

export function slice<T>(array: T[], start: number, end: undefined | number = undefined): T[] {
  const result: T[] = [];
  const length: number = array.length;

  let currentStart: number = start < 0 ? Math.max(length + start, 0) : Math.min(start, length);
  let currentEnd: number = end === undefined ? length : (end < 0 ? Math.max(length + end, 0) : Math.min(end, length));

  for (let i = currentStart; i < currentEnd; i++) {
    push(result, array[i])
  }
  return result;
}
