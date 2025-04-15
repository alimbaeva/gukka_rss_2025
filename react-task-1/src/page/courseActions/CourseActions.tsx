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
import { useInitAuthors } from '../../customHooks/useInitAuthors';
import { useCourseDataFill } from '../../customHooks/useCourseDataFill';
import { useCourseEffects } from '../../customHooks/useCourseEffects';
import { useCourseSubmit } from '../../customHooks/useCourseSubmit';
import { useCourseForm } from '../../customHooks/useCourseForm';
import { coursesPath } from '../../constants/pathConstants';

const CourseActions = () => {
  const location = useLocation();
  const id = location.state?.id as string;
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const {
    authors: { authList, selectAuth, authors },
  } = useSelector((state: RootState) => state.authorsReducer) || {
    authors: {
      authList: [],
      selectAuth: [],
      authors: [],
    },
  };
  const { course, isLoadingCourses } =
    useSelector((state: RootState) => state.coursesReducer) || {};
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

  if (isLoadingCourses && id) return <p className="container">...louding</p>;

  return (
    <section className="container action-page">
      <h1 className="title-page">{!id ? 'Course Creat' : 'Edit Course'}</h1>
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
                {selectAuth.length ? (
                  <AuthorsList
                    title={'Course Authors'}
                    authList={selectAuth}
                    selects={true}
                  />
                ) : null}
              </div>
            </div>
            <AuthorsList title={'Authors List'} authList={authList} />
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
