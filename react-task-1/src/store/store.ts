import { configureStore } from '@reduxjs/toolkit';
import authorsReducer from './slice/authorsSlice';
import coursesReducer from './slice/coursesSlice';
import { api } from './api/api';

export const store = configureStore({
  reducer: {
    authors: authorsReducer,
    courses: coursesReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
