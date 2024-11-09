import { useState } from 'react';
import styles from './CommentsSection.module.scss';
import { useNavigate } from 'react-router-dom';
import { addComment, getComments } from '@/services/commentsServices';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import CommentItem from '../CommentItem/CommentItem';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { setLimit } from '@/redux/slices/comments/slice';
interface CommentsProps {
  postId: number;
  limit: number;
  offset: number;
}

const CommentsSection = ({ postId, limit, offset }: CommentsProps) => {
  const [newComment, setNewComment] = useState('');
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const token = localStorage.getItem('@token') || '';
  const dispatch = useDispatch();

  const { data: comments, refetch } = useQuery({
    queryKey: ['comments', limit],
    queryFn: () => getComments(postId, limit, offset),
  });

  const addMutation = useMutation({
    mutationFn: () => addComment(postId, newComment, token),
    onSuccess: () => {
      refetch();
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
      <div className={styles.seeMoreWrapper}>
        {comments &&
          comments.count >= 3 &&
          (limit < comments.count ? (
            <div
              className={styles.seeMoreBtn}
              onClick={() => {
                dispatch(setLimit((limit += 3)));
              }}>
              See more
              <ChevronDown />
            </div>
          ) : (
            <div
              className={styles.seeMoreBtn}
              onClick={() => {
                dispatch(setLimit(3));
              }}>
              Hide
              <ChevronUp />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CommentsSection;
