import { CommentData } from '@/types/comments';
import AuthorBlock from '../AuthorBlock/AuthorBlock';
import styles from './CommentItem.module.scss';
import { Pencil, Trash2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { deleteComment, editComment } from '@/services/commentsServices';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { useState } from 'react';

interface CommentItemProps {
  comment: CommentData;
  postId: number;
  setCommentsList: React.Dispatch<React.SetStateAction<CommentData[]>>;
}

const CommentItem = ({ comment, postId, setCommentsList }: CommentItemProps) => {
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const token = localStorage.getItem('@token') || '';

  const [isConfirmModalOpened, setIsConfirmModalOpened] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.text);
  const openConfirmModal = () => setIsConfirmModalOpened(true);
  const closeConfirmModal = () => setIsConfirmModalOpened(false);

  const handleDeleteComment = async () => {
    await deleteComment(postId, comment.id, token);
    setCommentsList((prev) => prev.filter((com) => comment.id !== com.id));
    closeConfirmModal();
  };

  const submitEditedComment = async () => {
    const response = await editComment(postId, comment.id, editedComment, token);

    setCommentsList((prev) => {
      const index = prev.findIndex((com) => com.id === comment.id);

      if (index !== -1) {
        return [...prev.slice(0, index), response, ...prev.slice(index + 1)];
      }

      return prev;
    });
  };

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
            <button className={styles.edit} onClick={() => setIsEditModalOpen(true)}>
              <Pencil size={16} />
            </button>
            <button className={styles.delete} onClick={openConfirmModal}>
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
      {isEditModalOpen ? (
        <form>
          <textarea
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
            className={styles.editBlock}></textarea>
          <div className={styles.submitBtn}>
            <button
              type="button"
              onClick={() => {
                submitEditedComment();
                setIsEditModalOpen(false);
              }}>
              Save
            </button>
          </div>
        </form>
      ) : (
        <p className={styles.commentText}>{comment.text}</p>
      )}
      <ConfirmModal
        isOpen={isConfirmModalOpened}
        onClose={closeConfirmModal}
        onDelete={handleDeleteComment}
      />
    </div>
  );
};

export default CommentItem;
