import { CommentData } from '@/types/comments';
import AuthorBlock from '../AuthorBlock/AuthorBlock';
import styles from './CommentItem.module.scss';

interface CommentItemProps {
  comment: CommentData;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <div className={styles.commentWrapper}>
      <AuthorBlock
        authorName={comment.author.name}
        created_at={comment.created_at}
        titleStyle="blue"
        id={comment.author.id}
      />

      <p className={styles.commentText}>{comment.text}</p>
    </div>
  );
};

export default CommentItem;
