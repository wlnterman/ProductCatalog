import axios from 'axios';

const API_URL = 'https://localhost:44383/api/user'; // Замените 'http://your-api-url/api/users' на ваш URL API

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  password?: string;
}


export const getAllUsers = async () => {
    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`
    };


    try {
      const response = await axios.get(API_URL, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };
// export const getAllUsers = async (): Promise<User[]> => {
//   try {
//     const response = await axios.get<User[]>(API_URL);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     throw error;
//   }
// };

export const addUser = async (user: User): Promise<User> => {
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  try {
    const response = await axios.post<User>(API_URL, user, { headers });
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

export const updateUser = async (id: string, user: User): Promise<void> => {
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  
  try {
    await axios.put(`${API_URL}/${id}`, user, { headers });
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  try {
    await axios.delete(`${API_URL}/${id}`, { headers });
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const changePassword = async (id: string, currentPassword : string, newPassword: string) => {
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  const response = await axios.put(`${API_URL}/change-password/${id}`, { currentPassword, newPassword }, { headers });
  return response.data;
};