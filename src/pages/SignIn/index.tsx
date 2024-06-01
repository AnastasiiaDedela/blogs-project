import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignIn.module.scss';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/slices/login/slice';

const SignIn = () => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  //const [emailError, setEmailError] = useState('')
  //const [passwordError, setPasswordError] = useState('')
  // const { user, token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    const userData = { email, password };
    console.log(userData);
    dispatch(login(userData));
    navigate('/');
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
            onClick={() => handleLogin(inputEmail, inputPassword)}
            value={'Log in'}
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
