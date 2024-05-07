import styles from './Header.module.scss';

export default function Header() {
  return (
    <header>
      <div className="container">
        <h1 className={styles.logo}>Glossa</h1>
        <nav>
          <ul className={styles.navigationList}>
            <li>home</li>
            <li>Sign in</li>
            <li>Sign up</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
