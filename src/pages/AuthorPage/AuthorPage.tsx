import BlogList from '@/components/BlogList/BlogList';
import styles from './AuthorPage.module.scss';
import { useParams } from 'react-router-dom';
import { Author, Blog } from '@/types/blogs';
import { useFetch } from '@/hooks/useFetch';

export default function AuthorPage() {
  const params = useParams();

  const { data: author } = useFetch<Author>(`http://localhost:8001/api/users/${params.id}`);
  const { data: blogs } = useFetch<{ count: number; items: Blog[] }>(
    `http://localhost:8001/api/posts/?author_id=${params.id}`,
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
          </div>
          <div className={styles.followButton}>
            <button>+ Follow {author.name}</button>
          </div>
        </div>
      )}
      <div className={styles.blogsContainer}>{blogs && <BlogList blogs={blogs.items} />}</div>
    </div>
  );
}
