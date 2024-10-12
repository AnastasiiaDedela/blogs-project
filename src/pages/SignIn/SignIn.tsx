import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignIn.module.scss';
import { useDispatch } from 'react-redux';
import Input from '@/components/Input/Input';
import { signin } from '@/services/authServices';
import { login } from '@/redux/slices/auth/slice';

const SignIn = () => {
  const [inputEmail, setInputEmail] = useState('mirandakerr@gmail.com');
  const [inputPassword, setInputPassword] = useState('miranda11');

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await signin(inputEmail, inputPassword);
    const token = response?.token;
    const user = response?.user;
    dispatch(login({ token, user }));
    navigate('/');
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
