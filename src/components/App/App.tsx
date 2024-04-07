import { getFilms } from '@/features/films/filmsSlice';
import { useAppDispatch } from '@/features/types';
import router from '@/router';

import React, { useEffect } from 'react';

import { RouterProvider } from 'react-router-dom';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFilms());
  }, [dispatch]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
