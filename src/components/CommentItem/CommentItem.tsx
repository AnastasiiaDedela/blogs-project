import { CommentData } from '@/types/comments';
import AuthorBlock from '../AuthorBlock/AuthorBlock';
import styles from './CommentItem.module.scss';
import { Pencil, Trash2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface CommentItemProps {
  comment: CommentData;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  return (
    <div className={styles.commentWrapper}>
      <div className={styles.commentHeader}>
        <AuthorBlock
          authorName={comment.author.name}
          created_at={comment.created_at}
          titleStyle="blue"
          id={comment.author.id}
        />
        {comment.author.id === userId && (
          <div className={styles.commentBtns}>
            <button className={styles.edit} onClick={() => console.log('edit')}>
              <Pencil size={16} />
            </button>
            <button className={styles.delete} onClick={() => console.log('delete')}>
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
      <p className={styles.commentText}>{comment.text}</p>
    </div>
  );
};

export default CommentItem;
