import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignUp.module.scss';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/slices/login/slice';
import axios from 'axios';

const SignUp = () => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputUserName, setInputUserName] = useState('');
  //const [emailError, setEmailError] = useState('')
  //const [passwordError, setPasswordError] = useState('')

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSignUp = (email: string, password: string, name: string) => {
    const userData = { email, password, name };
    console.log(userData);
    dispatch(login(userData));

    const response = axios
      .post('http://localhost:8001/api/auth/register', {
        name: inputUserName,
        email: inputEmail,
        password: inputPassword,
      })
      .then((res) => {
        console.log(res.data);
      });

    console.log(response);

    const { access_token, user } = response;

    dispatch(login({ token: access_token, user }));
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.signInTitle}>Sign up</div>
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={inputUserName}
            placeholder="Username"
            onChange={(ev) => setInputUserName(ev.target.value)}
            className={styles.inputBox}
          />
          {/* <label className="errorLabel">{emailError}</label> */}
        </div>
        <div className={styles.inputContainer}>
          <input
            value={inputEmail}
            placeholder="Email"
            onChange={(ev) => setInputEmail(ev.target.value)}
            className={styles.inputBox}
          />
          {/* <label className="errorLabel">{emailError}</label> */}
        </div>
        <div className={styles.inputContainer}>
          <input
            value={inputPassword}
            placeholder="Password"
            onChange={(ev) => setInputPassword(ev.target.value)}
            className={styles.inputBox}
          />
          {/* <label className="errorLabel">{passwordError}</label> */}
        </div>
        <div className={styles.inputContainer}>
          <input
            className={styles.inputButton}
            type="button"
            onClick={() => handleSignUp(inputEmail, inputPassword, inputUserName)}
            value={'Sign up'}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
