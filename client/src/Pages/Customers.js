import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { getAllCustomers } from "../api/customersApi";
import AccountBalance from "../Components/Customers/AccountBalance";
import CustomersList from "../Components/Customers/CustomersList";
import TransferMoney from "../Components/Customers/TransferMoney";

function Customers() {
  const {
    data: customers,
    isLoading: loadingCustomers,
    refetch: refetchCustomers
  } = useQuery("queryCustomers", getAllCustomers);

  return (
    <Box
      className="mainComponent"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          width: "1000px",
          margin: "auto",
          height: "90%",
          border: "1.5px solid none"
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <TransferMoney refetchCustomers={refetchCustomers} />
          <AccountBalance />
        </Box>
        <Box
          className="scrollList"
          sx={{
            height: "520px",
            overflowY: "scroll",
            marginTop: "1.5rem"
          }}
        >
          {loadingCustomers ? (
            <h4>Loading...</h4>
          ) : (
            <CustomersList
              customersData={customers.data}
              refetchCustomers={refetchCustomers}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Customers;
