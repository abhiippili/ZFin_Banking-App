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

const TopButton = styled(Button)({
  color: "#fff",
  margin: "20px 20px",
  // backgroundColor: "#4158D0",
  // backgroundImage:
  //   "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)"
  backgroundColor: "#0093E9",
  backgroundImage: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)"
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

const Popper = ({
  message,
  anchorEl,
  openModal,
  setOpenModal,
  setAmount,
  setCustomerName
}) => {
  const handleClose = () => {
    setOpenModal(false);
    setCustomerName(null);
    return setAmount(0);
  };

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
  const [customerName, setCustomerName] = useState(null);
  const [message, setMessage] = useState("");

  const { data, isLoading } = useQuery(
    ["queryAllCustomers", openTransfer],
    getAllCustomers
  );

  const { data: balanceData, isLoading: isLoadingBal } = useQuery(
    ["queryBalance", openTransfer],
    () => getCustomer(996419)
  );

  const mutation = useMutation((paramObj) => makeTransaction(paramObj), {
    onSuccess(data) {
      setMessage("✅ Success");
    },
    onError(err) {
      setMessage("❌ Error transacting your money");
    }
  });

  const handleClick = async (e) => {
    const toCustomerObj = data.data.customers.find(
      (o) => o.name == customerName
    );
    const bodyObj = {
      fromCustomer: 996419,
      toCustomer: toCustomerObj.accountNumber,
      amount: amount
    };
    balanceData.data.customers[0].balance < amount
      ? setMessage("❌ Insufficient Balance")
      : mutation.mutate(bodyObj);
    setAnchorEl(e.currentTarget);
    return setOpenModal(true);
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
              message={message}
              anchorEl={anchorEl}
              openModal={openModal}
              setOpenModal={setOpenModal}
              setCustomerName={setCustomerName}
              setAmount={setAmount}
            />
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default TransferMoney;
