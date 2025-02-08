import axios from 'axios';

const API_URL = 'https://localhost:44383/api/product';

interface CreateProductFormValues {
    name: string;
    category: string;
    description: string;
    price: number;
    generalNote: string;
    specialNote: string;
}

export const addProduct = async (product: CreateProductFormValues) => {
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  const response = await axios.post(API_URL, product, { headers });
  return response.data;
};

export const getAllProducts = async (params: { page: number; pageSize: number; searchTerm?: string }) => {
  const response = await axios.get(`${API_URL}`, {
    params: {
      page: params.page,
      pageSize: params.pageSize,
      searchTerm: params.searchTerm
    },
  });
  return response.data;
};

export const getProductById = async (productId: string) => {
  const response = await axios.get(`${API_URL}/${productId}`);
  return response.data;
};

export const updateProduct = async (id: string, product: any) => {
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  const response = await axios.put(`${API_URL}/${id}`, product, { headers });
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  const response = await axios.delete(`${API_URL}/${id}`, { headers });
  return response.data;
};


export const getUsdExchangeRate = async (): Promise<number> => {
  const response = await axios.get('https://localhost:44383/api/currency/usd-rate'); //https://localhost:44383/api/ExchangeRate/usd
  return response.data;
};