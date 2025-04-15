import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorsList as AuthorsListType } from '../../types/types';
import {
  createAuthorThunk,
  getAuthorsThunk,
  removeGlobalAuthorThunk,
} from '../thunks/authorsThunks';

interface Authors {
  authList: AuthorsListType[];
  selectAuth: AuthorsListType[];
  authors: AuthorsListType[];
}

interface AuthorsState {
  isLoading: boolean;
  error: string;
  authors: Authors;
}

const initialState: AuthorsState = {
  isLoading: false,
  error: '',
  authors: {
    authList: [],
    selectAuth: [],
    authors: [],
  },
};

const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    setAuthSelect: (state, action: PayloadAction<AuthorsListType[] | []>) => {
      state.authors.selectAuth = action.payload;
      state.authors.authList = state.authors.authors.filter(
        (author) => !author.removed
      );
    },
    addAuthToSelect: (state, action: PayloadAction<AuthorsListType>) => {
      state.authors.selectAuth.push(action.payload);
      state.authors.authList = state.authors.authList.filter(
        (el) => el.id !== action.payload.id
      );
    },
    removeAuthFromSelect: (state, action: PayloadAction<string>) => {
      state.authors.selectAuth = state.authors.selectAuth.filter(
        (el) => el.id !== action.payload
      );
      const authRemoveInSelect = state.authors.authors.filter(
        (el) => el.id === action.payload
      );
      state.authors.authList = [
        ...state.authors.authList,
        ...authRemoveInSelect,
      ];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAuthorsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAuthorsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authors.authors = action.payload;
        state.authors.authList = action.payload.filter(
          (author) => !author.removed
        );
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
        state.authors.authList = [...state.authors.authList, action.payload];
        state.authors.authors = [...state.authors.authors, action.payload];
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
        state.authors.authList = state.authors.authList.filter(
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
