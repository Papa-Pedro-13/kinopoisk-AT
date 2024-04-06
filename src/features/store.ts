import { configureStore } from '@reduxjs/toolkit';
import filmsSlice from './films/filmsSlice';

export const store = configureStore({
  reducer: {
    films: filmsSlice,
  },
});
