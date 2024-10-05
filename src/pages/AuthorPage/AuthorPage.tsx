import BlogList from '@/components/BlogList/BlogList';
import styles from './AuthorPage.module.scss';
import { useParams } from 'react-router-dom';
import { Author, Blog } from '@/types/blogs';
import { useFetch } from '@/hooks/useFetch';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useDebounce } from '@/hooks/useDeobunce';
import { getPostsUrl } from '@/utils/getPostsUrl';
import Pagination from '@/components/Pagination/Pagination';

export default function AuthorPage() {
  const params = useParams();
  const { limit, offset, tags } = useSelector((state: RootState) => state.posts);
  const searchValue = useSelector((state: RootState) => state.search.searchValue);

  const searchDebounced = useDebounce<string>(searchValue);

  const { data: author } = useFetch<Author>(`http://localhost:8001/api/users/${params.id}`);

  const { data: blogs } = useFetch<{ count: number; items: Blog[] }>(
    getPostsUrl(limit, offset, tags, searchDebounced, params.id),
    [offset, tags, searchDebounced],
  );

  return (
    <div className={styles.container}>
      {author && (
        <div className={styles.userContainer}>
          <div className={styles.user}>
            <div className={styles.userAvatar}>
              <img src="/avatar.png" alt="avatar" />
            </div>

            <h2 className={styles.userName}>{author.name}</h2>
            <button>+ Follow {author.name}</button>
          </div>
        </div>
      )}

      <div className={styles.blogsContainer}>
        <div style={{ flex: 1 }}>{blogs && <BlogList blogs={blogs.items} />}</div>
      </div>

      <div className={styles.footer}>{blogs && <Pagination count={blogs.count} />}</div>
    </div>
  );
}
