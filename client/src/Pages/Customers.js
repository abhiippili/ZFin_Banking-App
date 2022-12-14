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
          width: "95%",
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
        <Typography variant="h8" sx={{ marginLeft: "20px" }}>
          <Box
            className="scrollList"
            sx={{ maxHeight: "520px", overflowY: "scroll" }}
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
        </Typography>
      </Box>
    </Box>
  );
}

export default Customers;
