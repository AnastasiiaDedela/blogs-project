import { useState } from 'react';
import styles from './AddCommentBlock.module.scss';
import { useNavigate } from 'react-router-dom';
import { addComment } from '@/services/commentsServices';

const AddComment = ({ postId }: { postId: number }) => {
  const [newComment, setNewComment] = useState('');

  const navigate = useNavigate();

  const token = localStorage.getItem('@token') || '';

  const handleAddComment = async () => {
    if (!token) {
      console.error('User is not authenticated. Redirect to sign-in.');
      navigate('/sign-in');
      return;
    }
    const response = await addComment(postId, newComment, token);
    console.log('add post', response);
  };

  return (
    <div className={styles.commentsWrapper}>
      <div className={styles.commentForm}>
        <form className={styles.editForm}>
          <label>
            <i>Leave your comment</i>
            <textarea onChange={(e) => setNewComment(e.target.value)} className={styles.textarea} />
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
    </div>
  );
};

export default AddComment;
