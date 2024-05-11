import TagsSideBar from '@/components/TagsSideBar';
import styles from './Home.module.scss';
import BlogList from '@/components/BlogList';

export default function Home() {
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
      </div>
    </main>
  );
}
