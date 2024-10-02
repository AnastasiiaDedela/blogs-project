import { updateBlogPost } from '@/utils/updateBlog';
import { useState, useEffect, useRef } from 'react';
import styles from './EditModal.module.scss';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
  id: string;
  title: string;
  text: string;
  onCloseEditModal: () => void;
  modalOpened: boolean;
}

const EditModal = ({ id, title, text, onCloseEditModal, modalOpened }: ModalProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState(title);
  const [newText, setNewText] = useState(text);

  const navigate = useNavigate();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [newText]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.width = 'auto';
      inputRef.current.style.width = `${inputRef.current.scrollWidth}px`;
    }
  }, [newTitle]);

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      const updatedData = { newTitle, newText };
      await updateBlogPost(id, updatedData);
      onCloseEditModal();
      navigate(0);
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
                ref={inputRef}
              />
            </label>
            <label>
              <textarea
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                className={styles.textarea}
                ref={textareaRef}
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
