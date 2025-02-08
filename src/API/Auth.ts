import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL; 

export const login = async (data: { name: string; password: string }) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, data);
  return response.data;
};