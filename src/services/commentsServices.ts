import { Author } from '@/types/blogs';
import axios from 'axios';

type Comment = {
  id: number;
  created_at: string;
  updated_at: string;
  text: string;
  user_id: number;
  post_id: number;
  post: {
    id: number;
    user_id: number;
    author: Author;
    created_at: string;
    updated_at: string;
  };
  author: Author;
};

interface CommentsResponse {
  count: number;
  items: Comment[];
}

export const getComments = async (postId: number, limit: number, offset: number) => {
  try {
    const response = await axios.get<CommentsResponse>(
      `http://localhost:8001/api/posts/${postId}/comments/?limit=${limit}&offset=${offset}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addComment = async (postId: number, commentText: string) => {
  try {
    const response = await axios.post<CommentsResponse>(
      `http://localhost:8001/api/posts/${postId}/comments`,
      {
        text: commentText,
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const editComment = async (postId: number, commentId: number, editedText: string) => {
  try {
    const response = await axios.post<CommentsResponse>(
      `http://localhost:8001/api/posts/${postId}/comments/${commentId}`,
      {
        text: editedText,
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
