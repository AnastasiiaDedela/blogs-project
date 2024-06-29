import { useNavigate } from 'react-router-dom';
import styles from './BlogItem.module.scss';

export default function BlogItem({ blog }) {
  const navigate = useNavigate();

  const {
    author: { name }, // Destructure nested author object
    created_at,
    tags,
    text,
    title,
  } = blog;

  const date = new Date(created_at);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;

  return (
    <article className={styles.blog}>
      <div className={styles.blogHeader}>
        <div onClick={() => navigate('/user')} className={styles.authorData}>
          <div className={styles.authorAvatar}>
            <img src="/avatar.png" alt="avatar" />
          </div>
          <div className={styles.autrhorInfo}>
            <p className={styles.authorName}>{name}</p>
            <p className={styles.date}>{formattedDate}</p>
          </div>
        </div>
        <button className={styles.likes}>
          💙{Math.floor(Math.random() * (150 - 50 + 1)) + 50}
        </button>
      </div>
      <div className={styles.blogContent}>
        <p className={styles.blogTitle}>{title}</p>
        <p className={styles.blogAbout}>{text}</p>
      </div>
      <div className={styles.blogFooter}>
        <p>Read more...</p>
        <div className={styles.blogTags}>{tags && tags.map((tag) => <button>{tag}</button>)}</div>
      </div>
    </article>
  );
}
