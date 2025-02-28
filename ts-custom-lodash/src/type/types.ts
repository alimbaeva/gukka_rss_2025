export type KeyValueStore = Record<string, unknown>;
export type Predicate<T> = (value: T, index?: number, array?: T[]) => boolean | unknown;
export type PredicateObj<T> = (value: T[keyof T], key: string) => boolean;
export type KeyValuePairArray<T extends KeyValueStore> = [keyof T, T[keyof T]][];
export type CustomObject = KeyValueStore & { [key: string]: unknown };
export type CustomArray = [string, unknown];
export type PredicateFilter<T> = Predicate<T> | CustomObject | CustomArray | keyof T;
export type Filterable<T> = KeyValueStore;
export type ObjectMerge<T = unknown> = Record<string, T>;
export type ArrayMerge<T = unknown> = T[];

export type DeepPath<T extends KeyValueStore> = (
  obj: T | undefined,
  paths: string[],
  value: unknown,
  deep: number,
  result: unknown[],
  data: unknown
) => void;
