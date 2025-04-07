import { Navigate } from 'react-router-dom';
import { useSearch } from '../components/context/useSearch';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { userData } = useSearch();

  return userData ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
