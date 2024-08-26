import TagsSideBar from '@/components/TagsSideBar';
import styles from './Home.module.scss';
import BlogList from '@/components/BlogList';
import Pagination from '@/components/Pagination';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useFetch } from '@/components/useFetch';
import { Blog } from '@/types/blogs';
import { useDebounce } from '@/components/useDeobunce';

export default function Home() {
  const { limit, offset, tags } = useSelector((state: RootState) => state.posts);
  const searchValue = useSelector((state: RootState) => state.search.searchValue);

  const searchDebounced = useDebounce<string>(searchValue);

  function getPostsUrl(limit: number, offset: number, tags: string[], searchValue: string) {
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

    return url;
  }

  const { data } = useFetch<{ count: number; items: Blog[] }>(
    getPostsUrl(limit, offset, tags, searchValue),
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
