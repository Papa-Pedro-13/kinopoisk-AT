import Film from '@/components/Film/Film';
import Films from '@/components/Films/Films';
import { createBrowserRouter, Link } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Films />,
  },
  {
    path: 'films/:id',
    element: <Film />,
  },
]);
export default router;
