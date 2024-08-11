import { Link } from 'react-router-dom';
import styles from './TagsSideBar.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function TagsSideBar() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return (
    <div className={styles.sideBar}>
      <div className={styles.tagsContainer}>
        <div>
          <p className={styles.tagsTitle}>Popular Tags</p>
          <div className={styles.tagsList}>
            <button>eos</button>
            <button>est</button>
            <button>ipsum</button>
            <button>enim</button>
            <button>repellat</button>
            <button>quia</button>
            <button>consequatur</button>
            <button>facilis</button>
            <button>exercitationem</button>
            <button>tenetur</button>
          </div>
        </div>
      </div>
      <div className={styles.addArticleBtn}>
        {isLoggedIn ? (
          <button>
            <Link to="/add-article">Add article +</Link>
          </button>
        ) : (
          <button>
            <Link to="/sign-in">Add article +</Link>
          </button>
        )}
      </div>
    </div>
  );
}
