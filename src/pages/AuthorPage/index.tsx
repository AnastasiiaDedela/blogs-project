import BlogList from '@/components/BlogList';
import styles from './UresPage.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Blog } from '@/types/blogs';

type Author = {
  email: string;
  id: string;
  name: string;
};

export default function AuthorPage() {
  const params = useParams();
  const [author, setAuthor] = useState<Author | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8001/api/users/${params.id}`)
      .then((res) => {
        setAuthor(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get<{ count: number; items: Blog[] }>(
        `http://localhost:8001/api/posts/?author_id=${params.id}`,
      )
      .then((res) => {
        setBlogs(res.data.items);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

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

      <div className={styles.blogsContainer}>
        <BlogList blogs={blogs} />
      </div>
    </div>
  );
}
