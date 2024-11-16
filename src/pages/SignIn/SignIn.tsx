import { useNavigate } from 'react-router-dom';
import styles from './SignIn.module.scss';
import { useDispatch } from 'react-redux';
import Input from '@/components/Input/Input';
import { signin } from '@/services/authServices';
import { login } from '@/redux/slices/auth/slice';
import { useMutation } from '@tanstack/react-query';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SubmitHandler, useForm } from 'react-hook-form';

interface ISignInForm {
  email: string;
  password: string;
}

interface ApiError {
  status: number;
  message: string;
}

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm<ISignInForm>({
    mode: 'onTouched',
    defaultValues: {
      email: 'mirandakerr@gmail.com',
      password: 'miranda11',
    },
  });

  const emailError = formState.errors['email']?.message;
  const passwordError = formState.errors['password']?.message;

  const loginMutation = useMutation({
    mutationFn: (data: ISignInForm) => signin(data),
    onSuccess: (res) => {
      console.log('login', res);
      const token = res?.token;
      const user = res?.user;
      dispatch(login({ token, user }));
      navigate('/');
    },
    onError(error: ApiError) {
      console.log('error', error);
      if (error.status === 401) {
        notify('Login or password is not correct');
      } else {
        notify('Oops, something went wrong, please try again later');
      }
    },
  });

  const onSubmit: SubmitHandler<ISignInForm> = (data) => {
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
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
          <div className={styles.formInput}>
            <div className={styles.singInInput}>
              <Input
                type="text"
                placeholder="Enter your email here"
                className={styles.inputContainer}
                register={register('email', {
                  required: 'Required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
            </div>

            {emailError && <p className={styles.passwordError}>{emailError}</p>}
          </div>
          <div className={styles.formInput}>
            <div className={styles.singInInput}>
              <Input
                type="password"
                placeholder="Enter your password here"
                className={styles.inputContainer}
                register={register('password', {
                  required: 'Required',
                  minLength: { value: 8, message: 'Password must be at least 8 characters long' },
                })}
                eyeShown={true}
              />
            </div>
            {passwordError && <p className={styles.passwordError}>{passwordError}</p>}
          </div>

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
