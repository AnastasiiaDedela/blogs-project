import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/slices/auth/slice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';
import SearchBar from '../SearchBar/SearchBar';
import { UserIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Header() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const [isSearchBarShown, setIsSearchBarShown] = useState(false);

  useEffect(() => {
    if (
      location.pathname === '/' ||
      location.pathname === '/user/me' ||
      location.pathname.includes('/author/')
    ) {
      setIsSearchBarShown(true);
    } else {
      setIsSearchBarShown(false);
    }
  }, [location]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h2 className={styles.logo} onClick={() => navigate('/')}>
          glossa
        </h2>
        <div className={styles.headerRightPart}>
          {isSearchBarShown && (
            <div className={styles.searchBar}>
              <SearchBar />
            </div>
          )}
          <nav>
            <ul className={styles.navigationList}>
              <li>
                <Link to="/">Home</Link>
              </li>
              {isLoggedIn ? (
                <>
                  <li>
                    <Link to="/sign-in" onClick={() => dispatch(logout())}>
                      Log out
                    </Link>
                  </li>
                  <li>
                    <Link to={'user/me'}>
                      <div className={styles.userIcon}>
                        <UserIcon />
                      </div>
                    </Link>
                  </li>
                </>
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
      </div>
    </header>
  );
}
