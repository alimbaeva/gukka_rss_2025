import { createContext, ReactNode, FC, useState, useEffect } from 'react';

export interface ContextType {
  searchQuery: string;
  isSearch: boolean;
  isAdd: boolean;
  moreInfoId: string;
  setSearchQuery: (query: string) => void;
  setIsSearch: (arg: boolean) => void;
  handleAddCours: () => void;
  setMoreInfoId: (arg: string) => void;
}

export interface ProviderProps {
  children: ReactNode;
}

const Context = createContext<ContextType | undefined>(undefined);

export const Provider: FC<ProviderProps> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [moreInfoId, setMoreInfoId] = useState('');

  const handleAddCours = () => {
    setIsAdd(() => !isAdd);
  };

  useEffect(() => {
    setIsSearch(() => false);
  }, [searchQuery]);

  return (
    <Context.Provider
      value={{
        searchQuery,
        isSearch,
        isAdd,
        moreInfoId,
        setSearchQuery,
        setIsSearch,
        handleAddCours,
        setMoreInfoId,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
