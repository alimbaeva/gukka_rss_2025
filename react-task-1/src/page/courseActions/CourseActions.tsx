import MainInfo from '../../components/courseForm/MainInfo';
import Duration from '../../components/courseForm/Duration';
import AuthorsForm from '../../components/courseForm/AuthorsForm';
import AuthorsList from '../../components/courseForm/AuthorsList';
import FormButtons from '../../components/courseForm/FormButtons';
import './courseActions.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { clearCourse } from '../../store/slice/coursesSlice';
import { useInitAuthors } from '../../hooks/useInitAuthors';
import { useCourseDataFill } from '../../hooks/useCourseDataFill';
import { useCourseEffects } from '../../hooks/useCourseEffects';
import { useCourseSubmit } from '../../hooks/useCourseSubmit';
import { useCourseForm } from '../../hooks/useCourseForm';
import { coursesPath } from '../../constants/pathConstants';
import { COURSE_ACTIONS } from '../../constants/textConstants';

const CourseActions = () => {
  const location = useLocation();
  const id = location.state?.id as string;
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { authList, selectAuth, authors } = useSelector(
    (state: RootState) => state.authors
  ) || {
    authors: {
      authList: [],
      selectAuth: [],
      authors: [],
    },
  };
  const { course, isLoadingCourses } =
    useSelector((state: RootState) => state.courses) || {};
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    formState: { errors },
    duration,
    authorName,
  } = useCourseForm();

  const onSubmit = useCourseSubmit(id, selectAuth, reset);

  useCourseEffects(id, !!authList.length);
  useCourseDataFill(course, authors, reset);
  useInitAuthors(!!authList.length, !!id);

  const handleCloseForm = () => {
    reset();
    navigate(coursesPath, { replace: true });
    dispatch(clearCourse());
  };

  if (isLoadingCourses && id) return <p className="container">...loading</p>;

  return (
    <section className="container action-page">
      <h1 className="title-page">
        {!id ? COURSE_ACTIONS.CREATE : COURSE_ACTIONS.EDIT}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="action-form">
        <div className="item-form-wrapper">
          <MainInfo register={register} errors={errors} />
          <Duration
            register={register}
            errors={errors}
            descriptionValue={duration}
          />
          <div className="item-form">
            <div className="auth-create">
              <AuthorsForm
                register={register}
                errors={errors}
                authorName={authorName ?? ''}
                resetField={resetField}
              />
              <div className="course-authors">
                <h2>Course Authors</h2>
                {!selectAuth.length && <p>Author list empty</p>}
                {selectAuth.length && authors?.length ? (
                  <AuthorsList
                    title={'Course Authors'}
                    authList={selectAuth}
                    selects={true}
                  />
                ) : null}
              </div>
            </div>
            {authors?.length > 0 && (
              <AuthorsList title="Authors" authList={authors} />
            )}
          </div>
        </div>
        <FormButtons
          handleCloseForm={handleCloseForm}
          buttonText={id ? 'Update Course' : 'Create Course'}
        />
      </form>
    </section>
  );
};

export default CourseActions;
