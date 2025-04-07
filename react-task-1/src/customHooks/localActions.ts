export function saveToLocalStorage<T>(key: string, value: T): void {
  const stringValue = JSON.stringify(value);
  localStorage.setItem(key, stringValue);
}

export function getFromLocalStorage<T>(key: string): T | undefined {
  const value = localStorage.getItem(key);
  if (value) {
    try {
      return JSON.parse(value) as T;
    } catch (error) {
      console.error('Error when parsing JSON from localStorage:', error);
      return undefined;
    }
  }
  return undefined;
}

export function removeFromLocalStorage(key: string): void {
  localStorage.removeItem(key);
}
