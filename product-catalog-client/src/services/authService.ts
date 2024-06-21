import axios from 'axios';
import { RegisterModel, LoginModel, AuthResponse, User } from '../types';
import { jwtDecode } from "jwt-decode";

const API_URL = 'https://localhost:44383/api/auth';//;//44383

export const login = async (loginModel: LoginModel): Promise<string> => {
  const response = await axios.post(`${API_URL}/login`, loginModel);
  // if (response.data.token) {
  //   localStorage.setItem('token', response.data.token);
  // }
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('refreshToken', response.data.refreshToken);
  return response.data.token;
};

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const response = await axios.post(API_URL + 'refresh', { refreshToken });
  if (response.data.token) {
      localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const register = async (registerModel: RegisterModel): Promise<void> => {
  const response = await axios.post(`${API_URL}/register`, registerModel);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
};

// export const getCurrentUser = (): User | null => {
//   const userStr = localStorage.getItem('user');
//   if (userStr) return JSON.parse(userStr);
//   return null;
// }; new version
export const getCurrentUserDecodedToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken: any = jwtDecode(token);
    const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    return { ...decodedToken, role, userId };
  }
  return null;
};

const extractRoleFromToken = (token: string) => {
  const decodedToken: any = jwtDecode(token);
  const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  return { ...decodedToken, role, userId };
};

// export const getCurrentUser = () => {
//   try {
//     const token = localStorage.getItem('token');
//     if (!token) return null;
//     const decodedToken = jwtDecode(token);
//     return decodedToken;
//   } catch (error) {
//     console.error('Error decoding token', error);
//     return null;
//   }
// };
