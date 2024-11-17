import styles from './AddArticle.module.scss';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { addPost } from '@/services/postsServices';
import { SubmitHandler, useForm } from 'react-hook-form';

interface AddArticleForm {
  title: string;
  text: string;
  tags: string;
}

export default function AddArticle() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm<AddArticleForm>({
    mode: 'onTouched',
    defaultValues: {
      title: '',
      text: '',
      tags: '',
    },
  });

  const addMutation = useMutation({
    mutationFn: (data: AddArticleForm) => {
      const formattedData = {
        ...data,
        tags: data.tags.split(',').map((tag) => tag.trim()),
      };
      return addPost(formattedData);
    },
    onSuccess: () => {
      navigate('/');
    },
  });

  const onSubmit: SubmitHandler<AddArticleForm> = (data) => {
    addMutation.mutate(data);
    console.log('data', data);
  };

  const { errors } = formState;

  const validateTags = (value: string) => {
    const regex = /^(\w+|\w+(,\s*\w+)*)$/;
    if (regex.test(value)) {
      return true;
    }
    return 'Tags must be a single word or a comma-separated list of words';
  };

  return (
    <div className={styles.addArticleContainer}>
      <h2 className={styles.title}>Add New Article</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.addArticleForm}>
        <div className={styles.inputContainer}>
          <label htmlFor="title">Title</label>
          <input type="text" {...register('title', { required: 'Title is required' })} />
          {errors.title && <p className={styles.inputError}>{errors.title.message}</p>}
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="content">Content</label>
          <textarea
            className={styles.contentInput}
            {...register('text', { required: 'Text is required' })}></textarea>
          {errors.text && <p className={styles.inputError}>{errors.text.message}</p>}
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="tags">Tags (Comma-separated)</label>
          <textarea
            {...register('tags', {
              required: 'Tags are required',
              validate: validateTags,
            })}
          />
          {errors.tags && <p className={styles.inputError}>{errors.tags.message}</p>}
        </div>
        <button type="submit">Add Article +</button>
      </form>
    </div>
  );
}
