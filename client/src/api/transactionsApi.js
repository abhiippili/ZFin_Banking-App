import axios from "axios";

const transactionsApi = axios.create({
  baseURL: "http://localhost:5000"
});

export const makeTransaction = async (bodyObj) => {
  const response = await transactionsApi.post("/api/transactions", bodyObj);
  return response.data;
};
