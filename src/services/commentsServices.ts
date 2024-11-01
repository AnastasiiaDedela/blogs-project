import { CommentData, CommentsResponse } from '@/types/comments';
import axios from 'axios';

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

export const addComment = async (postId: number, commentText: string, token: string) => {
  try {
    const response = await axios.post<CommentData>(
      `http://localhost:8001/api/posts/${postId}/comments`,
      {
        text: commentText,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editComment = async (postId: number, commentId: number, editedText: string) => {
  const token = localStorage.getItem('@token') || '';
  try {
    const response = await axios.patch<CommentsResponse>(
      `http://localhost:8001/api/posts/${postId}/comments/${commentId}`,
      {
        text: editedText,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteComment = async (postId: number, commentId: number) => {
  const token = localStorage.getItem('@token') || '';
  try {
    const response = await axios.delete<CommentData>(
      `http://localhost:8001/api/posts/${postId}/comments/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
