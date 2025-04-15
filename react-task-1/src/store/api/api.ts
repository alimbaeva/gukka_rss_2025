import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { COURSES_PATH } from '../../api/variable';
import { CourseData } from '../../types/types';

export const api = createApi({
  reducerPath: 'coursesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: COURSES_PATH,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Courses', 'Authors'],
  endpoints: (builder) => ({
    getItems: builder.query<unknown[], string>({
      query: (path) => `${path}`,
      providesTags: (_result, _error, path) => {
        if (path.includes('courses')) return ['Courses'];
        if (path.includes('authors')) return ['Authors'];
        return [];
      },
    }),
    createItem: builder.mutation<
      unknown,
      { path: string; data: CourseData | { name: string } }
    >({
      query: ({ path, data }) => ({
        url: `${path}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_result, _error, arg) => {
        if (arg.path.includes('courses')) return ['Courses'];
        if (arg.path.includes('authors')) return ['Authors'];
        return [];
      },
    }),
    updateItem: builder.mutation<unknown, { path: string; data: unknown }>({
      query: ({ path, data }) => ({
        url: `${path}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, arg) => {
        if (arg.path.includes('courses')) return ['Courses'];
        if (arg.path.includes('authors')) return ['Authors'];
        return [];
      },
    }),
    deleteItem: builder.mutation<unknown, { path: string }>({
      query: (path) => ({
        url: `${path.path}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, arg) => {
        if (arg.path.includes('courses')) return ['Courses'];
        if (arg.path.includes('authors')) return ['Authors'];
        return [];
      },
    }),
  }),
});

export const {
  useGetItemsQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = api;
