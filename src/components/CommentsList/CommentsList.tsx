import { useEffect, useState } from 'react';
import styles from './CommentList.module.scss';
import { getComments } from '@/services/commentsServices';

interface CommentsProps {
  postId: number;
  limit: number;
  offset: number;
}

const CommentsList = ({ postId, limit, offset }: CommentsProps) => {
  const [commentaList, setCommentsList] = useState<Comment[] | null>(null);
  useEffect(() => {
    getComments(postId, limit, offset)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }, []);
  return <div className={styles.commentaList}></div>;
};

export default CommentsList;
