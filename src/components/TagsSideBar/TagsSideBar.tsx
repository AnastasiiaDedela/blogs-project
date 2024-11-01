import { Link } from 'react-router-dom';
import styles from './TagsSideBar.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setSelectedTags } from '@/redux/slices/posts/slice';
import { getTags } from '@/services/postsServices';
import { useQuery } from '@tanstack/react-query';

export default function TagsSideBar() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const selectedTags = useSelector((state: RootState) => state.posts.tags);
  const dispatch = useDispatch();

  const { data: tags } = useQuery({
    queryKey: ['tags'],
    queryFn: () => getTags(),
  });

  return (
    <div className={styles.sideBar}>
      <div className={styles.tagsContainer}>
        <div>
          <p className={styles.tagsTitle}>Popular Tags</p>
          <div className={styles.tagsList}>
            {selectedTags &&
              tags?.tags &&
              tags.tags.map((tag: string, index: number) => (
                <button
                  key={index}
                  className={selectedTags.includes(tag) ? styles.selectedTag : styles.tag}
                  onClick={() => {
                    if (selectedTags.includes(tag)) {
                      dispatch(
                        setSelectedTags(selectedTags.filter((selectedTag) => tag !== selectedTag)),
                      );
                    } else {
                      dispatch(setSelectedTags([...selectedTags, tag]));
                    }
                  }}>
                  <p>{tag}</p>
                </button>
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
