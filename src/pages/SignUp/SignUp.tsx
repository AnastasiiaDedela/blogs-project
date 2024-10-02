import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignUp.module.scss';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/slices/auth/slice';
import axios from 'axios';
import Input from '@/components/Input/Input';

const SignUp = () => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputUserName, setInputUserName] = useState('');

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSignUp = () => {
    axios
      .post('http://localhost:8001/api/auth/register', {
        name: inputUserName,
        email: inputEmail,
        password: inputPassword,
      })
      .then((res) => {
        const token = res.data.access_token;
        const user = res.data.user;

        dispatch(login({ token, user }));
        navigate('/');
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.signInTitle}>Sign up</div>

        <Input
          type="text"
          value={inputUserName}
          placeholder="Username"
          onChange={(ev) => setInputUserName(ev.target.value)}
          className={styles.inputContainer}
        />

        <Input
          value={inputEmail}
          placeholder="Email"
          onChange={(ev) => setInputEmail(ev.target.value)}
          className={styles.inputContainer}
          type="text"
        />

        <Input
          type="password"
          value={inputPassword}
          placeholder="Password"
          onChange={(ev) => setInputPassword(ev.target.value)}
          className={styles.inputContainer}
        />

        <div className={styles.inputContainer}>
          <button className={styles.inputButton} onClick={() => handleSignUp()}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
