import BlogList from '@/components/BlogList/BlogList';
import styles from './AuthorPage.module.scss';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useDebounce } from '@/hooks/useDeobunce';
import Pagination from '@/components/Pagination/Pagination';
import { getPosts } from '@/services/postsServices';
import { getUserById } from '@/services/usersServices';
import { useQuery } from '@tanstack/react-query';

export default function AuthorPage() {
  const params = useParams();
  const { limit, offset, tags } = useSelector((state: RootState) => state.posts);
  const searchValue = useSelector((state: RootState) => state.search.searchValue);
  const searchDebounced = useDebounce<string>(searchValue);

  const { data: author } = useQuery({
    queryKey: ['author'],
    queryFn: () => getUserById(Number(params.id)),
  });

  const {
    data: blogs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['blogs', offset, tags, searchDebounced],
    queryFn: () => getPosts(searchDebounced, limit, offset, Number(params.id)),
  });

  return (
    <div className={styles.container}>
      <div className={styles.userContainer}>
        <div className={styles.user}>
          <div className={styles.userAvatar}>
            <img src="/avatar.png" alt="avatar" />
          </div>
          {author && (
            <>
              <h2 className={styles.userName}>{author.name}</h2>
              <button>+ Follow {author.name}</button>
            </>
          )}
        </div>
      </div>

      {error && <div>Blogs loading error: {error.message}</div>}
      {isLoading && <div>Blogs are loading...</div>}
      <div className={styles.blogsContainer}>
        <div style={{ flex: 1 }}>{blogs && <BlogList blogs={blogs.items} />}</div>
      </div>

      <div className={styles.footer}>{blogs && <Pagination count={blogs.count} />}</div>
    </div>
  );
}
