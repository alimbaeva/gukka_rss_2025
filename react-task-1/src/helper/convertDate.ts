export const convertDateToUTCDate = (timestamp: string): string => {
  const num = Number(timestamp);
  if (isNaN(num)) return 'Invalid timestamp';

  const date = new Date(num * 1000);

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();

  return `${day}.${month}.${year}`;
};
