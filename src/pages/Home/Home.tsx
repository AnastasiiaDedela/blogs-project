import TagsSideBar from '@/components/TagsSideBar/TagsSideBar';
import styles from './Home.module.scss';
import BlogList from '@/components/BlogList/BlogList';
import Pagination from '@/components/Pagination/Pagination';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useFetch } from '@/hooks/useFetch';
import { Blog } from '@/types/blogs';
import { useDebounce } from '@/hooks/useDeobunce';
import { getPostsUrl } from '../../utils/getPostsUrl';

export default function Home() {
  const { limit, offset, tags } = useSelector((state: RootState) => state.posts);
  const searchValue = useSelector((state: RootState) => state.search.searchValue);

  const searchDebounced = useDebounce<string>(searchValue);

  const { data } = useFetch<{ count: number; items: Blog[] }>(
    getPostsUrl(limit, offset, tags, searchDebounced),
    [offset, tags, searchDebounced],
  );

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.banner}>
          <h1>glossa</h1>
          <p>A place to share your knowledge.</p>
        </div>

        <div className={styles.content}>
          {data && <BlogList blogs={data.items} />}
          <TagsSideBar />
        </div>
        {data && <Pagination count={data.count} />}
      </div>
    </main>
  );
}
