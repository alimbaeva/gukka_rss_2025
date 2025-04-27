import { createContext, ReactNode, FC, useState, useEffect } from 'react';
import { getFromLocalStorage } from '../../hooks/localActions';

export interface UserType {
  name: string;
  accessToken: string;
}
export interface ContextType {
  searchQuery: string;
  triggerSearchMode: boolean;
  userData: UserType | undefined;
  setSearchQuery: (query: string) => void;
  setTriggerSearchMode: (arg: boolean) => void;
  setUserData: (arg: UserType | undefined) => void;
}

export interface ProviderProps {
  children: ReactNode;
}

const Context = createContext<ContextType | undefined>(undefined);

export const ProviderContext: FC<ProviderProps> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [triggerSearchMode, setTriggerSearchMode] = useState(false);
  const [userData, setUserData] = useState<UserType | undefined>(
    getFromLocalStorage('userData')
  );

  useEffect(() => {
    setTriggerSearchMode(() => false);
  }, [searchQuery]);

  return (
    <Context.Provider
      value={{
        searchQuery,
        triggerSearchMode,
        userData,
        setSearchQuery,
        setTriggerSearchMode,
        setUserData,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
