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
// export const createProduct = async (product: CreateProductFormValues) => {
//   const token = localStorage.getItem('token'); // Получаем токен из localStorage
//   const headers = {
//     Authorization: `Bearer ${token}`
//   };
//   await axios.post(API_URL, product, { headers });
// };

export const getAllProducts = async () => {
  const response = await axios.get(API_URL);
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
// export const updateProduct = async (productId: string, product: any) => {
//     const token = localStorage.getItem('token'); // Получаем токен из localStorage
//     const headers = {
//       Authorization: `Bearer ${token}`
//     };
//   return await axios.put(`${API_URL}/${productId}`, product, { headers });
// };


export const deleteProduct = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
// export const deleteProduct = async (productId: string) => {
//   return await axios.delete(`${API_URL}/${productId}`);
// };




export const getUsdExchangeRate = async (): Promise<number> => {
  const response = await axios.get('https://localhost:44383/api/currency/usd-rate'); //https://localhost:44383/api/ExchangeRate/usd
  return response.data;
};