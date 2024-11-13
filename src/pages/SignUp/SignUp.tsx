import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignUp.module.scss';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/slices/auth/slice';
import Input from '@/components/Input/Input';
import { signup } from '@/services/authServices';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

const SignUp = () => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputUserName, setInputUserName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const signUpMutation = useMutation({
    mutationFn: (data) => signup(data),
    onSuccess: (res) => {
      const token = res?.token;
      const user = res?.user;
      dispatch(login({ token, user }));
      navigate('/');
    },
  });

  const onSubmit = (data) => {
    signUpMutation.mutate(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.signUpTitle}>Sign up</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.singUpInput}>
            <Input
              type="text"
              value={inputUserName}
              placeholder="Username"
              onChange={(ev) => setInputUserName(ev.target.value)}
              className={styles.inputContainer}
              register={register('name', { required: 'Required' })}
            />
          </div>

          <div className={styles.singUpInput}>
            <Input
              value={inputEmail}
              placeholder="Email"
              onChange={(ev) => setInputEmail(ev.target.value)}
              className={styles.inputContainer}
              type="text"
              register={register('email', { required: 'Required' })}
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
              register={register('password', { required: 'Required' })}
            />
          </div>
          {inputPassword.length > 0 && inputPassword.length < 8 && (
            <p className={styles.passwordError}>Password length should be more than 7 characters</p>
          )}

          <div className={styles.singUpInput}>
            <Input
              placeholder="Please repeate your password"
              type="password"
              className={styles.inputContainer}
              eyeShown={true}
              register={register('repeat_password', { required: 'Required' })}
            />
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
