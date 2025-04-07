import { Routes, Route, Navigate } from 'react-router-dom';
import Header from '../components/header/Header';
import './app.scss';
import Courses from './courses/Courses';
import Login from './auth/Login';
import CourseActions from './courseActions/CourseActions';
import PrivateRoute from './PrivateRoute';
import { useSearch } from '../components/context/useSearch';
import CourseInfo from '../components/courseInfo/CourseInfo';
import NotFound from './404/NotFound';

const App = () => {
  const { userData } = useSearch();
  return (
    <>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={<Navigate to={userData ? '/courses' : '/login'} replace />}
          />
          <Route
            path="/courses"
            element={
              <PrivateRoute>
                <Courses />
              </PrivateRoute>
            }
          />
          <Route
            path="/courses/add"
            element={
              <PrivateRoute>
                <CourseActions />
              </PrivateRoute>
            }
          />
          <Route
            path="/courses/:id/edit"
            element={
              <PrivateRoute>
                <CourseActions />
              </PrivateRoute>
            }
          />
          <Route
            path="/courses/:id"
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
