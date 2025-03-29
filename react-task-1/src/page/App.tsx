import HeadContent from '../components/content/HeadContent';
import CoursesList from '../components/coursesList/CoursesList';
import Header from '../components/header/Header';
import './app.scss';

const App = () => {
  return (
    <>
      <Header />
      <main className="main">
        <HeadContent />
        <CoursesList />
      </main>
    </>
  );
};

export default App;
