import { AuthorsList } from '../types/types';

export const filterSelectAuth = (
  authorsId: string[],
  authorsslise: AuthorsList[]
) => {
  const dataselectAyth = authorsslise.filter((el) => authorsId.includes(el.id));
  return dataselectAyth;
};
