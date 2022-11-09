import axios from "axios";

const customersApi = axios.create({
  baseURL: "http://localhost:5000"
});

export const getAllCustomers = async () => {
  const response = await customersApi.get("/api/customers");
  return response.data;
};

export const getCustomer = async (accountNumber) => {
  const response = await customersApi.get(
    `/api/customers?accountNumber=${accountNumber}`
  );
  return response.data;
};
