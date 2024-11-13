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
import { useForm } from 'react-hook-form';

const SignIn = () => {
  const [inputEmail, setInputEmail] = useState('mirandakerr@gmail.com');
  const [inputPassword, setInputPassword] = useState('miranda11');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const loginMutation = useMutation({
    mutationFn: (data) => signin(data),
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

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

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

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.signInTitle}>Sign in</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.singInInput}>
            <Input
              type="text"
              value={inputEmail}
              placeholder="Enter your email here"
              onChange={(e) => setInputEmail(e.target.value)}
              className={styles.inputContainer}
              register={register('email', { required: 'Required' })}
            />
          </div>

          <div className={styles.singInInput}>
            <Input
              type="password"
              value={inputPassword}
              placeholder="Enter your password here"
              onChange={(e) => setInputPassword(e.target.value)}
              className={styles.inputContainer}
              register={register('password', { required: 'Required' })}
              eyeShown={true}
            />
          </div>

          {inputPassword.length > 0 && inputPassword.length < 8 && (
            <p className={styles.passwordError}>Password length should be more than 7 characters</p>
          )}

          <div>
            <button type="submit" className={styles.loginButton}>
              Log in
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SignIn;
