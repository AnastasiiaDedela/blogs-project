import BlogList from '@/components/BlogList/BlogList';
import styles from './AuthorPage.module.scss';
import { useParams } from 'react-router-dom';
import { Blog } from '@/types/blogs';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useDebounce } from '@/hooks/useDeobunce';
import Pagination from '@/components/Pagination/Pagination';
import { useEffect, useState } from 'react';
import { getPosts } from '@/services/postsServices';
import { getUserById } from '@/services/usersServices';

export default function AuthorPage() {
  const params = useParams();
  const { limit, offset, tags } = useSelector((state: RootState) => state.posts);
  const searchValue = useSelector((state: RootState) => state.search.searchValue);
  const [blogs, setBlogs] = useState<Blog[] | null>(null);
  const [author, setAuthor] = useState(null);
  const searchDebounced = useDebounce<string>(searchValue);

  useEffect(() => {
    getUserById(Number(params.id))
      .then((res) => setAuthor(res))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    getPosts(searchDebounced, limit, offset, Number(params.id))
      .then((res) => setBlogs(res))
      .catch((error) => console.log(error));
  }, [offset, tags, searchDebounced]);

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
