import Modal from 'react-modal';
import styles from './ConfirmModal.module.scss';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const ConfirmModal = ({ isOpen, onClose, onDelete }: ConfirmationModalProps) => {
  return (
    <>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onRequestClose={onClose}
          className={styles.modal}
          overlayClassName={styles.overlay}>
          <h2 className={styles.modalTitle}>Confirm Deletion</h2>
          <p className={styles.modalSubtitle}>Are you sure you want to delete?</p>

          <div className={styles.modalActions}>
            <button onClick={onDelete} className={styles.deleteButton}>
              Delete
            </button>
            <button onClick={onClose} className={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ConfirmModal;
