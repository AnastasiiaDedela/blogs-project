import { useState } from 'react';
import styles from './AddArticle.module.scss';
import axios from 'axios';

export default function AddArticle() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tagsArray = tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    const articleData = {
      text: content,
      title: title,
      tags: tagsArray,
    };

    const token = localStorage.getItem('@token');

    axios
      .post('http://localhost:8001/api/posts', articleData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log('Article added:', res.data);
        setTitle('');
        setContent('');
        setTags('');
        console.log(res.data);
      })
      .catch((error) => {
        console.error('There was an error adding the article:', error);
      });
  };
  return (
    <div className={styles.addArticleContainer}>
      <h2 className={styles.title}>Add New Article</h2>
      <form onSubmit={handleSubmit} className={styles.addArticleForm}>
        <div className={styles.inputContainer}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="content">Content:</label>
          <textarea
            className={styles.contentInput}
            id="content"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            required></textarea>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="tags">Tags:</label>
          <textarea id="tags" value={tags} onChange={handleTagsChange} required />
        </div>
        <button type="submit">Add Article +</button>
      </form>
    </div>
  );
}
