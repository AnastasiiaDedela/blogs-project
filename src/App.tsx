import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { getMe } from './services/usersServices';
import { login } from './redux/slices/auth/slice';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('@token') || '';

  const { data: user, isSuccess } = useQuery({
    queryKey: ['user'],
    queryFn: getMe,
  });

  useEffect(() => {
    if (isSuccess && user) {
      dispatch(login({ token, user }));
    }
  }, [isSuccess, user, dispatch]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
