import { useState } from 'react';
import styles from './CommentsSection.module.scss';
import { useNavigate } from 'react-router-dom';
import { addComment, getComments } from '@/services/commentsServices';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import CommentItem from '../CommentItem/CommentItem';
import { useMutation, useQuery } from '@tanstack/react-query';
interface CommentsProps {
  postId: number;
  limit: number;
  offset: number;
}

const AddComment = ({ postId, limit, offset }: CommentsProps) => {
  const [newComment, setNewComment] = useState('');
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const token = localStorage.getItem('@token') || '';

  const addMutation = useMutation({
    mutationFn: () => addComment(postId, newComment, token),
    onSuccess: () => {
      setNewComment('');
    },
  });

  const handleAddComment = async () => {
    if (!isLoggedIn) {
      console.error('User is not authenticated. Redirect to sign-in.');
      navigate('/sign-in');
      return;
    }
    addMutation.mutate();
  };

  const { data: comments, refetch } = useQuery({
    queryKey: ['comments'],
    queryFn: () => getComments(postId, limit, offset),
  });

  return (
    <div className={styles.commentsWrapper}>
      <div className={styles.commentForm}>
        <form className={styles.editForm}>
          <label>
            <i>Leave your comment</i>
            <textarea
              onChange={(e) => setNewComment(e.target.value)}
              className={styles.textarea}
              value={newComment}
            />
          </label>
          <div className={styles.submitBtn}>
            {newComment.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  handleAddComment();
                  refetch();
                }}>
                Comment
              </button>
            )}
          </div>
        </form>
      </div>
      <div className={styles.commentsList}>
        {comments &&
          comments.items.map((comment) => (
            <CommentItem
              comment={comment}
              key={comment.id}
              postId={postId}
              refetchComments={() => {
                refetch();
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default AddComment;
