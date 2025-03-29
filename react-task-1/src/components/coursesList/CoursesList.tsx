import Card from '../cards/Card';
import {
  mockCurrentCoursesList,
  mockedCoursesList,
} from '../../mockCoursesList';
import { useEffect, useState } from 'react';
import { useSearch } from '../context/useSearch';
import useSearchFilter from '../../customHooks/useSearchFilter';
import { CardProps, CoursesListType } from '../../types/types';
import EmptyCoursesList from '../empty/EmptyCoursesList';
import CourseInfo from '../courseInfo/CourseInfo';

const CoursesList = () => {
  const { searchQuery, isSearch, isAdd, moreInfoId } = useSearch();
  const [courseData, setCourseData] = useState(mockCurrentCoursesList ?? []);
  const [moreInfoCourse, setMoreInfoCourse] = useState<CoursesListType | null>(
    null
  );

  const searchData = useSearchFilter({
    searchQuery,
    isSearch,
    courseData,
  });

  const removeItem = (id: string) => {
    const items = courseData.filter((el) => el.id !== id);
    setCourseData(items);
  };

  const renderCards = (data: CoursesListType[]) => {
    return data.map((el) => (
      <Card key={el.id} {...el} removeItem={removeItem} />
    ));
  };

  useEffect(() => {
    setCourseData(mockedCoursesList);
  }, [isAdd]);

  useEffect(() => {
    if (moreInfoId) {
      const items = courseData.filter((el) => el.id === moreInfoId);
      setMoreInfoCourse(items[0]);
    } else {
      setMoreInfoCourse(null);
    }
  }, [courseData, moreInfoId]);

  if (searchData.empty) return <p className="container">{searchData.empty}</p>;
  if (!searchData.empty && !courseData.length) return <EmptyCoursesList />;
  if (moreInfoId && moreInfoCourse) {
    return <CourseInfo {...(moreInfoCourse as CardProps)} />;
  }

  return (
    <section className="cards-wrapper container">
      {courseData.length && !searchData.data.length && renderCards(courseData)}
      {searchData.data.length ? renderCards(searchData.data) : null}
    </section>
  );
};

export default CoursesList;
