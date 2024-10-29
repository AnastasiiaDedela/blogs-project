import TagsSideBar from '@/components/TagsSideBar/TagsSideBar';
import styles from './Home.module.scss';
import BlogList from '@/components/BlogList/BlogList';
import Pagination from '@/components/Pagination/Pagination';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useDebounce } from '@/hooks/useDeobunce';
import { useEffect, useState } from 'react';
import { getPosts } from '@/services/postsServices';

export default function Home() {
  const { limit, offset, tags } = useSelector((state: RootState) => state.posts);
  const searchValue = useSelector((state: RootState) => state.search.searchValue);
  const [posts, setPosts] = useState(null);
  const searchDebounced = useDebounce<string>(searchValue);

  useEffect(() => {
    getPosts(searchDebounced, limit, offset)
      .then((res) => setPosts(res))
      .catch((error) => console.log(error));
  }, [offset, tags, searchDebounced]);

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.banner}>
          <h1>glossa</h1>
          <p>A place to share your knowledge.</p>
        </div>

        <div className={styles.content}>
          <div
            style={{
              flex: 8,
            }}>
            {posts && <BlogList blogs={posts.items} />}
          </div>
          <div
            style={{
              flex: 2,
            }}>
            <TagsSideBar />
          </div>
        </div>

        {posts && <Pagination count={posts.count} />}
      </div>
    </main>
  );
}
