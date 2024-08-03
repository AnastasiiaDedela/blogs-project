import TagsSideBar from '@/components/TagsSideBar';
import styles from './Home.module.scss';
import BlogList from '@/components/BlogList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '@/components/Pagination';

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [limit] = useState(4);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);

  const pageOnClick = (pageNum: number) => {
    setOffset(limit * (pageNum - 1));
  };

  useEffect(() => {
    console.log('fetching :', limit, offset);
    const token = localStorage.getItem('@token');
    axios
      .get(`http://localhost:8001/api/posts?limit=${limit}&offset=${offset}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBlogs(res.data.items);
        setCount(res.data.count);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [offset]);

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.banner}>
          <h1>glossa</h1>
          <p>A place to share your knowledge.</p>
        </div>
        <div className={styles.content}>
          <BlogList blogs={blogs} />
          <TagsSideBar />
        </div>
        <Pagination elementsPerPage={limit} count={count} pageOnClick={pageOnClick} />
      </div>
    </main>
  );
}
