import { FormEvent, useState } from 'react';
import styles from './AddArticle.module.scss';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { addPost } from '@/services/postsServices';

export default function AddArticle() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate();

  const tagsArray = tags
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag);

  const postData = {
    text: content,
    title: title,
    tags: tagsArray,
  };

  const addMutation = useMutation({
    mutationFn: () => addPost(postData),
    onSuccess: () => {
      setTitle('');
      setContent('');
      setTags('');
      navigate('/');
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addMutation.mutate();
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
          <textarea id="tags" value={tags} onChange={(e) => setTags(e.target.value)} required />
        </div>
        <button type="submit">Add Article +</button>
      </form>
    </div>
  );
}
