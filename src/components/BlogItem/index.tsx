import { useNavigate } from 'react-router-dom';
import styles from './BlogItem.module.scss';
import { BlogItemProps } from '@/types/blogs';
import AuthorBlock from '../AuthorBlock';

const BlogItem: React.FC<BlogItemProps> = ({ blog }) => {
  const navigate = useNavigate();

  const { author, created_at, tags, text, title, id } = blog;

  const truncatedText = text.length > 186 ? text.substring(0, 186) : text;

  return (
    <article className={styles.blog}>
      <div className={styles.blogHeader}>
        <AuthorBlock authorName={author.name} created_at={created_at} id={author.id} />
        <button className={styles.likes}>
          💙{Math.floor(Math.random() * (150 - 50 + 1)) + 50}
        </button>
      </div>
      <div className={styles.blogContent} onClick={() => navigate(`/article-details/${id}`)}>
        <p className={styles.blogTitle}>{title}</p>
        <p className={styles.blogAbout}>{`${truncatedText}...`}</p>
      </div>
      <div className={styles.blogFooter}>
        <p onClick={() => navigate(`/article-details/${id}`)}>Read more...</p>
        <div className={styles.blogTags}>
          {tags && tags.map((tag, index) => <button key={index}>{tag}</button>)}
        </div>
      </div>
    </article>
  );
};

export default BlogItem;
