import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthorsList as AuthorsListType } from '../../types/types';
import { api } from '../api/api';

export const getAuthorsThunk = createAsyncThunk<AuthorsListType[]>(
  'authors/getAll',
  async (_, { dispatch }) => {
    const result = await dispatch(api.endpoints.getItems.initiate('authors/'));

    if ('data' in result && Array.isArray(result.data)) {
      return result.data as AuthorsListType[];
    } else {
      throw new Error('Failed to fetch authors');
    }
  }
);

export const createAuthorThunk = createAsyncThunk(
  'authors/createAuthor',
  async (name: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await dispatch(
        api.endpoints.createItem.initiate({
          path: 'authors/',
          data: { name },
        })
      );

      if ('data' in response) {
        return response.data as AuthorsListType;
      }

      return rejectWithValue('Failed to create author');
    } catch (error) {
      console.error(error);
      return rejectWithValue('An error occurred');
    }
  }
);

export const removeGlobalAuthorThunk = createAsyncThunk(
  'authors/removeAuthor',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await dispatch(
        api.endpoints.updateItem.initiate({
          path: `authors/${id}`,
          data: { removed: true },
        })
      );

      if ('data' in response) {
        return response.data as AuthorsListType;
      }

      return rejectWithValue('Failed to remove author');
    } catch (error) {
      console.error(error);
      return rejectWithValue('An error occurred');
    }
  }
);
