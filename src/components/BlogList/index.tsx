import { useState } from 'react';
import BlogItem from '../BlogItem';
import Pagination from '../Pagination';
import styles from './BlogList.module.scss';

export default function BlogList() {
  const [page, setPage] = useState<number>(1);
  return (
    <div className={styles.feed}>
      <p className={styles.feedTitle}>Global Feed</p>
      <div className={styles.blogList}>
        <BlogItem />
        <BlogItem />
        <BlogItem />
        <BlogItem />
        <BlogItem />
      </div>
      <Pagination page={page} setPage={(number) => setPage(number)} />
    </div>
  );
}
