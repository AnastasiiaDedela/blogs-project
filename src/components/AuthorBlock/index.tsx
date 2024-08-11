import { formatDate } from '@/utils/dates';
import styles from './AuthorBlock.module.scss';

type AuthorBlockProps = {
  authorName: string;
  created_at: string;
  titleStyle?: 'light' | 'blue';
};

const AuthorBlock = ({ authorName, created_at, titleStyle = 'blue' }: AuthorBlockProps) => {
  return (
    <div className={styles.authorBlock}>
      <div className={styles.authorData}>
        <div className={styles.authorAvatar}>
          <img src="/avatar.png" alt="avatar" />
        </div>
        <div className={styles.authorInfo}>
          <p className={`${styles.authorName} ${titleStyle === 'light' ? styles.lightText : ''}`}>
            {authorName}
          </p>
          <p className={styles.date}>{formatDate(created_at)}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthorBlock;
