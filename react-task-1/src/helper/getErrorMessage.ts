import type { FieldErrors } from 'react-hook-form';

export const getErrorMessage = (
  errors: FieldErrors,
  forInput: string | number | symbol
) => {
  const message = errors[String(forInput)]?.message;
  return typeof message === 'string' ? message : undefined;
};
