import axios from 'axios';

const API_URL = 'https://localhost:44383/api/user'; // Замените 'http://your-api-url/api/users' на ваш URL API

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  password?: string;
  isLocked: boolean;
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

export const getUserProfile = async (userId: string) => {
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  const response = await axios.get(`${API_URL}/${userId}`, { headers });
  return response.data;
};

export const updateUserProfile = async (userId: string, userData: any) => {
  const response = await axios.put(`${API_URL}/${userId}`, userData);
  return response.data;
};

export const toggleUserLock2 = async (userId: string): Promise<void> => {
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  await axios.post(`${API_URL}/block/${userId}`, userId, { headers });
};
export const toggleUserLock3 = async (userId: string): Promise<void> => {
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  await axios.post(`${API_URL}/unblock/${userId}`, userId, { headers });
};

// export const toggleUserLock = async (userId: string, isLocked: boolean): Promise<void> => {
//   await axios.post(`${API_URL}/${userId}/toggleLock`, { isLocked });
// };

// export const updateUser = async (userId: string, user: User): Promise<void> => {
//   await axios.put(`${API_URL}/${userId}`, user);
// };
