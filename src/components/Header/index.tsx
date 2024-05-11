import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';

export default function Header() {
  const navigate = useNavigate();

  const onButtonClick = () => {
    navigate('/sign-in');
  };
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h2 className={styles.logo}>glossa</h2>
        <nav>
          <ul className={styles.navigationList}>
            <li>Home</li>
            <li onClick={onButtonClick}>Sign in</li>
            <li>Sign up</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
