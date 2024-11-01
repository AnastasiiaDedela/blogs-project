import { CommentData } from '@/types/comments';
import AuthorBlock from '../AuthorBlock/AuthorBlock';
import styles from './CommentItem.module.scss';
import { Pencil, Trash2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { deleteComment, editComment } from '@/services/commentsServices';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

interface CommentItemProps {
  comment: CommentData;
  postId: number;
  refetchComments: () => void;
}

const CommentItem = ({ comment, postId, refetchComments }: CommentItemProps) => {
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  const [isConfirmModalOpened, setIsConfirmModalOpened] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.text);
  const openConfirmModal = () => setIsConfirmModalOpened(true);
  const closeConfirmModal = () => setIsConfirmModalOpened(false);

  const deleteMutation = useMutation({
    mutationFn: () => deleteComment(postId, comment.id),
    onSuccess: () => {
      closeConfirmModal();
      refetchComments();
    },
  });

  const editMutation = useMutation({
    mutationFn: () => editComment(postId, comment.id, editedComment),
    onSuccess: () => {
      refetchComments();
    },
  });

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
                editMutation.mutate();
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
        onDelete={() => {
          deleteMutation.mutate();
        }}
      />
    </div>
  );
};

export default CommentItem;
