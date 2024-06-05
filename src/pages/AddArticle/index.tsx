import { useState } from 'react';
import styles from './AddArticle.module.scss';

export default function AddArticle() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Article Submitted:', { title, content });
    setTitle('');
    setContent('');
  };

  return (
    <div>
      <h2>Add New Article</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.div}>
          <label className={styles.label} htmlFor="title">
            Title:
          </label>
          <input
            className={styles.input}
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles.div}>
          <label className={styles.label} htmlFor="content">
            Content:
          </label>
          <textarea
            className={styles.textarea}
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required></textarea>
        </div>
        <button className={styles.button} type="submit">
          Add Article
        </button>
      </form>
    </div>
  );
}
