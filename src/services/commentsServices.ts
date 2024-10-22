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
