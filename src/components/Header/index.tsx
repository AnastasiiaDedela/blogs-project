import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/slices/login/slice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';

export default function Header() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h2 className={styles.logo} onClick={() => navigate('/')}>
          glossa
        </h2>
        <nav>
          <ul className={styles.navigationList}>
            <li>
              <Link to="/">Home</Link>
            </li>
            {isLoggedIn ? (
              <li>
                <Link to="/sign-in" onClick={() => dispatch(logout())}>
                  Log out
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/sign-in">Sign in</Link>
                </li>
                <li>
                  <Link to="/sign-up">Sign up</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
