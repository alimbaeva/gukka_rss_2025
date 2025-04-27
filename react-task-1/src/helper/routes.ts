export const routes = {
  courses: '/courses',
  courseDetails: (id: string | number) => `/courses/${id}`,
  editCourse: (id: string | number) => `/courses/${id}/edit`,
};
