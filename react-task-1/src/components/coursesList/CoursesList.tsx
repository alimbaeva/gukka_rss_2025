import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getAuthorsThunk } from '../../store/thunks/authorsThunks';
import {
  deleteCourseThunk,
  getCoursesThunk,
} from '../../store/thunks/coursesThunks';
import useSearchFilter from '../../hooks/useSearchFilter';
import { CoursesListType } from '../../types/types';
import Card from '../cards/Card';
import EmptyCoursesList from '../empty/EmptyCoursesList';

const CoursesList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { courseData, isLoadingCourses } = useSelector(
    (state: RootState) => state.courses
  );

  const searchData = useSearchFilter({ courseData });

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
  if (isLoadingCourses) return <p className="container">...loading</p>;
  if (!searchData.empty && !courseData.length) return <EmptyCoursesList />;

  return (
    <section className="cards-wrapper container">
      {courseData.length && !searchData.data.length && renderCards(courseData)}
      {searchData.data.length ? renderCards(searchData.data) : null}
    </section>
  );
};

export default CoursesList;
