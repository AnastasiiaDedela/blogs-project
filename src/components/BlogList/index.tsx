import { useEffect, useState } from 'react';
import BlogItem from '../BlogItem';
import Pagination from '../Pagination';
import styles from './BlogList.module.scss';
import axios from 'axios';

export default function BlogList() {
  const [page, setPage] = useState<number>(1);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('@token');
    axios
      .get('http://localhost:8001/api/posts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setBlogs(res.items))
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div className={styles.feed}>
      <p className={styles.feedTitle}>Global Feed</p>
      <div className={styles.blogList}>
        {blogs && blogs.map((blog) => <BlogItem key={blog.id} blog={blog} />)}
      </div>
      <Pagination page={page} setPage={(number) => setPage(number)} />
    </div>
  );
}
