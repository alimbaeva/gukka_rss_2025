import { mockedAuthorsList } from '../mockCoursesList';
import { AuthorsList } from '../types/types';

export const getAuth = (data: string[]) => {
  const dataCurent: AuthorsList[] = [];

  data.forEach((el) => {
    const author = mockedAuthorsList.find((auth) => auth.id === el);
    if (author) {
      dataCurent.push(author);
    }
  });

  return dataCurent;
};
