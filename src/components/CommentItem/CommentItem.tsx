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
import { SubmitHandler, useForm } from 'react-hook-form';

interface CommentItemProps {
  comment: CommentData;
  postId: number;
  refetchComments: () => void;
}

interface CommentText {
  text: string;
}

const CommentItem = ({ comment, postId, refetchComments }: CommentItemProps) => {
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  const [isConfirmModalOpened, setIsConfirmModalOpened] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const openConfirmModal = () => setIsConfirmModalOpened(true);
  const closeConfirmModal = () => setIsConfirmModalOpened(false);

  const { register, handleSubmit } = useForm<CommentText>({
    mode: 'onTouched',
    defaultValues: {
      text: comment.text,
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteComment(postId, comment.id),
    onSuccess: () => {
      closeConfirmModal();
      refetchComments();
    },
  });

  const editMutation = useMutation({
    mutationFn: (data: CommentText) => editComment(postId, comment.id, data.text),
    onSuccess: () => {
      refetchComments();
      setIsEditModalOpen(false);
    },
  });

  const onSubmit: SubmitHandler<CommentText> = (data) => {
    editMutation.mutate(data);
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea className={styles.editBlock} {...register('text')} />
          <div className={styles.submitBtn}>
            <button type="submit">Save</button>
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
