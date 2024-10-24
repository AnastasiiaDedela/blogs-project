import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignUp.module.scss';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/slices/auth/slice';
import Input from '@/components/Input/Input';
import { signup } from '@/services/authServices';

const SignUp = () => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputUserName, setInputUserName] = useState('');
  const [inputRepeatePassword, setInputRepeatePassword] = useState('miranda11');

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSignUp = async () => {
    const response = await signup(inputUserName, inputEmail, inputPassword, inputRepeatePassword);
    const token = response?.token;
    const user = response?.user;

    dispatch(login({ token, user }));
    navigate('/');
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

        <Input
          value={inputRepeatePassword}
          placeholder="Please repeate your password"
          type="password"
          onChange={(e) => setInputRepeatePassword(e.target.value)}
          className={styles.inputContainer}
        />

        <div className={styles.inputContainer}>
          <button
            className={styles.inputButton}
            onClick={() => {
              inputPassword === inputRepeatePassword && handleSignUp();
            }}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
