import axios from "axios";

const customersApi = axios.create({
  baseURL: "http://localhost:5000/api/customers"
});

export const getAllCustomers = async () => {
  const response = await customersApi.get("/");
  return response.data;
};

export const getCustomer = async (accountNumber) => {
  const response = await customersApi.get(`?accountNumber=${accountNumber}`);
  return response.data;
};
