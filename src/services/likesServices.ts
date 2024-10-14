import { Blog } from '@/types/blogs';
import axios from 'axios';

export const addLike = async (id: number) => {
  try {
    const response = await axios.post<Blog>(`http://localhost:8001/api/posts/${id}/like`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const removeLike = async (id: number) => {
  try {
    const response = await axios.delete<string>(`http://localhost:8001/api/posts/${id}/like`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
