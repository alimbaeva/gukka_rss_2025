import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api/api';
import { CourseData, CoursesListType } from '../../types/types';

export const getCoursesThunk = createAsyncThunk<CoursesListType[]>(
  'courses/courseAll',
  async (_, { dispatch }) => {
    const result = await dispatch(api.endpoints.getItems.initiate('courses/'));

    if ('data' in result && Array.isArray(result.data)) {
      return result.data as CoursesListType[];
    } else {
      throw new Error('Failed to fetch courses');
    }
  }
);

export const getCourseIdThunk = createAsyncThunk<CoursesListType, string>(
  'courses/getCourseId',
  async (id: string, { dispatch }) => {
    const result = await dispatch(
      api.endpoints.getItems.initiate(`courses/${id}`)
    );

    if ('data' in result) {
      return result.data as unknown as CoursesListType;
    } else {
      throw new Error('Failed to fetch courses');
    }
  }
);

export const deleteCourseThunk = createAsyncThunk(
  'courses/deleteCourseId',
  async (id: string, { dispatch }) => {
    const result = await dispatch(
      api.endpoints.deleteItem.initiate({ path: `courses/${id}` })
    );

    if ('data' in result) {
      return result.data as CoursesListType;
    } else {
      throw new Error('Failed to remove courses');
    }
  }
);

export const updateCourseThunk = createAsyncThunk<
  CoursesListType,
  { id: string; data: CourseData }
>('courses/updateCourse', async ({ id, data }, { dispatch }) => {
  const result = await dispatch(
    api.endpoints.updateItem.initiate({ path: `courses/${id}`, data })
  );

  if ('data' in result) {
    return result.data as CoursesListType;
  } else {
    throw new Error('Failed to update course');
  }
});

export const createCourseThunk = createAsyncThunk<
  CoursesListType,
  { data: CourseData }
>('courses/createCourse', async ({ data }, { dispatch }) => {
  const result = await dispatch(
    api.endpoints.createItem.initiate({ path: `courses/`, data })
  );

  if ('data' in result) {
    return result.data as CoursesListType;
  } else {
    throw new Error('Failed to update course');
  }
});
