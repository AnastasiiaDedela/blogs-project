import { Link } from 'react-router-dom';
import styles from './TagsSideBar.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function TagsSideBar() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8001/api/posts/tags`)
      .then((res) => {
        setTags(res.data.tags);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className={styles.sideBar}>
      <div className={styles.tagsContainer}>
        <div>
          <p className={styles.tagsTitle}>Popular Tags</p>
          <div className={styles.tagsList}>
            {tags.map((tag) => (
              <Link to="/">
                <p className={styles.tag}>{tag}</p>
              </Link>
            ))}
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
