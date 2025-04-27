import { AuthorsList } from '../types/types';

export const filterSelectAuth = (
  authorsId: string[],
  authorsSlise: AuthorsList[]
) => {
  const dataSelectAuth = authorsSlise.filter((el) => authorsId.includes(el.id));
  return dataSelectAuth;
};
