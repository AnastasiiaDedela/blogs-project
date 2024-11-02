import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignIn.module.scss';
import { useDispatch } from 'react-redux';
import Input from '@/components/Input/Input';
import { signin } from '@/services/authServices';
import { login } from '@/redux/slices/auth/slice';
import { useMutation } from '@tanstack/react-query';

const SignIn = () => {
  const [inputEmail, setInputEmail] = useState('mirandakerr@gmail.com');
  const [inputPassword, setInputPassword] = useState('miranda11');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: () => signin(inputEmail, inputPassword),
    onSuccess: (res) => {
      console.log('login', res);
      const token = res?.token;
      const user = res?.user;
      dispatch(login({ token, user }));
      navigate('/');
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.signInTitle}>Sign in</div>
        <div className={styles.singInInput}>
          <Input
            type="text"
            value={inputEmail}
            placeholder="Enter your email here"
            onChange={(e) => setInputEmail(e.target.value)}
            className={styles.inputContainer}
          />
        </div>

        <div className={styles.singInInput}>
          <Input
            value={inputPassword}
            placeholder="Enter your password here"
            type="password"
            onChange={(e) => setInputPassword(e.target.value)}
            className={styles.inputContainer}
            eyeShown={true}
          />
        </div>

        <div>
          <button className={styles.loginButton} onClick={() => loginMutation.mutate()}>
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
