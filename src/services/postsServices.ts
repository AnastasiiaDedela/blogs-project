import { Blog } from '@/types/blogs';
import { getPostsUrl } from '@/utils/getPostsUrl';
import axios from 'axios';

export const getPosts = async (q: string, limit: number, offset: number, authorId: number) => {
  const createdUrl = getPostsUrl(limit, offset, q, authorId);
  try {
    const response = await axios.get<Blog>(createdUrl);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
