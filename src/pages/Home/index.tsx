import TagsSideBar from '@/components/TagsSideBar';
import styles from './Home.module.scss';
import BlogList from '@/components/BlogList';
import { useState } from 'react';
import Pagination from '@/components/Pagination';

export default function Home() {
  const [page, setPage] = useState<number>(1);
  return (
    <main>
      <div className={styles.container}>
        <div className={styles.banner}>
          <h1>glossa</h1>
          <p>A place to share your knowledge.</p>
        </div>
        <div className={styles.content}>
          <BlogList />
          <TagsSideBar />
        </div>
        <Pagination page={page} setPage={(number) => setPage(number)} />
      </div>
    </main>
  );
}
