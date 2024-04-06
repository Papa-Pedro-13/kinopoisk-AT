import { configureStore } from '@reduxjs/toolkit';
import filmsSlice from './films/filmsSlice';
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
  reducer: {
    films: filmsSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getMiddleware) => getMiddleware().concat(apiSlice.middleware),
});
