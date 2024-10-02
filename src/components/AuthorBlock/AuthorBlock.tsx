import { formatDate } from '@/utils/dates';
import styles from './AuthorBlock.module.scss';
import { useNavigate } from 'react-router-dom';

type AuthorBlockProps = {
  authorName: string;
  created_at: string;
  titleStyle?: 'light' | 'blue';
  id: string;
};

const AuthorBlock = ({ authorName, created_at, titleStyle = 'blue', id }: AuthorBlockProps) => {
  const navigate = useNavigate();
  return (
    <div className={styles.authorBlock} onClick={() => navigate(`/author/${id}`)}>
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
