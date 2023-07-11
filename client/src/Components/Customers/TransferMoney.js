import React from "react";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  Popover,
  TextField,
  Typography
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { styled } from "@mui/system";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getAllCustomers, getCustomer } from "../../api/customersApi";
import { makeTransaction } from "../../api/transactionsApi";
import MessagePopper from "./MessagePopper";

const TopButton = styled(Button)({
  color: "#000",
  fontWeight: 600,
  margin: "20px 20px",
  backgroundColor: "rgb(97, 218, 251)",
  "&:hover": {
    backgroundColor: "rgb(97, 218, 251)"
  }
});

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "#fff",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4
};

const TransferMoney = ({ refetchCustomers }) => {
  const [openTransfer, setOpenTransfer] = useState(false);
  const [amount, setAmount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [customerName, setCustomerName] = useState(null);
  const [message, setMessage] = useState("");

  const { data: customers, isLoading: loadingCustomers } = useQuery(
    ["queryCustomers", openTransfer],
    getAllCustomers
  );

  const { data: balanceData, isLoading: isLoadingBal } = useQuery(
    ["queryBalance", openTransfer],
    () => getCustomer(996419)
  );

  const mutation = useMutation((paramObj) => makeTransaction(paramObj), {
    onSuccess(data) {
      setMessage("✅ Transaction Successfull");
      refetchCustomers();
    },
    onError(err) {
      setMessage("❌ Error transacting your money");
    }
  });

  const handleClick = (e) => {
    const toCustomerObj = customers.data.customers.find(
      (o) => o.name == customerName
    );
    const bodyObj = {
      fromCustomer: 996419,
      toCustomer: toCustomerObj.accountNumber,
      amount: Number(amount)
    };
    balanceData.data.customers[0].balance < amount
      ? setMessage("❌ Insufficient Balance")
      : mutation.mutate(bodyObj);
    setAnchorEl(e.currentTarget);
    return setOpenModal(true);
  };

  const handleClose = () => {
    setCustomerName(null);
    setAmount(0);
    return setOpenTransfer(false);
  };

  return (
    <Box>
      <TopButton
        variant="contained"
        startIcon={<AttachMoneyIcon />}
        onClick={() => {
          setOpenTransfer(true);
        }}
      >
        Transfer Money
      </TopButton>
      {loadingCustomers ? undefined : (
        <Modal open={openTransfer} onClose={handleClose}>
          <Box sx={modalStyle}>
            <Autocomplete
              options={customers.data.customers.map(
                (customer) => customer.name
              )}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label="Select Customer" />
              )}
              value={customerName}
              onChange={(e, newValue) => setCustomerName(newValue)}
            />
            <FormControl sx={{ marginTop: "20px", width: "100%" }}>
              <InputLabel>Amount</InputLabel>
              <OutlinedInput
                value={amount}
                onChange={(e, newValue) => setAmount(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">₹</InputAdornment>
                }
                label="Amount"
              />
            </FormControl>
            <Button
              variant="outlined"
              sx={{
                marginTop: "20px",
                marginLeft: "25%",
                color: "#000"
              }}
              onClick={handleClick}
            >
              Make Transacation
            </Button>
            <MessagePopper
              message={message}
              anchorEl={anchorEl}
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default TransferMoney;
