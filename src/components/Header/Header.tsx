import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/slices/auth/slice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';
import SearchBar from '../SearchBar/SearchBar';
import { UserIcon, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import styles from './Header.module.scss';

export default function Header() {
  const [isSearchBarShown, setIsSearchBarShown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

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
        {/* <button
          className={styles.mobileMenuToggle}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button> */}
        <div
          className={`${styles.headerRightPart} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
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
                    <Link to={'/user/me'}>
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
