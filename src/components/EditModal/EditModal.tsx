import { useState } from 'react';
import styles from './EditModal.module.scss';
import Modal from 'react-modal';
import { editPost } from '@/services/postsServices';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';

interface ModalProps {
  id: number;
  title: string;
  text: string;
  onCloseEditModal: () => void;
  modalOpened: boolean;
  refetch: () => void;
  tags: string[];
}

interface EditForm {
  title: string;
  text: string;
  tags: string;
}

const EditModal = ({
  id,
  title,
  text,
  onCloseEditModal,
  modalOpened,
  refetch,
  tags,
}: ModalProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState } = useForm<EditForm>({
    mode: 'onTouched',
    defaultValues: {
      title: title,
      text: text,
      tags: tags.join(', '),
    },
  });

  const { errors } = formState;

  const editMutation = useMutation({
    mutationFn: (data: EditForm) => {
      const formattedData = {
        ...data,
        tags: data.tags.split(',').map((tag) => tag.trim()),
      };
      return editPost(id, formattedData);
    },
    onSuccess: () => {
      onCloseEditModal();
      refetch();
      setLoading(false);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const onSubmit: SubmitHandler<EditForm> = (data) => {
    setLoading(true);
    editMutation.mutate(data);
    console.log('data', data);
  };

  const validateTags = (value: string) => {
    const regex = /^(\w+|\w+(,\s*\w+)*)$/;
    if (regex.test(value)) {
      return true;
    }
    return 'Tags must be a single word or a comma-separated list of words';
  };

  return (
    <>
      {modalOpened && (
        <Modal isOpen={modalOpened} onRequestClose={onCloseEditModal} className={styles.modal}>
          <h2>Edit Blog Post</h2>
          {error && <p className={styles.error}>{error}</p>}
          <form className={styles.editForm} onSubmit={handleSubmit(onSubmit)}>
            <label>
              Title
              <input
                type="text"
                className={styles.input}
                {...register('title', { required: 'Title is required' })}
              />
              {errors.title && <p className={styles.inputError}>{errors.title.message}</p>}
            </label>
            <label>
              Text
              <textarea
                className={styles.textarea}
                {...register('text', { required: 'Text is required' })}
              />
              {errors.text && <p className={styles.inputError}>{errors.text.message}</p>}
            </label>
            <label>
              Tags (Comma-separated)
              <input
                type="text"
                className={styles.input}
                {...register('tags', {
                  required: 'Tags are required',
                  validate: validateTags,
                })}
              />
              {errors.tags && <p className={styles.inputError}>{errors.tags.message}</p>}
            </label>
            <div className={styles.modalActions}>
              <button type="button" onClick={onCloseEditModal} className={styles.cancelButton}>
                Cancel
              </button>
              <button type="submit" className={styles.saveButton}>
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default EditModal;
