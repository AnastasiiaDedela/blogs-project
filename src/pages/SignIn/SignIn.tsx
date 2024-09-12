import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignIn.module.scss';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/slices/auth/slice';
import axios from 'axios';
import Input from '@/components/Input/Input';

const SignIn = () => {
  const [inputEmail, setInputEmail] = useState('mirandakerr@gmail.com');
  const [inputPassword, setInputPassword] = useState('miranda11');

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

        <Input
          type="text"
          value={inputEmail}
          placeholder="Enter your email here"
          onChange={(e) => setInputEmail(e.target.value)}
          className={styles.inputContainer}
        />

        <Input
          value={inputPassword}
          placeholder="Enter your password here"
          type="password"
          onChange={(e) => setInputPassword(e.target.value)}
          className={styles.inputContainer}
        />

        <div>
          <button className={styles.loginButton} onClick={() => handleLogin()}>
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
