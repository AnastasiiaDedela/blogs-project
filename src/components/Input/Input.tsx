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
}: Props) => {
  const [passwordShown, setPasswordShown] = useState(false);
  return (
    <div className={`${className}`}>
      <input
        className={styles.inputBox}
        value={value}
        type={eyeShown !== undefined ? (passwordShown ? 'text' : 'password') : type}
        placeholder={placeholder}
        onChange={onChange}
      />
      {isValid && saveHandler && <button onClick={saveHandler}>Save</button>}
      {eyeShown &&
        (passwordShown ? (
          <EyeOff className={styles.eye} onClick={() => setPasswordShown(false)} />
        ) : (
          <Eye className={styles.eye} onClick={() => setPasswordShown(true)} />
        ))}
    </div>
  );
};

export default Input;
