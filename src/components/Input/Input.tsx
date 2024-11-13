import { useState } from 'react';
import styles from './Input.module.scss';
import { Eye, EyeOff } from 'lucide-react';

type Props = {
  value?: any;
  type: 'text' | 'password';
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  saveHandler?: () => void;
  eyeShown?: boolean;
  isValid?: boolean;
  register?: ReturnType<typeof import('react-hook-form').useForm>['register'];
};

const Input = ({
  value,
  type,
  placeholder,
  onChange,
  className,
  saveHandler,
  eyeShown,
  isValid,
  register,
}: Props) => {
  const [passwordShown, setPasswordShown] = useState(false);

  return (
    <div className={`${className}`}>
      <div className={styles.inputWrapper}>
        <input
          {...register}
          className={styles.inputBox}
          value={value}
          type={eyeShown !== undefined ? (passwordShown ? 'text' : 'password') : type}
          placeholder={placeholder}
          onChange={onChange}
        />

        {eyeShown &&
          (passwordShown ? (
            <EyeOff className={styles.eye} onClick={() => setPasswordShown(false)} />
          ) : (
            <Eye className={styles.eye} onClick={() => setPasswordShown(true)} />
          ))}
      </div>

      {isValid && saveHandler && (
        <button onClick={saveHandler} className={styles.saveBtn}>
          Save
        </button>
      )}
    </div>
  );
};

export default Input;
