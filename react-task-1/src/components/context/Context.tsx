import { createContext, ReactNode, FC, useState, useEffect } from 'react';
import { getFromLocalStorage } from '../../customHooks/localActions';
import { AuthorsList as AuthorsListType } from '../../types/types';
import { createCourse, get, updateCourse } from '../../api/courses';

export interface UserType {
  name: string;
  accessToken: string;
}
export interface ContextType {
  searchQuery: string;
  isSearch: boolean;
  userData: UserType | undefined;
  authList: AuthorsListType[];
  selectAuth: AuthorsListType[];
  auths: AuthorsListType[];
  setSearchQuery: (query: string) => void;
  setIsSearch: (arg: boolean) => void;
  setUserData: (arg: UserType | undefined) => void;
  createAuth: (arg: string) => void;
  removeGlobalAuth: (arg: string) => void;
  removeSelectAuth: (arg: string) => void;
  addAuth: (arg: AuthorsListType) => void;
  filterSelectAuth: (arg: string[]) => Promise<AuthorsListType[]>;
  setSelectAuth: (arg: AuthorsListType[]) => void;
  getAllAuth: () => void;
}

export interface ProviderProps {
  children: ReactNode;
}

const Context = createContext<ContextType | undefined>(undefined);

export const Provider: FC<ProviderProps> = ({ children }) => {
  const [authList, setAuthList] = useState<AuthorsListType[]>([]);
  const [auths, setAuths] = useState<AuthorsListType[]>([]);
  const [selectAuth, setSelectAuth] = useState<AuthorsListType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [userData, setUserData] = useState<UserType | undefined>(
    getFromLocalStorage('userData')
  );

  const createAuth = async (auth: string) => {
    try {
      const res = await createCourse(`authors/`, {
        name: auth,
      });
      setAuthList([...authList, res]);
      setSelectAuth((prev) => Array.from(new Set([...prev, res])));
    } catch (err) {
      console.error(err);
    }
  };

  const getAllAuth = async () => {
    try {
      const results = await get(`authors/`);
      const filteredResults = results.filter(
        (author: { removed: boolean }) => !author.removed
      );
      setAuths(results);
      setAuthList(filteredResults);
    } catch (err) {
      console.error(err);
    }
  };

  const removeGlobalAuth = async (id: string) => {
    try {
      const res = await updateCourse(`authors/${id}`, { removed: true });
      if (!res) {
        console.error('Error data');
        return;
      }
      getAllAuth();
      setSelectAuth((prev) => prev.filter((el) => el.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const removeSelectAuth = async (id: string) => {
    setSelectAuth((prev) => prev.filter((el) => el.id !== id));
  };

  const filterSelectAuth = async (authorsId: string[]) => {
    const dataselectAyth = auths.filter((el) => authorsId.includes(el.id));
    return dataselectAyth;
  };

  const addAuth = (auth: AuthorsListType) => {
    setSelectAuth((prev) => Array.from(new Set([...prev, auth])));
  };

  useEffect(() => {
    setIsSearch(() => false);
  }, [searchQuery]);

  return (
    <Context.Provider
      value={{
        searchQuery,
        isSearch,
        userData,
        authList,
        selectAuth,
        auths,
        setSelectAuth,
        setSearchQuery,
        setIsSearch,
        setUserData,
        createAuth,
        getAllAuth,
        addAuth,
        removeGlobalAuth,
        removeSelectAuth,
        filterSelectAuth,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
