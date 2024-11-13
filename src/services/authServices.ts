import { Author } from '@/types/blogs';
import axios from 'axios';

interface AuthResponse {
  token: string;
  user: Author;
}

export const signin = async (loginData: AuthResponse) => {
  const response = await axios.post<AuthResponse>(
    'http://localhost:8001/api/auth/login',
    loginData,
  );
  return response.data;
};

export const signup = async (
  name: string,
  email: string,
  password: string,
  repeatPassword: string,
) => {
  try {
    const response = await axios.post<AuthResponse>('http://localhost:8001/api/auth/register', {
      email: email,
      password: password,
      name: name,
      repeat_password: repeatPassword,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
