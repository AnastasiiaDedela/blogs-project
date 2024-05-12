import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h2 className={styles.logo}>glossa</h2>
        <nav>
          <ul className={styles.navigationList}>
            <li onClick={() => navigate('/')}>Home</li>
            <li onClick={() => navigate('/sign-in')}>Sign in</li>
            <li onClick={() => navigate('/sign-up')}>Sign up</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
