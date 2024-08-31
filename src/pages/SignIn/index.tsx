import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignIn.module.scss';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/slices/auth/slice';
import axios from 'axios';

const SignIn = () => {
  const [inputEmail, setInputEmail] = useState('mirandakerr@gmail.com');
  const [inputPassword, setInputPassword] = useState('miranda00');

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post('http://localhost:8001/api/auth/login', {
        email: inputEmail,
        password: inputPassword,
      })
      .then((res) => {
        const token = res.data.access_token;
        const user = res.data.user;

        dispatch(login({ token, user }));
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.signInTitle}>Sign in</div>
        <div className={styles.inputContainer}>
          <input
            value={inputEmail}
            placeholder="Enter your email here"
            onChange={(ev) => setInputEmail(ev.target.value)}
            className={styles.inputBox}
          />
        </div>
        <div className={styles.inputContainer}>
          <input
            type="password"
            value={inputPassword}
            placeholder="Enter your password here"
            onChange={(ev) => setInputPassword(ev.target.value)}
            className={styles.inputBox}
          />
        </div>
        <div className={styles.inputContainer}>
          <input
            className={styles.inputButton}
            type="button"
            onClick={() => handleLogin()}
            value={'Log in'}
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
