import { Routes, Route, Navigate } from 'react-router-dom';
import './app.scss';
import { useSearch } from '../../components/context/useSearch';
import Header from '../../components/header/Header';
import Login from '../auth/Login';
import {
  addCoursePath,
  coursesPath,
  editCoursePath,
  loginCoursePath,
} from '../../constants/pathConstants';
import PrivateRoute from '../PrivateRoute';
import Courses from '../courses/Courses';
import CourseActions from '../courseActions/CourseActions';
import CourseInfo from '../../components/courseInfo/CourseInfo';
import NotFound from '../404/NotFound';

const App = () => {
  const { userData } = useSearch();
  return (
    <>
      <Header />
      <main className="main">
        <Routes>
          <Route path={loginCoursePath} element={<Login />} />
          <Route
            path="/"
            element={
              <Navigate to={userData ? coursesPath : loginCoursePath} replace />
            }
          />
          <Route
            path={coursesPath}
            element={
              <PrivateRoute>
                <Courses />
              </PrivateRoute>
            }
          />
          <Route
            path={`${coursesPath}${addCoursePath}`}
            element={
              <PrivateRoute>
                <CourseActions />
              </PrivateRoute>
            }
          />
          <Route
            path={`${coursesPath}/:id${editCoursePath}`}
            element={
              <PrivateRoute>
                <CourseActions />
              </PrivateRoute>
            }
          />
          <Route
            path={`${coursesPath}/:id`}
            element={
              <PrivateRoute>
                <CourseInfo />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
