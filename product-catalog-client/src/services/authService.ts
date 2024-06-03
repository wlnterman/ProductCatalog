import axios from 'axios';
import { RegisterModel, LoginModel, AuthResponse, User } from '../types';
import { jwtDecode } from "jwt-decode";

const API_URL = 'https://localhost:44383/api/user';//auth';//44383

export const login = async (loginModel: LoginModel): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/login`, loginModel);
  if (response.data.token) {
    //localStorage.setItem('user', response.data.user);                                     //как получить юзера и зачем?
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};
// export const login = async (email: string, password: string) => {
//   const response = await axios.post(`${API_URL}/login`, { email, password });
//   if (response.data.token) {
//     localStorage.setItem('token', response.data.token);
//   }
//   return response.data;
// };



export const register = async (registerModel: RegisterModel): Promise<void> => {
  const response = await axios.post(`${API_URL}/register`, registerModel);
  return response.data;
};
// export const register = async (email: string, password: string) => {
//   return await axios.post(`${API_URL}/register`, { email, password });
// };

export const logout = () => {
  //localStorage.removeItem('user');
  localStorage.removeItem('token');
};

// export const getCurrentUser = (): User | null => {
//   const userStr = localStorage.getItem('user');
//   if (userStr) return JSON.parse(userStr);
//   return null;
// }; new version
export const getCurrentUserToken = () => {
  return localStorage.getItem('token');
};

export const getCurrentUser = () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const decodedToken = jwtDecode(token);
    return decodedToken;
  } catch (error) {
    console.error('Error decoding token', error);
    return null;
  }
};

export const assignRole = async (username: string, role: string) => {
  const token = localStorage.getItem('token'); // Получаем токен из localStorage
  const headers = {
    Authorization: `Bearer ${token}`
  };
  await axios.post(`${API_URL}/assign-role`, { username, role }, { headers });
};







