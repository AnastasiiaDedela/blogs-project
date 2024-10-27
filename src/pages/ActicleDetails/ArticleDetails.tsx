import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './ArticleDetails.module.scss';
import AuthorBlock from '@/components/AuthorBlock/AuthorBlock';
import { Pencil, Trash2 } from 'lucide-react';
import EditModal from '@/components/EditModal/EditModal';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import ConfirmModal from '@/components/ConfirmModal/ConfirmModal';
import AddComment from '@/components/CommentsSection/CommentsSection';
import { addLike } from '@/services/likesServices';
import { deletePost, getPostById } from '@/services/postsServices';

const ArticleDetails = () => {
  const params = useParams();
  const postId = Number(params.id);
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    getPostById(postId)
      .then((res) => setArticle(res))
      .catch((error) => console.log(error));
  }, []);

  const [isEditModalOpened, setIsEditModalOpened] = useState(false);
  const openEditModal = () => setIsEditModalOpened(true);
  const closeEditModal = () => setIsEditModalOpened(false);

  const [isConfirmModalOpened, setIsConfirmModalOpened] = useState(false);
  const openConfirmModal = () => setIsConfirmModalOpened(true);
  const closeConfirmModal = () => setIsConfirmModalOpened(false);

  const token = localStorage.getItem('@token') || '';
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  // const { data: article } = useFetch<Blog | null>(`http://localhost:8001/api/posts/${postId}`);

  const handleDeletePost = async () => {
    await deletePost(postId, token);
    closeConfirmModal();
    navigate(-1);
  };

  const handleLikePost = async () => {
    const response = await addLike(postId, token);
    setArticle(response);
  };

  return (
    <>
      {article && (
        <div className={styles.wrapper}>
          <div className={styles.bannerWrapper}>
            <div className={styles.contentWrapper}>
              <h1 className={styles.title}>{article.title}</h1>
              <div className={styles.authorBlockWrapper}>
                <AuthorBlock
                  authorName={article.author.name}
                  created_at={article.created_at}
                  titleStyle="light"
                  id={article.author.id}
                />
                <div className={styles.followBtns}>
                  <div>
                    <button>+ Follow {article.author.name}</button>
                  </div>
                  <div>
                    <button onClick={handleLikePost}>{article.likes_count}💙</button>
                  </div>
                </div>
                {article.author.id === userId && (
                  <div>
                    <button className={styles.edit} onClick={openEditModal}>
                      <Pencil size={16} />
                    </button>
                    <button className={styles.delete} onClick={openConfirmModal}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.contentWrapper}>
            <p className={styles.articleText}>{article.text}</p>
            <div className={styles.tags}>
              {article.tags.map((tag) => (
                <button key={tag} className={styles.tag}>
                  {tag}
                </button>
              ))}
            </div>
            <div className={styles.addCommentWrapper}>
              <AddComment postId={postId} limit={100} offset={0} />
            </div>
            <div className={styles.footerWrapper}>
              <div className={styles.authorBlockWrapper}>
                <AuthorBlock
                  authorName={article.author.name}
                  created_at={article.created_at}
                  id={article.author.id}
                />
                <div className={styles.followBtns}>
                  <div>
                    <button>+ Follow {article.author.name}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <EditModal
            id={article.id}
            text={article.text}
            title={article.title}
            onCloseEditModal={closeEditModal}
            modalOpened={isEditModalOpened}
          />
          <ConfirmModal
            isOpen={isConfirmModalOpened}
            onClose={closeConfirmModal}
            onDelete={handleDeletePost}
          />
        </div>
      )}
    </>
  );
};

export default ArticleDetails;
