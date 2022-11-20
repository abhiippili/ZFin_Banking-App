import axios from "axios";

const transactionsApi = axios.create({
  baseURL: "http://localhost:5000/api/transactions"
});

export const makeTransaction = async (bodyObj) => {
  const response = await transactionsApi.post("/", bodyObj);
  return response.data;
};

export const getTransactions = async () => {
  const response = await transactionsApi.get("/?sort=-timeOfTransaction");
  return response.data;
};
