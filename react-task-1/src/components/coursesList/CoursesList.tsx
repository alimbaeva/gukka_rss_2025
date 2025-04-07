import Card from '../cards/Card';
import { useEffect, useState } from 'react';
import { useSearch } from '../context/useSearch';
import useSearchFilter from '../../customHooks/useSearchFilter';
import EmptyCoursesList from '../empty/EmptyCoursesList';
import { CoursesListType } from '../../types/types';
import { getCourses } from '../../helper/getCourse';
import { deleteCourse } from '../../api/courses';

const CoursesList = () => {
  const { searchQuery, isSearch, getAllAuth } = useSearch();
  const [courseData, setCourseData] = useState<CoursesListType[]>([]);
  const [louding, setLouding] = useState(true);

  const searchData = useSearchFilter({
    searchQuery,
    isSearch,
    courseData,
  });

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      if (data) setCourseData(data);
    } catch (err) {
      console.error(err);
      setCourseData([]);
    }
  };

  const deleteCourseId = async (id: string) => {
    try {
      const res = await deleteCourse(`courses/${id}`);
      if (res) fetchCourses();
    } catch (err) {
      console.error(err);
    }
  };

  const removeItem = (id: string) => {
    deleteCourseId(id);
  };

  const renderCards = (data: CoursesListType[]) => {
    return data.map((el) => (
      <Card key={el.id} {...el} removeItem={removeItem} />
    ));
  };

  useEffect(() => {
    fetchCourses();
    getAllAuth();
    setLouding(true);
    setTimeout(() => setLouding(false), 800);
  }, []);

  if (searchData.empty) return <p className="container">{searchData.empty}</p>;
  if (louding) return <p className="container">...louding</p>;
  if (!searchData.empty && !courseData.length) return <EmptyCoursesList />;

  return (
    <section className="cards-wrapper container">
      {courseData.length && !searchData.data.length && renderCards(courseData)}
      {searchData.data.length ? renderCards(searchData.data) : null}
    </section>
  );
};

export default CoursesList;
