import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import styles from './BlogItem.module.scss';
import AuthorBlock from '../AuthorBlock';
import { Pencil, Trash2 } from 'lucide-react';
import { Blog } from '@/types/blogs';

interface BlogItemProps {
  blog: Blog;
  editable: boolean;
}

const BlogItem = ({ blog, editable }: BlogItemProps) => {
  const navigate = useNavigate();
  const { author, created_at, tags, text, title, id } = blog;
  const truncatedText = text.length > 186 ? text.substring(0, 186) : text;

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(text);

  const openEditModal = () => setIsEditing(true);
  const closeEditModal = () => setIsEditing(false);

  const handleSave = () => {
    console.log('New Title:', newTitle);
    console.log('New Content:', newContent);
    closeEditModal();
  };

  return (
    <article className={styles.blog}>
      <div className={styles.blogHeader}>
        <AuthorBlock authorName={author.name} created_at={created_at} id={author.id} />
        <div className={styles.blogButtons}>
          <button className={styles.likes}>
            💙{Math.floor(Math.random() * (150 - 50 + 1)) + 50}
          </button>
          {editable && (
            <div>
              <button className={styles.edit} onClick={openEditModal}>
                <Pencil size={14} />
              </button>
              <button className={styles.delete}>
                <Trash2 size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.blogContent} onClick={() => navigate(`/article-details/${id}`)}>
        <p className={styles.blogTitle}>{title}</p>
        <p className={styles.blogAbout}>{`${truncatedText}...`}</p>
      </div>
      <div className={styles.blogFooter}>
        <p onClick={() => navigate(`/article-details/${id}`)}>Read more...</p>
        <div className={styles.blogTags}>
          {tags && tags.map((tag, index) => <button key={index}>{tag}</button>)}
        </div>
      </div>

      {isEditing && (
        <Modal isOpen={isEditing} onRequestClose={closeEditModal} className={styles.modal}>
          <h2>Edit Blog Post</h2>
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
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className={styles.textarea}
              />
            </label>
            <div className={styles.modalActions}>
              <button type="button" onClick={handleSave} className={styles.saveButton}>
                Save
              </button>
              <button type="button" onClick={closeEditModal} className={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
    </article>
  );
};

export default BlogItem;
