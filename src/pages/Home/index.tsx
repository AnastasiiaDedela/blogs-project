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
  const searchValue = useSelector((state: RootState) => state.search.searchValue);
  console.log('searchValue', searchValue);

  function getPosts(limit: number, offset: number, tags: string[], searchValue: string) {
    let requestTags = '';
    let url = `http://localhost:8001/api/posts/?limit=${limit}&offset=${offset}`;

    for (let i = 0; i < tags.length; i++) {
      requestTags += `tags=${tags[i]}&`;
    }
    if (requestTags.length > 0) {
      url += `&${requestTags}`;
    }
    if (searchValue.length > 0) {
      url += `&q=${searchValue}`;
    }

    axios
      .get(url)
      .then((res) => {
        console.log('home res', res);
        setCount(res.data.count);
        setBlogs(res.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getPosts(limit, offset, tags, searchValue);
  }, [offset, tags, searchValue]);

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
        <Pagination count={count} />
      </div>
    </main>
  );
}
