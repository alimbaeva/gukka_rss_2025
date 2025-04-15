import Card from '../cards/Card';
import { useEffect } from 'react';
import { useSearch } from '../context/useSearch';
import useSearchFilter from '../../customHooks/useSearchFilter';
import EmptyCoursesList from '../empty/EmptyCoursesList';
import { CoursesListType } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getAuthorsThunk } from '../../store/thunks/authorsThunks';
import {
  deleteCourseThunk,
  getCoursesThunk,
} from '../../store/thunks/coursesThunks';

const CoursesList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { courseData, isLoadingCourses } = useSelector(
    (state: RootState) => state.coursesReducer
  );

  const { searchQuery, isSearch } = useSearch();

  const searchData = useSearchFilter({
    searchQuery,
    isSearch,
    courseData,
  });

  const deleteCourseId = async (id: string) => {
    try {
      const res = await dispatch(deleteCourseThunk(`${id}`));
      if (deleteCourseThunk.fulfilled.match(res)) {
        await dispatch(getCoursesThunk());
      }
    } catch (err) {
      console.error(err);
    }
  };

  const renderCards = (data: CoursesListType[]) => {
    return data.map((el) => (
      <Card key={el.id} {...el} removeItem={deleteCourseId} />
    ));
  };

  useEffect(() => {
    dispatch(getAuthorsThunk());
    dispatch(getCoursesThunk());
  }, []);

  if (searchData.empty) return <p className="container">{searchData.empty}</p>;
  if (isLoadingCourses) return <p className="container">...louding</p>;
  if (!searchData.empty && !courseData.length) return <EmptyCoursesList />;

  return (
    <section className="cards-wrapper container">
      {courseData.length && !searchData.data.length && renderCards(courseData)}
      {searchData.data.length ? renderCards(searchData.data) : null}
    </section>
  );
};

export default CoursesList;
