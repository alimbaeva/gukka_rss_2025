import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorsList as AuthorsListType } from '../../types/types';
import {
  createAuthorThunk,
  getAuthorsThunk,
  removeGlobalAuthorThunk,
} from '../thunks/authorsThunks';

interface AuthorsState {
  isLoading: boolean;
  error: string;
  authList: AuthorsListType[];
  selectAuth: AuthorsListType[];
  authors: AuthorsListType[];
}

const initialState: AuthorsState = {
  isLoading: false,
  error: '',
  authList: [],
  selectAuth: [],
  authors: [],
};

const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    setAuthSelect: (state, action: PayloadAction<AuthorsListType[] | []>) => {
      state.selectAuth = action.payload;
      state.authList = state.authors.filter((author) => !author.removed);
    },
    addAuthToSelect: (state, action: PayloadAction<AuthorsListType>) => {
      state.selectAuth.push(action.payload);
      state.authList = state.authList.filter(
        (el) => el.id !== action.payload.id
      );
    },
    removeAuthFromSelect: (state, action: PayloadAction<string>) => {
      state.selectAuth = state.selectAuth.filter(
        (el) => el.id !== action.payload
      );
      const authRemoveInSelect = state.authors.filter(
        (el) => el.id === action.payload
      );
      state.authList = [...state.authList, ...authRemoveInSelect];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAuthorsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAuthorsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authors = action.payload;
        state.authList = action.payload.filter((author) => !author.removed);
      })
      .addCase(getAuthorsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error occurred';
      })
      .addCase(createAuthorThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAuthorThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authList = [...state.authList, action.payload];
        state.authors = [...state.authors, action.payload];
      })
      .addCase(createAuthorThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error occurred';
      })
      .addCase(removeGlobalAuthorThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeGlobalAuthorThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authList = state.authList.filter(
          (el) => el.id !== action.payload.id
        );
      })
      .addCase(removeGlobalAuthorThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error occurred';
      });
  },
});

export const { addAuthToSelect, removeAuthFromSelect, setAuthSelect } =
  authorsSlice.actions;

export default authorsSlice.reducer;
