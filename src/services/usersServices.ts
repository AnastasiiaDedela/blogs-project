import axios from 'axios';

interface UsersResponse {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export const getMe = async (token: string) => {
  try {
    const response = await axios.get<UsersResponse>('http://localhost:8001/api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateMe = async (name: string) => {
  try {
    const response = await axios.patch<UsersResponse>('http://localhost:8001/api/users/me', {
      name: name,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updatePassword = async (oldPassword: string, newPassword: string) => {
  try {
    const response = await axios.post<UsersResponse>(
      'http://localhost:8001/api/users/me/password',
      {
        old_password: oldPassword,
        new_password: newPassword,
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUserById = async (userId: number) => {
  try {
    const response = await axios.get<UsersResponse>(`http://localhost:8001/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
