import BlogItem from '../BlogItem';
import styles from './BlogList.module.scss';

export default function BlogList({ blogs }) {
  return (
    <div className={styles.feed}>
      <p className={styles.feedTitle}>Global Feed</p>
      <div className={styles.blogList}>
        {blogs && blogs.map((blog) => <BlogItem key={blog.id} blog={blog} />)}
      </div>
    </div>
  );
}
