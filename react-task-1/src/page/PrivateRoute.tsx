import { Navigate } from 'react-router-dom';
import { useSearch } from '../components/context/useSearch';
import { loginCoursePath } from '../constants/pathConstants';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { userData } = useSearch();

  return userData ? children : <Navigate to={loginCoursePath} replace />;
};

export default PrivateRoute;
