import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignUp.module.scss';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/slices/auth/slice';
import Input from '@/components/Input/Input';
import { signup } from '@/services/authServices';
import { useMutation } from '@tanstack/react-query';

const SignUp = () => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputUserName, setInputUserName] = useState('');
  const [inputRepeatePassword, setInputRepeatePassword] = useState('miranda11');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signUpMutation = useMutation({
    mutationFn: () => signup(inputUserName, inputEmail, inputPassword, inputRepeatePassword),
    onSuccess: (res) => {
      const token = res?.token;
      const user = res?.user;
      dispatch(login({ token, user }));
      navigate('/');
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.signUpTitle}>Sign up</div>
        <div className={styles.singUpInput}>
          <Input
            type="text"
            value={inputUserName}
            placeholder="Username"
            onChange={(ev) => setInputUserName(ev.target.value)}
            className={styles.inputContainer}
          />
        </div>

        <div className={styles.singUpInput}>
          <Input
            value={inputEmail}
            placeholder="Email"
            onChange={(ev) => setInputEmail(ev.target.value)}
            className={styles.inputContainer}
            type="text"
          />
        </div>

        <div className={styles.singUpInput}>
          <Input
            type="password"
            value={inputPassword}
            placeholder="Password"
            onChange={(ev) => setInputPassword(ev.target.value)}
            className={styles.inputContainer}
            eyeShown={true}
          />
        </div>
        {inputPassword.length > 0 && inputPassword.length < 8 && (
          <p className={styles.passwordError}>Password length should be more than 7 characters</p>
        )}

        <div className={styles.singUpInput}>
          <Input
            placeholder="Please repeate your password"
            type="password"
            onChange={(e) => setInputRepeatePassword(e.target.value)}
            className={styles.inputContainer}
            eyeShown={true}
          />
        </div>

        <div className={styles.inputContainer}>
          <button
            className={styles.inputButton}
            onClick={() => {
              inputPassword === inputRepeatePassword && signUpMutation.mutate();
            }}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
