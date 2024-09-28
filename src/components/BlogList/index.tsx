import { Blog } from '@/types/blogs';
import BlogItem from '../BlogItem';
import styles from './BlogList.module.scss';

interface BlogListProps {
  blogs: Blog[];
  editable: boolean;
}

const BlogList: React.FC<BlogListProps> = ({ blogs, editable }) => {
  return (
    <div className={styles.feed}>
      <p className={styles.feedTitle}>Global Feed</p>
      <div className={styles.blogList}>
        {blogs && blogs.map((blog) => <BlogItem key={blog.id} blog={blog} editable={editable} />)}
      </div>
    </div>
  );
};
export default BlogList;
