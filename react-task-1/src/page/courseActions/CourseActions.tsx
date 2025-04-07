import { SubmitHandler, useForm } from 'react-hook-form';
import MainInfo from '../../components/courseForm/MainInfo';
import Duration from '../../components/courseForm/Duration';
import AuthorsForm from '../../components/courseForm/AuthorsForm';
import AuthorsList from '../../components/courseForm/AuthorsList';
import FormButtons from '../../components/courseForm/FormButtons';
import { CourseData, CourseFormData } from '../../types/types';
import './courseActions.scss';
import { courseSchema } from '../../helper/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCourse, updateCourse } from '../../api/courses';
import { useSearch } from '../../components/context/useSearch';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getCourse } from '../../helper/getCourse';

const CourseActions = () => {
  const location = useLocation();
  const id = location.state?.id as string;
  const navigate = useNavigate();
  const { selectAuth, authList, setSelectAuth, getAllAuth, filterSelectAuth } =
    useSearch();

  const {
    register,
    handleSubmit,
    watch,
    resetField,
    reset,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    mode: 'onChange',
  });

  const [duration, authorName] = watch(['duration', 'authorName']);

  const onSubmit: SubmitHandler<CourseFormData> = async (data) => {
    try {
      const courseData: CourseData = {
        title: data.title,
        description: data.description,
        duration: data.duration,
        creationDate: Math.floor(Date.now() / 1000),
        authors: selectAuth.map((el) => el.id),
      };
      const res = id
        ? await updateCourse(`courses/${id}`, courseData)
        : await createCourse(`courses/`, courseData);
      if (!id) reset();
      setSelectAuth([]);
      navigate('/courses', { replace: true });
      return res;
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloseForm = () => {
    reset();
    navigate('/courses', { replace: true });
  };

  useEffect(() => {
    const fetchCourse = async () => {
      if (!authList.length) getAllAuth();
      const data = await getCourse(id);
      if (data) {
        const filterData = await filterSelectAuth(data.authors);
        if (filterData) setSelectAuth(filterData);
        reset({
          title: data.title,
          description: data.description,
          duration: data.duration,
        });
      }
    };
    if (id) fetchCourse();
  }, [id]);

  useEffect(() => {
    if (selectAuth.length && !id) {
      setSelectAuth([]);
    }
    if (!authList.length && !id) {
      getAllAuth();
    }
  }, []);

  return (
    <section className="container action-page">
      <h1 className="title-page">Course Creat</h1>
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
        <FormButtons handleCloseForm={handleCloseForm} />
      </form>
    </section>
  );
};

export default CourseActions;
