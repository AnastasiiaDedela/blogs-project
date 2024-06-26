import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/Home';
import SignIn from '@/pages/SignIn';
import MainLayout from '@/pages/MainLayout';
import SignUp from '@/pages/SignUp';
import UserPage from '@/pages/UserPage';
import AddArticle from '@/pages/AddArticle';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        path: '/sign-up',
        element: <SignUp />,
      },
      {
        path: '/user',
        element: <UserPage />,
      },
      {
        path: '/add-article',
        element: <AddArticle />,
      },
    ],
  },
]);
