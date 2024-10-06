import { useState } from 'react';
import styles from './Comments.module.scss';
import axios from 'axios';

const Comments = () => {
  const [newComment, setNewComment] = useState('');

  const token = localStorage.getItem('@token');

  const handleSubmit = () => {
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
            Add your comment
            <textarea onChange={(e) => setNewComment(e.target.value)} className={styles.textarea} />
          </label>
          <div className={styles.submitBtn}>
            <button type="button" onClick={handleSubmit}>
              save comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Comments;
