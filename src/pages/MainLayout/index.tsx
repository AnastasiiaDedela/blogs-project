import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/slices/login/slice';

export default function MainLayout() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('@token');
    console.log(token);
    console.log(typeof token);
    console.log('login in main layout');
    axios
      .get('http://localhost:8001/api/users/me', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        console.log('res3: ', res);
        const user = res.data;
        console.log('dispatch3: ', { token, user });
        dispatch(login({ token, user }));
      })
      .catch((err) => {
        console.log('reload error: ', err.message);
      });
  }, []);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
