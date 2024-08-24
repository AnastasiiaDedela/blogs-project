import TagsSideBar from '@/components/TagsSideBar';
import styles from './Home.module.scss';
import BlogList from '@/components/BlogList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '@/components/Pagination';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setOffset, setSelectedTags } from '@/redux/slices/posts/slice';

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [count] = useState(0);

  const { limit, offset, tags } = useSelector((state: RootState) => state.posts);

  const dispatch = useDispatch();

  const pageOnClick = (pageNum: number) => {
    dispatch(setOffset(limit * (pageNum - 1)));
  };

  function getPosts(limit: number, offset: number, tags: string[]) {
    let requestTags = '';

    for (let i = 0; i < tags.length; i++) {
      requestTags += `tags=${tags[i]}&`;
    }

    axios
      .get(`http://localhost:8001/api/posts/?limit=${limit}&offset=${offset}&${requestTags}`)
      .then((res) => {
        setBlogs(res.data.items);
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
        <Pagination elementsPerPage={limit} count={count} pageOnClick={pageOnClick} />
      </div>
    </main>
  );
}
