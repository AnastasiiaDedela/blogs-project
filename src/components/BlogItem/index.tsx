import { useNavigate } from 'react-router-dom';
import styles from './BlogItem.module.scss';
import AuthorBlock from '../AuthorBlock';
import { Pencil, Trash2 } from 'lucide-react';
import { Blog } from '@/types/blogs';

interface BlogItemProps {
  blog: Blog;
  editable: boolean;
}

const BlogItem = ({ blog, editable }: BlogItemProps) => {
  const navigate = useNavigate();

  const { author, created_at, tags, text, title, id } = blog;

  const truncatedText = text.length > 186 ? text.substring(0, 186) : text;

  return (
    <article className={styles.blog}>
      <div className={styles.blogHeader}>
        <AuthorBlock authorName={author.name} created_at={created_at} id={author.id} />
        <div className={styles.blogButtons}>
          <button className={styles.likes}>
            💙{Math.floor(Math.random() * (150 - 50 + 1)) + 50}
          </button>
          {editable && (
            <div>
              <button className={styles.edit}>
                <Pencil size={14} />
              </button>
              <button className={styles.delete}>
                <Trash2 size={14} />
              </button>
            </div>
          )}
        </div>
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
