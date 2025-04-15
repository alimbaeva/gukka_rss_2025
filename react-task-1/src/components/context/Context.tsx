import { createContext, ReactNode, FC, useState, useEffect } from 'react';
import { getFromLocalStorage } from '../../customHooks/localActions';

export interface UserType {
  name: string;
  accessToken: string;
}
export interface ContextType {
  searchQuery: string;
  isSearch: boolean;
  userData: UserType | undefined;
  setSearchQuery: (query: string) => void;
  setIsSearch: (arg: boolean) => void;
  setUserData: (arg: UserType | undefined) => void;
}

export interface ProviderProps {
  children: ReactNode;
}

const Context = createContext<ContextType | undefined>(undefined);

export const ProviderContext: FC<ProviderProps> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [userData, setUserData] = useState<UserType | undefined>(
    getFromLocalStorage('userData')
  );

  useEffect(() => {
    setIsSearch(() => false);
  }, [searchQuery]);

  return (
    <Context.Provider
      value={{
        searchQuery,
        isSearch,
        userData,
        setSearchQuery,
        setIsSearch,
        setUserData,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
