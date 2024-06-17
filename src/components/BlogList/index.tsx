import { useState } from 'react';
import BlogItem from '../BlogItem';
import Pagination from '../Pagination';
import styles from './BlogList.module.scss';

export default function BlogList({ blogs }) {
  console.log('blogs list', blogs);
  const [page, setPage] = useState<number>(1);

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
