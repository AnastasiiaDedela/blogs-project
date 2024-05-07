import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h2 className={styles.logo}>glossa</h2>
        <nav>
          <ul className={styles.navigationList}>
            <li>Home</li>
            <li>Sign in</li>
            <li>Sign up</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
