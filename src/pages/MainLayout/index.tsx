import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { useEffect } from 'react';
import axios from 'axios';
import { login, logout } from '@/redux/slices/login/slice';
import { useDispatch } from 'react-redux';

export default function MainLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('@token');
    axios
      .get('http://localhost:8001/api/users/me', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        console.log('res: ', res);
        const { access_token: token, user } = res.data;
        dispatch(login({ token, user }));
        navigate('/');
      })
      .catch((err) => {
        if (err.status === 401) {
          dispatch(logout());
          navigate('/sign-in');
        }
      });
  }, []);
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
