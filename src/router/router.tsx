import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import SignIn from '@/pages/SignIn/SignIn';
import MainLayout from '@/pages/MainLayout/MainLayout';
import SignUp from '@/pages/SignUp/SignUp';
import AuthorPage from '@/pages/AuthorPage/AuthorPage';
import AddArticle from '@/pages/AddArticle/AddArticle';
import ActicleDetails from '@/pages/ActicleDetails/ArticleDetails';
import UserPage from '@/pages/UserPage/UserPage';

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
        path: '/user/me',
        element: <UserPage />,
      },
      {
        path: '/author/:id',
        element: <AuthorPage />,
      },
      {
        path: '/add-article',
        element: <AddArticle />,
      },
      {
        path: '/article-details/:id',
        element: <ActicleDetails />,
      },
    ],
  },
]);
