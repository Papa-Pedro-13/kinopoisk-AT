import FilmPage from '@/components/Film/FilmPage';
import FilmsPage from '@/components/Films/FilmsPage';

import { createBrowserRouter, Link } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <FilmsPage />,
  },
  {
    path: 'films/:id',
    element: <FilmPage />,
  },
]);
export default router;
