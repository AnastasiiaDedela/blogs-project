import { useEffect, useState } from 'react';
import styles from './CommentsSection.module.scss';
import { useNavigate } from 'react-router-dom';
import { addComment, getComments } from '@/services/commentsServices';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { CommentData } from '@/types/comments';
import CommentItem from '../CommentItem/CommentItem';
interface CommentsProps {
  postId: number;
  limit: number;
  offset: number;
}

const AddComment = ({ postId, limit, offset }: CommentsProps) => {
  const [newComment, setNewComment] = useState('');
  const [commentsList, setCommentsList] = useState<CommentData[]>([]);

  console.log('comments list', commentsList);

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const navigate = useNavigate();

  const token = localStorage.getItem('@token') || '';

  const handleAddComment = async () => {
    if (!isLoggedIn) {
      console.error('User is not authenticated. Redirect to sign-in.');
      navigate('/sign-in');
      return;
    }
    const response = await addComment(postId, newComment, token);
    setCommentsList((prev) => [response, ...prev]);
    setNewComment('');
  };

  useEffect(() => {
    getComments(postId, limit, offset)
      .then((res) => {
        if (res && res.items) {
          setCommentsList(res.items);
        }
      })
      .catch((error) => console.log(error));
  }, []);

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
              <button type="button" onClick={handleAddComment}>
                Comment
              </button>
            )}
          </div>
        </form>
      </div>
      <div className={styles.commentsList}>
        {commentsList &&
          commentsList.map((comment) => (
            <CommentItem
              comment={comment}
              key={comment.id}
              postId={postId}
              setCommentsList={setCommentsList}
            />
          ))}
      </div>
    </div>
  );
};

export default AddComment;
