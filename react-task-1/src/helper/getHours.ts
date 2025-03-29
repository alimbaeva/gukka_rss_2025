export const getHours = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const minute = minutes % 60;

  return `${String(hours).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
};
