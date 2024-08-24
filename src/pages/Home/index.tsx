import TagsSideBar from '@/components/TagsSideBar';
import styles from './Home.module.scss';
import BlogList from '@/components/BlogList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '@/components/Pagination';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [count, setCount] = useState(0);

  const { limit, offset, tags } = useSelector((state: RootState) => state.posts);

  function getPosts(limit: number, offset: number, tags: string[]) {
    let requestTags = '';

    for (let i = 0; i < tags.length; i++) {
      requestTags += `tags=${tags[i]}&`;
    }
    console.log('limit', limit);
    console.log('offset', offset);
    console.log('requestTags', requestTags);
    axios
      .get(`http://localhost:8001/api/posts/?limit=${limit}&offset=${offset}&${requestTags}`)
      .then((res) => {
        setCount(res.data.count);
        setBlogs(res.data.items);
        console.log(res.data.items);
        console.log(res.data.count);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getPosts(limit, offset, tags);
  }, [offset, tags]);

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
        <Pagination count={count} blogs={blogs} />
      </div>
    </main>
  );
}
