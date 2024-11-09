import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignIn.module.scss';
import { useDispatch } from 'react-redux';
import Input from '@/components/Input/Input';
import { signin } from '@/services/authServices';
import { login } from '@/redux/slices/auth/slice';
import { useMutation } from '@tanstack/react-query';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
  const [inputEmail, setInputEmail] = useState('mirandakerr@gmail.com');
  const [inputPassword, setInputPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notify = (message: string) => {
    toast.error(message, {
      position: 'top-center',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      transition: Bounce,
    });
  };

  const loginMutation = useMutation({
    mutationFn: () => signin(inputEmail, inputPassword),
    onSuccess: (res) => {
      console.log('login', res);
      const token = res?.token;
      const user = res?.user;
      dispatch(login({ token, user }));
      navigate('/');
    },
    onError(error) {
      console.log('error', error);
      if (error.status === 401) {
        notify('Login or password is not correct');
      } else {
        notify('Oops, something went wrong, please try again later');
      }
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

        {inputPassword.length > 0 && inputPassword.length < 8 && (
          <p className={styles.passwordError}>Password length should be more than 7 characters</p>
        )}

        <div>
          <button className={styles.loginButton} onClick={() => loginMutation.mutate()}>
            Log in
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SignIn;
