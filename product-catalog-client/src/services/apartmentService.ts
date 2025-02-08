import axios from 'axios';

interface CreateApartmentFormValues {
  name: string;
  address?: string;
  imageUrl?: string;
}

const API_URL = 'https://localhost:44383/api/apartments';

export const createApartment = async (apartment: CreateApartmentFormValues) => {
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  return await axios.post(API_URL, apartment, { headers });
};

export const updateApartment = async (id: string, apartment: CreateApartmentFormValues) => {
  const token = localStorage.getItem('token');
  const headers = {
      Authorization: `Bearer ${token}`
  };
  console.log("777777777777777");
              console.log(token);
              console.log(headers);
  await axios.put(`${API_URL}/${id}`, apartment, { headers });// axios.delete(`${API_URL}/${id}`, { headers });
};


export const getApartments = async () => {
  const token = localStorage.getItem('token'); 
  const headers = {
    Authorization: `Bearer ${token}`
  };
  const response = await axios.get(API_URL, { headers });
  return response.data;
};

export const deleteApartment = async (id: string) => {
    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`
    };
    await axios.delete(`${API_URL}/${id}`, { headers });
};