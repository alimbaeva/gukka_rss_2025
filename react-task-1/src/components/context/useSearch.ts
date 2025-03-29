import { useContext } from 'react';
import Context, { ContextType } from './Context';

export const useSearch = (): ContextType => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('use must be used within a Provider');
  }
  return context;
};
