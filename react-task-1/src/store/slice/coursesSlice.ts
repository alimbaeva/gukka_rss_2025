import { createSlice } from '@reduxjs/toolkit';
import { CoursesListType } from '../../types/types';
import {
  createCourseThunk,
  deleteCourseThunk,
  getCourseIdThunk,
  getCoursesThunk,
  updateCourseThunk,
} from '../thunks/coursesThunks';

interface CoursesStatetype {
  isLoadingCourses: boolean;
  errorCourses: string;
  courseData: CoursesListType[];
  course: CoursesListType | undefined;
}

const initialState: CoursesStatetype = {
  isLoadingCourses: false,
  errorCourses: '',
  courseData: [],
  course: undefined,
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    clearCourse: (state) => {
      state.course = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCoursesThunk.pending, (state) => {
        state.isLoadingCourses = true;
      })
      .addCase(getCoursesThunk.fulfilled, (state, action) => {
        state.isLoadingCourses = false;
        state.courseData = action.payload;
      })
      .addCase(getCoursesThunk.rejected, (state, action) => {
        state.isLoadingCourses = false;
        state.errorCourses = action.error.message || 'Error occurred';
      })
      .addCase(deleteCourseThunk.pending, (state) => {
        state.isLoadingCourses = true;
      })
      .addCase(deleteCourseThunk.fulfilled, (state) => {
        state.isLoadingCourses = false;
      })
      .addCase(deleteCourseThunk.rejected, (state, action) => {
        state.isLoadingCourses = false;
        state.errorCourses = action.error.message || 'Error occurred';
      })
      .addCase(updateCourseThunk.pending, (state) => {
        state.isLoadingCourses = true;
      })
      .addCase(updateCourseThunk.fulfilled, (state) => {
        state.isLoadingCourses = false;
      })
      .addCase(updateCourseThunk.rejected, (state, action) => {
        state.isLoadingCourses = false;
        state.errorCourses = action.error.message || 'Error occurred';
      })
      .addCase(createCourseThunk.pending, (state) => {
        state.isLoadingCourses = true;
      })
      .addCase(createCourseThunk.fulfilled, (state) => {
        state.isLoadingCourses = false;
      })
      .addCase(createCourseThunk.rejected, (state, action) => {
        state.isLoadingCourses = false;
        state.errorCourses = action.error.message || 'Error occurred';
      })
      .addCase(getCourseIdThunk.pending, (state) => {
        state.isLoadingCourses = true;
      })
      .addCase(getCourseIdThunk.fulfilled, (state, action) => {
        state.isLoadingCourses = false;
        state.course = action.payload;
      })
      .addCase(getCourseIdThunk.rejected, (state, action) => {
        state.isLoadingCourses = false;
        state.errorCourses = action.error.message || 'Error occurred';
      });
  },
});

export const { clearCourse } = coursesSlice.actions;

export default coursesSlice.reducer;
