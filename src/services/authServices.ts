import { Author } from '@/types/blogs';
import axios from 'axios';

interface AuthResponse {
  token: string;
  user: Author;
}

interface SignInProps {
  email: string;
  password: string;
}

interface SignUpProps {
  name: string;
  email: string;
  password: string;
  repeat_password: string;
}

export const signin = async (loginData: SignInProps) => {
  const response = await axios.post<AuthResponse>(
    'http://localhost:8001/api/auth/login',
    loginData,
  );
  return response.data;
};

export const signup = async (signupData: SignUpProps) => {
  try {
    const response = await axios.post<AuthResponse>(
      'http://localhost:8001/api/auth/register',
      signupData,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
