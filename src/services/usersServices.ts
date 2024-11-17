import axios from 'axios';

interface UsersResponse {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

interface UpdatePasswordRequest {
  old_password: string;
  new_password: string;
}

export const getMe = async () => {
  const token = localStorage.getItem('@token') || '';
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
  const token = localStorage.getItem('@token') || '';
  try {
    const response = await axios.patch<UsersResponse>(
      'http://localhost:8001/api/users/me',
      {
        name: name,
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

export const updatePassword = async (passwordData: UpdatePasswordRequest) => {
  const token = localStorage.getItem('@token') || '';
  try {
    const response = await axios.post<UsersResponse>(
      'http://localhost:8001/api/users/me/password',
      passwordData,
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

export const getUserById = async (userId: number) => {
  try {
    const response = await axios.get<UsersResponse>(`http://localhost:8001/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
