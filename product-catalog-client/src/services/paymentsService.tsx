import axios from "axios";

export interface Payment {
  id: number;
  date: string;
  amount: number;
  [key: string]: any;
}

// export const fetchPayments = async (): Promise<Payment[]> => {
//   const response = await axios.get("/api/payments");
//   return response.data;
// };
const API_BASE_URL = "https://localhost:44383/api/payments";
const API_BASE_URL2 = "https://localhost:44383";
export const fetchPayments = async (userId: number, objectId: number, startDate?: string, endDate?: string) => {
  const params = new URLSearchParams();
  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);

  //const response = await fetch(`${API_BASE_URL2}/api/payments/${userId}/${objectId}?${params.toString()}`);
  const response = await fetch(`${API_BASE_URL}/${userId}/${objectId}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Ошибка загрузки платежей: ${response.status}`);
  }

  return await response.json();
};

export const addPayment = async (payment: Omit<Payment, "id">): Promise<Payment> => {
  const response = await axios.post("/api/payments", payment);
  return response.data;
};
