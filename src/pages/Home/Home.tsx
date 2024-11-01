import TagsSideBar from '@/components/TagsSideBar/TagsSideBar';
import styles from './Home.module.scss';
import BlogList from '@/components/BlogList/BlogList';
import Pagination from '@/components/Pagination/Pagination';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useDebounce } from '@/hooks/useDeobunce';
import { getPosts } from '@/services/postsServices';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const { limit, offset, tags } = useSelector((state: RootState) => state.posts);
  const searchValue = useSelector((state: RootState) => state.search.searchValue);
  const searchDebounced = useDebounce<string>(searchValue);

  const { data: posts } = useQuery({
    queryKey: ['post', offset, tags, searchDebounced],
    queryFn: () => getPosts(searchDebounced, limit, offset),
  });

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
