import { useState } from 'react';
import styles from './Comments.module.scss';
import axios from 'axios';

const AddComment = () => {
  const [newComment, setNewComment] = useState('');

  const token = localStorage.getItem('@token');

  const handleSubmit = () => {
    // const response = await addComment()
    axios
      .post(`http://localhost:8001/api/comments/`, newComment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
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
              <button type="button" onClick={handleSubmit}>
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
