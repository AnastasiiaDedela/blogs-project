import BlogItem from '../BlogItem';
import styles from './BlogList.module.scss';

export default function BlogList() {
  return (
    <div className={styles.feed}>
      <p className={styles.feedTitle}>Global Feed</p>
      <div className={styles.blogList}>
        <BlogItem />
        <BlogItem />
        <BlogItem />
        <BlogItem />
        <BlogItem />
      </div>
    </div>
  );
}
