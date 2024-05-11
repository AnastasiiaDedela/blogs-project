import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignIn.module.scss';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [emailError, setEmailError] = useState('')
  //const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate();

  const onButtonClick = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.signInTitle}>Sign in</div>
        <div className={styles.inputContainer}>
          <input
            value={email}
            placeholder="Enter your email here"
            onChange={(ev) => setEmail(ev.target.value)}
            className={styles.inputBox}
          />
          {/* <label className="errorLabel">{emailError}</label> */}
        </div>
        <div className={styles.inputContainer}>
          <input
            value={password}
            placeholder="Enter your password here"
            onChange={(ev) => setPassword(ev.target.value)}
            className={styles.inputBox}
          />
          {/* <label className="errorLabel">{passwordError}</label> */}
        </div>
        <div className={styles.inputContainer}>
          <input
            className={styles.inputButton}
            type="button"
            onClick={onButtonClick}
            value={'Log in'}
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
