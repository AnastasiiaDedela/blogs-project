import { useNavigate } from 'react-router-dom';
import styles from './SignUp.module.scss';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/slices/auth/slice';
import Input from '@/components/Input/Input';
import { signup } from '@/services/authServices';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';

interface ISignUpForm {
  name: string;
  email: string;
  password: string;
  repeat_password: string;
}

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState, getValues } = useForm<ISignUpForm>({
    mode: 'onTouched',
  });

  const nameError = formState.errors['name']?.message;
  const emailError = formState.errors['email']?.message;
  const passwordError = formState.errors['password']?.message;
  const repeatedPasswordError = formState.errors['repeat_password']?.message;

  const signUpMutation = useMutation({
    mutationFn: (data: ISignUpForm) => signup(data),
    onSuccess: (res) => {
      const token = res?.token;
      const user = res?.user;
      dispatch(login({ token, user }));
      navigate('/');
    },
  });

  const onSubmit: SubmitHandler<ISignUpForm> = (data) => {
    signUpMutation.mutate(data);
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.signUpTitle}>Sign up</div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
          <div className={styles.formInput}>
            <div className={styles.singUpInput}>
              <Input
                type="text"
                placeholder="Username"
                className={styles.inputContainer}
                register={register('name', { required: 'Required' })}
              />
            </div>
            {nameError && <p className={styles.inputError}>{nameError}</p>}
          </div>

          <div className={styles.formInput}>
            <div className={styles.singUpInput}>
              <Input
                placeholder="Email"
                className={styles.inputContainer}
                type="text"
                register={register('email', {
                  required: 'Required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
            </div>
            {emailError && <p className={styles.inputError}>{emailError}</p>}
          </div>

          <div className={styles.formInput}>
            <div className={styles.singUpInput}>
              <Input
                type="password"
                placeholder="Password"
                className={styles.inputContainer}
                eyeShown={true}
                register={register('password', {
                  required: 'Required',
                  minLength: { value: 8, message: 'Password must be at least 8 characters long' },
                })}
              />
            </div>
            {passwordError && <p className={styles.inputError}>{passwordError}</p>}
          </div>

          <div className={styles.formInput}>
            <div className={styles.singUpInput}>
              <Input
                placeholder="Please repeate your password"
                type="password"
                className={styles.inputContainer}
                eyeShown={true}
                register={register('repeat_password', {
                  required: 'Required',
                  minLength: { value: 8, message: 'Password must be at least 8 characters long' },
                  validate: (value) => value === getValues('password') || 'Passwords do not match',
                })}
              />
            </div>
            {repeatedPasswordError && <p className={styles.inputError}>{repeatedPasswordError}</p>}
          </div>

          <div className={styles.inputContainer}>
            <button type="submit" className={styles.inputButton}>
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
