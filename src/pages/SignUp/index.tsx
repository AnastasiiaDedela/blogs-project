import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignUp.module.scss';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  //const [emailError, setEmailError] = useState('')
  //const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate();

  const onButtonClick = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.signInTitle}>Sign up</div>
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={userName}
            placeholder="Username"
            onChange={(ev) => setUserName(ev.target.value)}
            className={styles.inputBox}
          />
          {/* <label className="errorLabel">{emailError}</label> */}
        </div>
        <div className={styles.inputContainer}>
          <input
            value={email}
            placeholder="Email"
            onChange={(ev) => setEmail(ev.target.value)}
            className={styles.inputBox}
          />
          {/* <label className="errorLabel">{emailError}</label> */}
        </div>
        <div className={styles.inputContainer}>
          <input
            value={password}
            placeholder="Password"
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
            value={'Sign up'}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
