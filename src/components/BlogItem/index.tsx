import { useNavigate } from 'react-router-dom';
import styles from './BlogItem.module.scss';

export default function BlogItem({ text, title, author, created_at, tags }) {
  const navigate = useNavigate();

  return (
    <article className={styles.blog}>
      <div className={styles.blogHeader}>
        <div onClick={() => navigate('/user')} className={styles.authorData}>
          <div className={styles.authorAvatar}>
            <img src="/avatar.png" alt="avatar" />
          </div>
          <div className={styles.autrhorInfo}>
            <p className={styles.authorName}>{author}</p>
            <p className={styles.date}>{created_at}</p>
          </div>
        </div>
        <button className={styles.likes}>💙500</button>
      </div>
      <div className={styles.blogContent}>
        <p className={styles.blogTitle}>{title}</p>
        <p className={styles.blogAbout}>{text}</p>
      </div>
      <div className={styles.blogFooter}>
        <p>Read more...</p>
        <div className={styles.blogTags}>
          {tags.map((tag) => {
            <button>{tag}</button>;
          })}
        </div>
      </div>
    </article>
  );
}
