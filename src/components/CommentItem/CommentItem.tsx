import AuthorBlock from '../AuthorBlock/AuthorBlock';
import styles from './CommentItem.module.scss';

const CommentItem = ({ commentData }) => {
  return (
    <div className={styles.commentWrapper}>
      <div className={styles.authorBlock}>{/* <AuthorBlock /> */}</div>
      <p className={styles.commentText}>{commentData.text}</p>
    </div>
  );
};

export default CommentItem;
