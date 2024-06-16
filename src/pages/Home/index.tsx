import TagsSideBar from '@/components/TagsSideBar';
import styles from './Home.module.scss';
import BlogList from '@/components/BlogList';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('@token');
    axios
      .get('http://localhost:8001/api/posts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBlogs(res.items);
        console.log(res.items);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

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
      </div>
    </main>
  );
}
