import { useState } from 'react';
import styles from './EditModal.module.scss';
import Modal from 'react-modal';
import { editPost } from '@/services/postsServices';
import { useMutation } from '@tanstack/react-query';

interface ModalProps {
  id: number;
  title: string;
  text: string;
  onCloseEditModal: () => void;
  modalOpened: boolean;
  refetch: () => void;
}

const EditModal = ({ id, title, text, onCloseEditModal, modalOpened, refetch }: ModalProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState(title);
  const [newText, setNewText] = useState(text);
  const updatedData = { title: newTitle, text: newText, tags: ['ll', 'jjj'] };

  const editMutation = useMutation({
    mutationFn: () => editPost(id, updatedData),
    onSuccess: () => {
      onCloseEditModal();
      refetch();
    },
  });

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      editMutation.mutate();
    } catch (err) {
      setError('Failed to update the blog post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {modalOpened && (
        <Modal isOpen={modalOpened} onRequestClose={onCloseEditModal} className={styles.modal}>
          <h2>Edit Blog Post</h2>
          {error && <p className={styles.error}>{error}</p>}
          <form className={styles.editForm}>
            <label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className={styles.input}
              />
            </label>
            <label>
              <textarea
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                className={styles.textarea}
              />
            </label>
            <div className={styles.modalActions}>
              <button type="button" onClick={handleSave} className={styles.saveButton}>
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button type="button" onClick={onCloseEditModal} className={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default EditModal;
