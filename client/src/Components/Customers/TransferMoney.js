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
import { useQuery } from "react-query";
import { getAllCustomers, getCustomer } from "../../api/customersApi";
import { makeTransaction } from "../../api/transactionsApi";

const TopButton = styled(Button)({
  color: "#fff",
  margin: "20px 20px",
  backgroundColor: "#4158D0",
  backgroundImage:
    "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)"
});

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "#4158D0",
  backgroundImage:
    "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4
};

const Popper = ({ message, anchorEl, openModal, setOpenModal }) => {
  return (
    <Popover
      open={openModal}
      anchorEl={anchorEl}
      onClose={() => setOpenModal(false)}
      anchorReference="anchorPosition"
      anchorPosition={{ top: 180, left: 780 }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
    >
      <Box
        sx={{
          width: "20vw",
          height: "2.5rem",
          boxShadow: 24,
          backgroundColor: "gold",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Typography>{message}</Typography>
      </Box>
    </Popover>
  );
};

const TransferMoney = () => {
  const [openTransfer, setOpenTransfer] = useState(false);
  const [amount, setAmount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [makeQuery, setMakeQuery] = useState(false);
  const [customerName, setCustomerName] = useState(null);

  console.log(amount);

  const { data, isLoading } = useQuery(
    ["queryAllCustomers", openTransfer],
    getAllCustomers
  );

  const { data: balanceData, isLoading: isLoadingBal } = useQuery(
    ["queryBalance", openTransfer],
    () => getCustomer(996419)
  );

  const handleClick = async (e) => {
    const toCustomerObj = data.data.customers.find(
      (o) => o.name == customerName
    );
    const bodyObj = {
      fromCustomer: 996419,
      toCustomer: toCustomerObj.accountNumber,
      amount: amount
    };

    setMakeQuery(toCustomerObj.accountNumber);
    setAnchorEl(e.currentTarget);
    return makeQuery && setOpenModal(true);
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
      {isLoading ? undefined : (
        <Modal open={openTransfer} onClose={() => setOpenTransfer(false)}>
          <Box sx={modalStyle}>
            <Autocomplete
              options={data.data.customers.map((customer) => customer.name)}
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
              sx={{ marginTop: "20px", marginLeft: "25%", color: "#000" }}
              onClick={handleClick}
            >
              Make Transacation
            </Button>
            <Popper
              message={"❌ Insufficient Balance"}
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
