import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignIn.module.scss';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/slices/login/slice';
import axios from 'axios';

const SignIn = () => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  //const [emailError, setEmailError] = useState('')
  //const [passwordError, setPasswordError] = useState('')
  // const { user, token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post('http://localhost:8001/api/auth/login', {
        email: inputEmail,
        password: inputPassword,
      })
      .then((res) => {
        console.log('res: ', res);
        const { access_token: token, user } = res.data;
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
          {/* <label className="errorLabel">{emailError}</label> */}
        </div>
        <div className={styles.inputContainer}>
          <input
            value={inputPassword}
            placeholder="Enter your password here"
            onChange={(ev) => setInputPassword(ev.target.value)}
            className={styles.inputBox}
          />
          {/* <label className="errorLabel">{passwordError}</label> */}
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
