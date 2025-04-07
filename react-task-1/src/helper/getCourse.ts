import { get } from '../api/courses';

export const getCourse = async (id: string) => {
  try {
    const res = await get(`courses/${id}`);
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const getCourses = async () => {
  try {
    const res = await get('courses');
    return res;
  } catch (err) {
    console.error(err);
  }
};
