import axios from 'axios';

interface CreateCategoryFormValues {
  name: string;
}

const API_URL = 'https://localhost:44383/api/categories';

export const createCategory = async (category: CreateCategoryFormValues) => {
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  return await axios.post(API_URL, category, { headers });
};

export const updateCategory = async (id: string, category: CreateCategoryFormValues) => {
  const token = localStorage.getItem('token');
  const headers = {
      Authorization: `Bearer ${token}`
  };
  await axios.put(`${API_URL}/${id}`, category, { headers });// axios.delete(`${API_URL}/${id}`, { headers });
};


export const getCategories = async () => {
  const token = localStorage.getItem('token'); 
  const headers = {
    Authorization: `Bearer ${token}`
  };
  const response = await axios.get(API_URL, { headers });
  return response.data;
};

export const deleteCategory = async (id: string) => {
    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`
    };
    await axios.delete(`${API_URL}/${id}`, { headers });
};